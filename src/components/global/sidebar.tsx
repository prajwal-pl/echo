"use client";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CompassIcon,
  LogOutIcon,
  PlusSquareIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signOut } from "../../../auth";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useToast } from "@/hooks/use-toast";
import { logoutAction } from "@/app/(home)/login/actions";

type Props = {};

const Sidebar = (props: Props) => {
  const session = useSession();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutAction();
    toast({
      title: "Logged out",
      description: "You have been logged out",
    });
  };
  return (
    <div className="md:w-[60px] w-[50px] border-r flex flex-col justify-between items-center border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black h-screen my-0 top-0 sticky">
      <div className="flex flex-col items-center py-4 space-y-6">
        <Link
          href="/"
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
        >
          <p className="text-xs md:text-sm font-bold">Edge.</p>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/browse-rooms"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              >
                <CompassIcon size={24} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Browse Rooms</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/create-room"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              >
                <PlusSquareIcon size={24} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create Room</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/my-rooms"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              >
                <BriefcaseBusiness size={24} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>My Rooms</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="relative z-10"
                    >
                      <LogOutIcon size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be signed out of your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="z-50">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col items-center pb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/profile">
                <Image
                  src={session.data?.user?.image || ""}
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="shrink-0 rounded-full border"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
