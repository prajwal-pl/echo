import { SearchIcon } from "lucide-react";
import { RoomCard } from "@/components/component/room-card";
import { prisma } from "@/lib/prisma";

type Props = {};

const BrowsePage: React.FC<Props> = () => {
  return (
    <div className="max-w-screen w-full h-screen">
      <div className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black w-full h-full overflow-y-auto">
        <Header />
        <div className="container mx-auto flex flex-col mb-4">
          <div className="flex flex-col gap-2 px-2 mt-4 md:px-0 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Explore Rooms</h1>
            <p className="text-muted-foreground">
              Join various rooms to see what's going on!
            </p>
          </div>
          <RoomCards />
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;

const Header: React.FC = () => {
  return (
    <header className="border-b border-neutral-600 max-w-screen sticky top-0 bg-white dark:bg-black z-10">
      <div className="py-3 md:py-4 flex items-center justify-center">
        <div className="flex items-center gap-1 border rounded-full px-4 text-neutral-700 dark:text-neutral-200">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search by tags or name..."
            className="w-full px-2 py-2 md:px-4 rounded-full outline-none bg-inherit placeholder:text-neutral-700 placeholder:dark:text-neutral-200 placeholder:w-full"
          />
        </div>
      </div>
    </header>
  );
};

const RoomCards: React.FC = async () => {
  const rooms = await prisma.room.findMany();
  return (
    <div className="flex flex-wrap md:flex-row items-center gap-3 px-2 md:px-0">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};
