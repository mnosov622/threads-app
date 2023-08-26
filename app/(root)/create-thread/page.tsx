import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);

  // If user has not onboarded, redirect to onboarding page
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="head-text">Create thread</h1>;
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
}

export default Page;
