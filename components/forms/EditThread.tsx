"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { EditThreadValidation, ThreadValidation } from "@/lib/validations/thread";
import { updateThreadById } from "@/lib/actions/thread.actions";
import { ChangeEvent, useState } from "react";
import Loader from "../shared/Loader";
import Image from "next/image";
import { Input } from "../ui/input";

interface Props {
  threadId: string;
  threadContent: string;
  threadImage: string;
}

function EditThread({ threadId, threadContent, threadImage }: Props) {
  const [loading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any>();

  const router = useRouter();

  const pathname = usePathname();

  const form = useForm<z.infer<typeof EditThreadValidation>>({
    resolver: zodResolver(EditThreadValidation),
    defaultValues: {
      thread: threadContent || "",
      image: threadImage || "",
    },
  });

  function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) {
        return;
      }
      fileReader.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof EditThreadValidation>) => {
    setIsLoading(true);
    try {
      await updateThreadById(threadId, values, pathname);
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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value && (
                  <Image
                    src={field.value}
                    alt="thread image"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
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
