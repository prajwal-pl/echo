"use client";
import { Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PencilIcon } from "lucide-react";

export function UserRoomCard({ room }: { room: Room }) {
  const tags = room.tags.split(",").map((tag: string) => tag.trim());
  const { toast } = useToast();

  const handleDelete = () => {
    deleteRoomAction(room.id);
    toast({
      title: "Room deleted",
      description: "Your room has been deleted",
      variant: "destructive",
    });
  };
  return (
    <Card className="w-full relative max-w-sm h-[400px] flex flex-col">
      <Image
        src={room.Thumbnail ?? "/404.jpg"}
        alt="Thumbnail"
        width="600"
        height="300"
        className="w-full h-[40%] object-cover rounded-t-lg"
      />
      <Button size={"icon"} className="absolute top-2 right-2">
        <Link href={`/edit-room/${room.id}`}>
          <PencilIcon className="" />
        </Link>
      </Button>
      <CardContent className="p-4 flex flex-col h-[60%]">
        <div className="mb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {room.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {room.description}
          </CardDescription>
        </div>
        <div className="flex-grow overflow-y-auto mb-2">
          {tags.map((tag) => (
            <Badge variant={"secondary"} className="mr-2 mb-2" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mb-2">
          <Link
            className="flex items-center gap-2 text-blue-500 text-sm"
            href={room.githubRepo ?? "#"}
            target="_blank"
          >
            <GitHubLogoIcon />
            Git Repository
          </Link>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <Link href={`/browse-rooms/${room.id}`} className="flex-grow">
            <Button className="w-full">Join Room</Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="flex-grow">
                Delete Room
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your room and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-900 hover:bg-red-900 text-white"
                  onClick={handleDelete}
                >
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
