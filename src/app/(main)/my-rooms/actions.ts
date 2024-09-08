"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await auth();
  await prisma.room.delete({
    where: { id: roomId, userId: session?.user?.id },
  });
  revalidatePath("/my-rooms");
  revalidatePath("/browse-rooms");
}
