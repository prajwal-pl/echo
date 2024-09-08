import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { EdgeVideo } from "./edge-video";

type Props = {
  params: {
    roomId: string;
  };
};

const RoomPage = async ({ params }: Props) => {
  const { roomId } = params;
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: room?.userId,
    },
  });

  const formattedDate = room?.createdAt
    ? formatDistanceToNow(room.createdAt, { addSuffix: true })
    : "";

  const tags = room?.tags.split(",");
  return (
    room &&
    user && (
      <div className="h-screen flex flex-col">
        <div className="px-4 py-2">
          <h1 className="md:text-3xl text-2xl font-semibold">{room?.name}</h1>
        </div>
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-grow md:w-3/4 border mx-1 my-1 rounded-lg md:mx-4 md:my-2 p-1 md:p-4">
            <EdgeVideo room={room} user={user} />
          </div>
          <div className="h-1/3 md:h-auto md:w-1/4 rounded-lg md:mx-2 md:my-2 mx-1 my-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{room?.name}</CardTitle>
                <CardDescription className="h-12 text-sm">
                  {room?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className=" flex flex-col gap-2">
                <div>
                  {tags?.map((tag) => (
                    <Badge className="mr-2" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Started {formattedDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomPage;
