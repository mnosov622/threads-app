"use client";

import ThreadCard from "@/components/cards/ThreadCard";
import { redirect, useParams } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

interface ParamsProp {
  params: {
    id: string;
  };
}

const Page = async ({ params }: ParamsProp) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo[0].onboarded) {
    redirect("/onboarding");
  }

  const thread = await fetchThreadById(params.id);

  return (
    <>
      <section className="relative">
        <div className="">
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={thread.id || ""}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
