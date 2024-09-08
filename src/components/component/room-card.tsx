"use client";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Room } from "@prisma/client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export function RoomCard({ room }: { room: Room }) {
  const router = useRouter();
  const tags = room.tags.split(",").map((tag) => tag.trim());
  return (
    <Card className="w-full relative max-w-sm h-[400px] flex flex-col">
      <Image
        src={room.Thumbnail ?? "/404.jpg"}
        alt="Thumbnail"
        width="600"
        height="300"
        className="w-full h-[40%] object-cover rounded-t-lg"
      />
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
            <Badge
              onClick={() => {
                router.push(`/browse-rooms?search=${tag}`);
              }}
              variant="secondary"
              className="mr-2 mb-2 cursor-pointer"
              key={tag}
            >
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
        <div className="mt-auto">
          <Link href={`/browse-rooms/${room.id}`}>
            <Button className="w-full">Join Room</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
