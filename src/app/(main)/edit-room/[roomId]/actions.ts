"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { revalidatePath } from "next/cache";

export async function editRoom(formData: {
  roomId: string;
  name: string;
  description: string;
  tags: string;
  githubRepo: string;
  thumbnail: string;
}) {
  const session = await auth();
  try {
    await prisma.room.update({
      where: {
        id: formData.roomId,
      },
      data: {
        name: formData.name,
        description: formData.description,
        tags: formData.tags,
        githubRepo: formData.githubRepo,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
        Thumbnail: formData.thumbnail,
      },
    });
    revalidatePath(`/your-rooms`);
    revalidatePath("/browse-rooms");
  } catch (error) {
    console.log(error);
  }
}
