"use client";

import { addLikeToPost, fetchPosts } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  likes: number;
  threadId: string;
  userId: string;
  noLikes?: string;
}

const LikeThread = ({ likes, threadId, userId, noLikes }: Props) => {
  const [likesAmount, setLikesAmount] = useState(likes);
  const [userLiked, setUserLiked] = useState(false);

  const handleLikeThread = (threadId: string) => () => {
    addLikeToPost(threadId, userId);
    setLikesAmount((prevLikes) => prevLikes + 1);
    setUserLiked(true);
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
        {likesAmount > 0 && <p className="text-light-2">{likesAmount}</p>}
      </div>
    </>
  );
};

export default LikeThread;
