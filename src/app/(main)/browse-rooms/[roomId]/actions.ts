"use server";

import { StreamChat } from "stream-chat";
import { auth } from "../../../../../auth";

export async function generateTokenAction() {
  const session = await auth();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const api_secret = process.env.STREAM_SECRET_KEY!;
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user?.id ?? "");
  console.log("token", token);
  return token;
}
