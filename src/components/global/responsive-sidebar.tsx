"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCompass,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../ui/sidebar";
import Image from "next/image";
import { PlusSquareIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const ResponsiveSidebar = ({ children }: Props) => {
  const session = useSession();
  const links = [
    {
      label: "Explore",
      href: "/browse-rooms",
      icon: (
        <IconCompass className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create",
      href: "/create-room",
      icon: (
        <PlusSquareIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-black w-full flex-1 max-w-screen gap-1 justify-between border border-neutral-200 dark:border-neutral-700 overflow-scroll",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Image
              src={""}
              alt="Avatar"
              width={30}
              height={30}
              className="shrink-0 rounded-full"
            />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div onClick={() => setOpen(false)}>
                  <SidebarLink key={idx} link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session.data?.user?.name ?? "",
                href: "#",
                icon: (
                  <Image
                    src={session.data?.user?.image ?? ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
};

export default ResponsiveSidebar;
