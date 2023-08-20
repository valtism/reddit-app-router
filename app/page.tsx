import { prisma } from "@/db";
import { CreatePost } from "@/app/CreatePost";
import { Post } from "@/components/Post";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const posts = await prisma.post.findMany();
  const user = await currentUser();

  return (
    <main>
      {user && <CreatePost userId={user.id} />}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
