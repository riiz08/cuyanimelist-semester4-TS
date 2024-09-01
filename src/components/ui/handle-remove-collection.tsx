"use client";

import { Button } from "./button";
import { useToast } from "./use-toast";

const HandleRemoveCollection = ({ anime_id }: any) => {
  const { toast } = useToast();

  const handle = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/collection?anime-id=${anime_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      return toast({
        title: "Yey! success Remove anime from collection",
        description: "Check your collection now!",
      });
    }
  };

  return (
    <Button className="ml-6 mb-4" onClick={handle}>
      Remove from collection
    </Button>
  );
};

export default HandleRemoveCollection;
