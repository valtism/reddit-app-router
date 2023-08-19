"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

interface CreatePost {
  title: string;
  content: string;
  authorId: string;
  revalidationPath: string;
}
export async function createPostAction({
  title,
  content,
  authorId,
  revalidationPath,
}: CreatePost) {
  await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
  revalidatePath(revalidationPath);
}
