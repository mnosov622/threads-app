import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import EditThread from "@/components/forms/EditThread";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);
  // if (!userInfo[0]?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <h1 className="text-light-2 text-lg text-base-semibold">Edit Thread</h1>
      {userInfo.threads.includes(params.id) && (
        <EditThread threadId={params.id} threadContent={thread.text} threadImage={thread.image} />
      )}
    </section>
  );
}

export default page;
