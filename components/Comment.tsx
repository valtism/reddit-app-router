"use client";

import { CommentForm } from "@/components/CommentForm";
import { Comment as CommentType } from "@prisma/client";

interface CommentProps {
  comment: CommentType;
  postId: string;
  authorId?: string;
  children?: React.ReactNode;
}
export function Comment({
  comment,
  postId,
  authorId,
  children,
}: CommentProps) {
  return (
    <div>
      <div>Comment</div>
      <div>{comment.content}</div>
      {/* {authorId && <CommentForm postId={postId} authorId={authorId} />} */}
      <div>{children}</div>
    </div>
  );
}
