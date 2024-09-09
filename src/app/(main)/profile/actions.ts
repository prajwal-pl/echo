"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export async function updateProfile(name: string, image: string) {
  const session = await auth();

  try {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name,
        image,
      },
    });
    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update profile");
  }
}

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    // First, delete related records
    await prisma.account.deleteMany({
      where: { userId: session.user.id },
    });
    await prisma.session.deleteMany({
      where: { userId: session.user.id },
    });
    await prisma.authenticator.deleteMany({
      where: { userId: session.user.id },
    });
    await prisma.room.deleteMany({
      where: { userId: session.user.id },
    });

    // Then, delete the user
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete account: ${error.message}`);
    } else {
      throw new Error("Failed to delete account: Unknown error");
    }
  }
}

export async function getUser() {
  const session = await auth();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user");
  }
}
