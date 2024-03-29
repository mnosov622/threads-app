"use client";

import { deleteThreadById } from "@/lib/actions/thread.actions";
import Image from "next/image";

function DeleteThread({ threadId, onDeleteThread }: any) {
  const deleteThread = () => {
    if (window.confirm("Are you sure you want to delete this thread?")) {
      deleteThreadById(threadId);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <Image
        src="/assets/delete.svg"
        alt="Share"
        width={20}
        height={20}
        className={`cursor-pointer object-contain `}
        onClick={deleteThread}
      />
    </div>
  );
}

export default DeleteThread;
