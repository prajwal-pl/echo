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
import { useEffect, useState, useRef, useCallback } from "react";
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

  const initializeClient = useCallback(async () => {
    if (!room || !user) return;

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
      tokenProvider: generateTokenAction,
    });

    clientRef.current = newClient;
    setClient(newClient);

    try {
      await newClient.connectUser({
        id: userId,
        name: user.name ?? "Unknown",
        image: user.image ?? "/404.png",
      });
      const newCall = newClient.call("default", room.id);
      await newCall.join({ create: true });
      setCall(newCall);
    } catch (error) {
      console.error("Error initializing client:", error);
    } finally {
      setLoading(false);
    }
  }, [room, user, apiKey]);

  useEffect(() => {
    initializeClient();

    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
      if (clientRef.current) {
        clientRef.current.disconnectUser().catch(console.error);
      }
    };
  }, [initializeClient]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!client || !call) {
    return null;
  }

  return (
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
  );
};
