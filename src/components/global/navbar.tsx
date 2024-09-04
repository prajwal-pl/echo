import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between mx-auto backdrop-blur-md backdrop-brightness-75 dark:bg-black/20 top-0 sticky z-50 max-w-screen-sm sm:max-w-screen-2xl p-3">
      <div>
        <Link href={"/"} className="text-3xl font-semibold">
          Edge
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Link href={"#"}>
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
