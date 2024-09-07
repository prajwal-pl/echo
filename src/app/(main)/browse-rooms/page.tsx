import { SearchIcon } from "lucide-react";
import React from "react";

type Props = {};

const BrowsePage = (props: Props) => {
  return (
    // <div className="flex flex-1">
    //   <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
    //     <div className="flex gap-2">
    //       {[...new Array(4)].map((i) => (
    //         <div
    //           key={"first" + i}
    //           className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
    //         ></div>
    //       ))}
    //     </div>
    //     <div className="flex gap-2 flex-1">
    //       {[...new Array(2)].map((i) => (
    //         <div
    //           key={"second" + i}
    //           className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
    //         ></div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-1">
      <div className=" border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-2 flex-1 w-full h-full">
        <Header />
        <div></div>
      </div>
    </div>
  );
};

export default BrowsePage;

const Header = () => {
  return (
    <div className="border-b border-neutral-600 max-w-screen">
      <div className="py-4 flex items-center justify-center">
        <div className="flex items-center gap-2 border rounded-full px-4 text-neutral-700 dark:text-neutral-200">
          <SearchIcon />
          <input
            placeholder="Search rooms"
            className="w-1/2 p-3 rounded-full outline-none bg-inherit placeholder:text-neutral-700 placeholder:dark:text-neutral-200"
          />
        </div>
      </div>
    </div>
  );
};
