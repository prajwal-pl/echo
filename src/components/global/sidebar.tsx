"use client";
import Link from "next/link";
import { HomeIcon, SearchIcon, PlusCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Sidebar = (props: Props) => {
  const session = useSession();
  return (
    <div className="w-[60px] border-r flex flex-col justify-between items-center border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black h-screen my-0 top-0 sticky">
      <div className="flex flex-col items-center py-4 space-y-6">
        <Link
          href="/"
          className="text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
        >
          <HomeIcon size={24} />
        </Link>
        <Link
          href="/browse-rooms"
          className="text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
        >
          <SearchIcon size={24} />
        </Link>
        <Link
          href="/create-room"
          className="text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
        >
          <PlusCircleIcon size={24} />
        </Link>
      </div>
      <div className="flex flex-col items-center pb-4">
        <Image
          src={session.data?.user?.image || ""}
          alt="User Avatar"
          width={30}
          height={30}
          className="shrink-0 rounded-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
