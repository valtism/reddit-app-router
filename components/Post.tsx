import { clerkClient } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import Link from "next/link";

interface PostProps {
  post: Post;
}
export async function Post({ post }: PostProps) {
  const postUser = await clerkClient.users.getUser(post.authorId);
  return (
    <div key={post.id}>
      <Link href={`/post/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <div>By {postUser.username}</div>
      <div>{post.content}</div>
    </div>
  );
}
