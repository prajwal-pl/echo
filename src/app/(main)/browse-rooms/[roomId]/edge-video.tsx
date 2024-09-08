"use client";

import {
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState, useRef } from "react";
import { Call } from "@stream-io/video-react-sdk";
import { Room } from "@prisma/client";
import { User } from "@prisma/client";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const EdgeVideo = ({ room, user }: { room: Room; user: User }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const clientRef = useRef<StreamVideoClient | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!room || !user) return;

    const initializeClient = async () => {
      if (clientRef.current) {
        await clientRef.current.disconnectUser();
      }

      const userId = user.id;
      const newClient = new StreamVideoClient({
        apiKey,
        user: {
          id: userId,
          name: user.name ?? "Unknown",
          image: user.image ?? "/404.png",
        },
        tokenProvider: () => generateTokenAction(),
      });

      clientRef.current = newClient;
      setClient(newClient);
      newClient.connectUser({
        id: userId,
        name: user.name ?? "Unknown",
        image: user.image ?? "/404.png",
      });
      const newCall = newClient.call("default", room.id);
      await newCall.join({ create: true });
      setCall(newCall);
    };

    initializeClient();
    setLoading(false);
    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
      if (clientRef.current) {
        clientRef.current.disconnectUser().catch(console.error);
      }
    };
  }, [room, user, apiKey]);

  return (
    client &&
    call &&
    (loading ? (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    ) : (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/browse-rooms");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    ))
  );
};
