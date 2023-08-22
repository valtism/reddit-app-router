import { Comment } from "@/components/Comment";
import { prisma } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";

interface ServerCommentProps {
  postId: string;
  commentId: string;
}
export async function ServerComment({
  postId,
  commentId,
}: ServerCommentProps) {
  const user = await currentUser();
  const comment = await unstable_cache(
    async () => {
      return prisma.comment.findUniqueOrThrow({
        where: {
          id: commentId,
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

  return (
    <Comment comment={comment} postId={postId} authorId={user?.id}>
      {comment.children.map(({ id }) => (
        <ServerComment key={id} postId={postId} commentId={id} />
      ))}
    </Comment>
  );
}
