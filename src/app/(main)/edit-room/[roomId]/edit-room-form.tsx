"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editRoom } from "./actions";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Room } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2).max(250, {
    message: "Description must be between 2 and 250 characters.",
  }),
  tags: z
    .string()
    .min(1, {
      message: "At least one tag is required.",
    })
    .max(50),
  githubRepo: z
    .string()
    .min(2)
    .max(100, {
      message: "Github Repo must be between 2 and 250 characters.",
    })
    .startsWith("https://github.com", {
      message: "This is not a valid Github Repo",
    }),
  thumbnail: z
    .string()
    .url({
      message: "Enter a valid URL",
    })
    .startsWith("https://", {
      message: "This is not a valid URL",
    }),
});

type EditRoomFormProps = {
  room: Room;
};

const EditRoomForm = ({ room }: EditRoomFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description || "",
      tags: room.tags,
      githubRepo: room.githubRepo || "",
      thumbnail: room.Thumbnail || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (thumbnail) {
        await editRoom({ ...values, thumbnail, roomId: room.id });
        form.reset();
        setThumbnail(null);
        toast({
          title: "Room updated",
          description: "Your room has been updated",
        });
        router.push(`/browse-rooms`);
      } else {
        toast({
          title: "Error",
          description: "Thumbnail is required",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:space-y-2 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter your room name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormDescription>
                Write a description about your project here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Write a bunch of tags that describe your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repository URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Provide a link to your GitHub repository.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Thumbnail</FormLabel>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            if (res && res.length > 0) {
              setThumbnail(res[0].url);
              form.setValue("thumbnail", res[0].url);
              toast({
                title: "Thumbnail uploaded",
                description: "Your thumbnail has been uploaded",
              });
              console.log("Files: ", res);
            }
          }}
          onUploadError={(error: Error) => {
            console.error(`Upload error: ${error.message}`);
            alert(`ERROR! ${error.message}`);
          }}
          className="ut-button:dark:bg-white ut-button:dark:text-black ut-button:bg-black ut-button:text-white ut-button:w-full ut-allowed-content:sr-only"
        />
        <FormDescription>
          You must re-upload the thumbnail to update it.
        </FormDescription>
        <Button className="w-full" type="submit">
          Update Room
        </Button>
      </form>
    </Form>
  );
};

export default EditRoomForm;
