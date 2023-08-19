"use client";

import { createPostAction } from "@/app/actions";
import { invariant } from "@/app/invariant";
import { usePathname } from "next/navigation";

export function CreatePost({ userId }: { userId: string }) {
  const path = usePathname();

  async function createPost(formData: FormData) {
    const title = formData.get("title")?.toString();
    invariant(title, "Title is required");
    const content = formData.get("content")?.toString();
    invariant(content, "Content is required");
    createPostAction({
      title,
      content,
      authorId: userId,
      revalidationPath: path,
    });
  }
  return (
    <form action={createPost} className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" />
      <button>Create Post</button>
    </form>
  );
}
