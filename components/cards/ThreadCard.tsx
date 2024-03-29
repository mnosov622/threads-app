import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LikeThread from "../forms/LikeThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/router";
import Share from "../forms/Share";
import DeleteThread from "../forms/DeleteThread";
import EditThread from "../forms/EditThread";

interface Props {
  key: string;
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes?: number | any;
  usersLiked?: any;
  isComment?: boolean;
  homePage?: boolean;
  image?: string | any;
}

const ThreadCard = async ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  likes,
  usersLiked,
  isComment = false,
  homePage = false,
  image,
}: Props) => {
  const userInfo = await fetchUser(currentUserId);
  return (
    <article
      className={`flex w-full flex-col rounded ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author?.id}`} className="relative h-11 w-11">
              <Image
                src={author?.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h2 className="cursor-pointer text-base-semibold text-light-1">{author?.name}</h2>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            {image && (
              <div className="mt-2">
                <Link href={image}>
                  <Image
                    src={image}
                    alt="Thread Image"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                  />
                </Link>
              </div>
            )}
            <div className="mt-5 flex flex-row gap-3 items-center">
              {homePage && (
                <div className="flex gap-3.5">
                  <LikeThread
                    likes={likes}
                    threadId={id}
                    userId={userInfo?._id}
                    usersLiked={usersLiked}
                  />
                  <Link href={`/thread/${id}`} className="flex flex-row">
                    <Image
                      src="/assets/reply.svg"
                      alt="Reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                    <p className="text-light-2">{comments.length}</p>
                  </Link>
                  <Share threadContent={content} id={id} />
                </div>
              )}

              {userInfo.threads.includes(id) && <DeleteThread threadId={id} />}

              {userInfo.threads.includes(id) && (
                <>
                  <Link href={`/thread/edit/${id}`} className="flex flex-row">
                    <Image
                      src="/assets/edit.svg"
                      alt="Reply"
                      width={20}
                      height={20}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                </>
              )}

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex flex-items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            width={20}
            height={20}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
