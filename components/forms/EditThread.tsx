"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { EditThreadValidation, ThreadValidation } from "@/lib/validations/thread";
import { updateThreadById } from "@/lib/actions/thread.actions";
import { useState } from "react";
import Loader from "../shared/Loader";

interface Props {
  threadId: string;
  threadContent: string;
}

function EditThread({ threadId, threadContent }: Props) {
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof EditThreadValidation>>({
    resolver: zodResolver(EditThreadValidation),
    defaultValues: {
      thread: threadContent,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditThreadValidation>) => {
    setIsLoading(true);
    try {
      await updateThreadById(threadId, values.thread, pathname);
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error) {
      console.error("Error creating thread:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          {loading ? <Loader /> : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}

export default EditThread;
