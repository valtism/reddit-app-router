import { Post } from "@/components/Post";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Post post={post} />
    </div>
  );
}
