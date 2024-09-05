"use client";

import { useRef } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useToast } from "./use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  animeId: string;
  animeName: string;
};

const CommentInput = (props: Props) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const handleSubmit = async () => {
    const commentValue = commentRef.current?.value;

    if (!commentValue) {
      return toast({
        title: "Something went wrong",
        description: "Please type your comment in the input field",
        variant: "destructive",
      });
    }

    try {
      const raw = JSON.stringify({
        user_email: user?.email,
        user_image:
          user?.image === undefined
            ? "/images/default-profile.jpg"
            : user?.image,
        user_name: user?.name === null ? "Guest" : user?.name,
        anime_id: String(props.animeId),
        anime_name: props.animeName,
        comment_text: commentValue,
      });

      console.log(raw);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_USER}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
        }
      );

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        return toast({
          title: "Error",
          description: result.message || "Failed to post comment",
          variant: "destructive",
        });
      }

      // If successful
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });

      router.refresh();
      if (commentRef.current) return (commentRef.current.value = "");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 px-4 gap-2">
      <Textarea placeholder="Type your comment here." ref={commentRef} />
      <Button className="md:max-w-[20%]" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default CommentInput;
