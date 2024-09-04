"use client";

import { CollectionType } from "@/types/anime";
import { Button } from "./button";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

const HandleAddCollection = (props: CollectionType) => {
  const { anime_name, anime_id, anime_image } = props;
  const { toast } = useToast();
  const router = useRouter();

  const handle = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/collection`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ anime_name, anime_id, anime_image }),
      }
    );

    if (response.status === 200) {
      router.refresh();
      return toast({
        title: "Yey! success added anime to collection",
        description: "Check your collection now!",
      });
    } else {
      return toast({
        title: "Ups! something wrong",
        description: "This anime was added to our collection",
        variant: "destructive",
      });
    }
  };

  return (
    <Button className="ml-6 mb-4" onClick={handle}>
      Add to collection
    </Button>
  );
};

export default HandleAddCollection;
