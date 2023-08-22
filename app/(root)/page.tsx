import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  );
}
