"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  threadContent: string;
  id: string;
}

const Share = ({ threadContent, id }: Props) => {
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: threadContent,
          url: `${window.location.origin}/thread/${id}`,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col" onClick={handleShareClick}>
        <Image
          src="/assets/share.svg"
          alt="Share"
          width={24}
          height={24}
          className={`cursor-pointer object-contain`}
        />
      </div>
    </>
  );
};

export default Share;
