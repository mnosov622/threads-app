"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { error } from "console";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },

      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (e: any) {
    throw new Error(`failed to create/update user: ${e.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.find({ id: userId });
  } catch (e: any) {
    throw new Error(`failed to fetch user: ${e.message}`);
  }
}
