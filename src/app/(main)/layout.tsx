import { CompassIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { auth } from "../../../auth";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default layout;

const Sidebar = async () => {
  const session = await auth();
  return (
    <div className="border-r h-full w-[50px] sm:w-[75px] top-0 fixed left-0 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-start mt-4 h-full gap-8">
        <Link
          href={"/"}
          className="text-center text-xs sm:text-sm font-semibold"
        >
          Edge.
        </Link>
        <Link
          href={"/browse-rooms"}
          className="text-center text-xs sm:text-sm font-semibold"
        >
          <CompassIcon />
        </Link>
        <Link
          href={"/create-room"}
          className="text-center text-xs sm:text-sm font-semibold"
        >
          <PlusCircleIcon />
        </Link>
      </div>

      <Image
        src={session?.user?.image ?? ""}
        className="shrink-0 rounded-full mb-4"
        width={30}
        height={30}
        alt="Avatar"
      />
    </div>
  );
};
