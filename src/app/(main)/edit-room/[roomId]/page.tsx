import React from "react";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import EditRoomForm from "./edit-room-form";
import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    roomId: string;
  };
};

const NewRoomPage = async (props: Props) => {
  const { roomId } = props.params;
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="max-w-screen w-full min-h-screen pb-8">
      <div className="container mx-auto px-8 md:px-0 flex justify-center flex-col mb-8">
        <div className="space-y-2 mb-8 md:mb-14 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold">Edit Room</h1>
          <p className="text-sm md:text-lg text-muted-foreground">
            Edit your room to start streaming your project!
          </p>
        </div>
        {room && <EditRoomForm room={room} />}
      </div>
    </div>
  );
};

export default NewRoomPage;
