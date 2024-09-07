"use client";
import Link from "next/link";
import { HomeIcon, SearchIcon, PlusCircleIcon } from "lucide-react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="w-[60px] border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black h-screen my-0 top-0 sticky">
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
    </div>
  );
};

export default Sidebar;
