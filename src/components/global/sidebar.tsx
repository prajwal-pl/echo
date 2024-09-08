"use client";
import Link from "next/link";
import { BriefcaseBusiness, CompassIcon, PlusSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Sidebar = (props: Props) => {
  const session = useSession();
  return (
    <div className="md:w-[60px] w-[50px] border-r flex flex-col justify-between items-center border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black h-screen my-0 top-0 sticky">
      <div className="flex flex-col items-center py-4 space-y-6">
        <Link
          href="/"
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          <p className="text-xs md:text-sm font-bold">Edge.</p>
        </Link>
        <Link
          href="/browse-rooms"
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          <CompassIcon size={24} />
        </Link>
        <Link
          href="/create-room"
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          <PlusSquareIcon size={24} />
        </Link>
        <Link
          href="/my-rooms"
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          <BriefcaseBusiness size={24} />
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
