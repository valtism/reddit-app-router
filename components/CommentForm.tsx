import { createCommentAction } from "@/app/actions";
import { revalidateTag } from "next/cache";

interface CommentFormProps {
  postId: string;
  authorId: string;
}
export function CommentForm({ postId, authorId }: CommentFormProps) {
  async function addComment(data: FormData) {
    "use server";
    const comment = data.get("comment");
    if (typeof comment !== "string") {
      throw new Error("Comment must be a string");
    }
    createCommentAction({
      postId,
      authorId,
      content: comment,
    });
    revalidateTag(`${postId}/comments`);
  }
  return (
    <form action={addComment}>
      <textarea name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
