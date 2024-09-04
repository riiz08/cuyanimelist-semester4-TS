"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useToast } from "./use-toast";

const HandleRemoveCollection = ({ anime_id }: any) => {
  const { toast } = useToast();
  const router = useRouter();

  const handle = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/collection?anime-id=${anime_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      router.refresh();
      return toast({
        title: "Yey! success Remove anime from collection",
        description: "Check your collection now!",
      });
    }
  };

  return (
    <Button className="ml-6 mb-4" variant={"destructive"} onClick={handle}>
      Remove from collection
    </Button>
  );
};

export default HandleRemoveCollection;
