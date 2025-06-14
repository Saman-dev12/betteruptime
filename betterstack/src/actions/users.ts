import "server-only"
import { auth } from "@clerk/nextjs/server";

export const requireUser = async() => {
  const { userId,getToken } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const token = await getToken();

  return {userId,token};
};
