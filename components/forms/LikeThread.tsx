"use client";

import { addLikeToPost, fetchPosts, removeLikeFromPost } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  likes: number;
  threadId: string;
  userId: string;
  noLikes?: string;
  usersLiked?: string[];
}

const LikeThread = ({ likes, threadId, userId, noLikes, usersLiked }: Props) => {
  const [likesAmount, setLikesAmount] = useState(likes);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    if (usersLiked?.includes(userId)) {
      setUserLiked(true);
    }
  }, []);

  const handleLikeThread = (threadId: string) => async () => {
    try {
      if (userLiked) {
        setUserLiked(false);
        setLikesAmount((prev) => prev - 1);
        await removeLikeFromPost(threadId, userId);
      } else {
        setUserLiked(true);
        setLikesAmount((prev) => prev + 1);
        await addLikeToPost(threadId, userId);
      }
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };

  return (
    <>
      <div
        className="flex items-center
                 flex-col"
      >
        <Image
          src="/assets/heart-gray.svg"
          alt="Heart"
          width={24}
          height={24}
          className={`cursor-pointer object-contain ${userLiked && "liked"}`}
          onClick={handleLikeThread(threadId)}
        />
        <p className="text-light-2">{likesAmount}</p>
      </div>
    </>
  );
};

export default LikeThread;
