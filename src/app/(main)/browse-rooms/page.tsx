import { RoomCard } from "@/components/component/room-card";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/global/header";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileWarningIcon, TriangleAlertIcon } from "lucide-react";

type Props = {
  searchParams: { search?: string };
};

const BrowsePage = async ({ searchParams }: Props) => {
  const session = await auth();
  const search = searchParams.search?.toLowerCase() || "";
  const rooms = await prisma.room.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tags: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="max-w-screen w-full h-screen">
      <div className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black w-full h-full overflow-y-auto">
        <Header initialSearch={search} />
        <div className="container mx-auto flex flex-col mb-4">
          <div className="flex flex-col gap-2 px-2 mt-4 md:px-0 lg:px-2 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Explore Rooms</h1>
            <p className="text-muted-foreground">
              Join various rooms to see {"what's"} going on!
            </p>
          </div>
          <div className="flex flex-wrap md:flex-row items-center gap-3 px-2 md:px-0 lg:px-2">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          {rooms.length === 0 && (
            <div className="flex flex-col items-center gap-3 justify-center h-screen">
              <TriangleAlertIcon
                className="text-yellow-800"
                stroke="currentColor"
                strokeWidth="1"
                size={100}
              />
              <p className="md:text-xl text-lg font-semibold">
                No rooms found, create one!
              </p>
              <Link href={"/create-room"}>
                <Button>Create Room</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
