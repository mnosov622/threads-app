"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import EditProfile from "@/app/(root)/profile/[id]/[edit]/page";
import { useState } from "react";
import { fetchUsers } from "@/lib/actions/user.actions";

interface Props {
  accountId: string | any;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string | "Community";
  authorizedUser?: boolean;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  authorizedUser,
}: Props) => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="flex w-full flex-col justify-start">
      {!showEditProfile && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-20 object-cover">
                <Image
                  src={imgUrl}
                  alt="Profile Image"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                <p className="text-base-mdeium text-gray-1">@{username}</p>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        </>
      )}

      <>
        {authorizedUser && (
          <Button
            className="bg-primary-500 mt-5 mb-5"
            onClick={() => setShowEditProfile(!showEditProfile)}
          >
            {showEditProfile ? "Cancel" : "Edit Profile"}
          </Button>
        )}

        {showEditProfile && (
          <EditProfile image={imgUrl} name={name} bio={bio} username={username} id={accountId} />
        )}
      </>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
  {
    /* TODO: Community */
  }
};

export default ProfileHeader;
