import { CommentForm } from "@/components/CommentForm";
import { Post } from "@/components/Post";
import { ServerComment } from "@/components/ServerComment";
import { prisma } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;
  const user = await currentUser();
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  const comments = await unstable_cache(
    async () => {
      return prisma.comment.findMany({
        where: {
          postId: postId,
          parentId: null,
        },
        include: {
          children: {
            select: { id: true },
          },
        },
      });
    },
    [postId],
    { tags: [`${postId}/comments`] }
  )();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Post post={post} />
      {user && <CommentForm postId={params.id} authorId={user.id} />}
      {comments.map((comment) => (
        <ServerComment
          key={comment.id}
          commentId={comment.id}
          postId={postId}
        ></ServerComment>
      ))}
    </div>
  );
}
