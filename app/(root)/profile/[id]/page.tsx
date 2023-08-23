import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo: any = await fetchUser(params.id);

  // If user has not onboarded, redirect to onboarding page
  if (!userInfo[0]?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <ProfileHeader
        accountId={userInfo[0]._id.toString()}
        authUserId={user.id}
        name={userInfo[0].name}
        username={userInfo[0].username}
        imgUrl={userInfo[0].image}
        bio={userInfo[0].bio}
      />
    </>
  );
}

export default Page;
