import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { UserRoomCard } from "./user-room-card";
import { redirect } from "next/navigation";
import { TriangleAlertIcon } from "lucide-react";

const MyRoomsPage = async () => {
  const session = await auth();
  const rooms = await prisma.room.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="max-w-screen w-full h-screen">
      <div className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black w-full h-full overflow-y-auto">
        <div className="container mx-auto flex flex-col mb-4">
          <div className="flex items-center md:px-8 flex-col md:flex-row md:justify-between mb-8">
            <div className="flex flex-col gap-2 items-center md:items-start px-2 mt-4 md:px-0 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">My Rooms</h1>
              <p className="text-muted-foreground">
                View your created rooms here!
              </p>
            </div>
            <div>
              <Link href="/create-room">
                <Button variant={"secondary"}>Create Room</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-row items-center gap-3 px-2 md:px-0 lg:px-2">
            {rooms.map((room) => (
              <UserRoomCard key={room.id} room={room} />
            ))}
          </div>
          {rooms.length === 0 && (
            <div className="flex flex-col items-center place-content-center gap-3 justify-center">
              <TriangleAlertIcon
                className="text-yellow-800"
                stroke="currentColor"
                strokeWidth="1"
                size={100}
              />
              <p className="md:text-xl text-lg font-semibold">
                You have no rooms, create one!
              </p>
              <Link href={"/create-room"}>
                <Button variant={"secondary"}>Create Room</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRoomsPage;
