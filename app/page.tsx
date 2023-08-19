import { prisma } from "@/db";
import { CreatePost } from "@/app/CreatePost";
import { clerkClient, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const posts = await prisma.post.findMany();
  const user = await currentUser();

  return (
    <main>
      {user && <CreatePost userId={user.id} />}
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.content}</div>
        </div>
      ))}
    </main>
  );
}
