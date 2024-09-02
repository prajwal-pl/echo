"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";

export async function createRoom(Room: {
  name: any;
  description: any;
  tags: any;
  githubRepo: any;
}) {
  const session = await auth();
  try {
    await prisma.room.create({
      data: {
        name: Room.name,
        description: Room.description,
        tags: Room.tags,
        githubRepo: Room.githubRepo,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
