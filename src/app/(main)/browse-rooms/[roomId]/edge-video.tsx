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

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Call } from "@stream-io/video-react-sdk";
import { Room } from "@prisma/client";
import { User } from "@prisma/client";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

export const EdgeVideo = ({ room, user }: { room: Room; user: User }) => {
  const session = useSession();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

  useEffect(() => {
    if (!room) return;
    if (!session || !session.data?.user) return;
    const userId = user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: user.name ?? "Unknown",
        image: user.image ?? "/404.png",
      },
      tokenProvider: () => generateTokenAction(),
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  return (
    client &&
    call && (
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
    )
  );
};
