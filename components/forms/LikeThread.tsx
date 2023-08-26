"use client";

import { addLikeToPost, fetchPosts } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  likes: number;
  threadId: string;
  userId: string;
}

const LikeThread = ({ likes, threadId, userId }: Props) => {
  const [likesAmount, setLikesAmount] = useState(likes);

  const handleLikeThread = (threadId: string) => () => {
    addLikeToPost(threadId);
    setLikesAmount((prevLikes) => prevLikes + 1);
  };
  return (
    <div
      className="flex items-center
                 flex-col"
    >
      <Image
        src="/assets/heart-gray.svg"
        alt="Heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleLikeThread(threadId)}
      />
      <p className="text-light-2">{likesAmount}</p>
    </div>
  );
};

export default LikeThread;
