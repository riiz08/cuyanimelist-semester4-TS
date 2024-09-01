"use client";

import React, { useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const keyword = searchRef.current?.value;
    if (!keyword || keyword.trim() == "") {
      if (event.type === "click" || ("key" in event && event.key === "Enter")) {
        event.preventDefault();
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }

      return;
    }

    if ("key" in event && event.key === "Enter") {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    } else if (event.type === "click") {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <Input
        onKeyDown={handleSearch}
        placeholder="Cari Anime"
        ref={searchRef}
      />
      <Button
        className="absolute top-0 right-0"
        variant={"ghost"}
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default InputSearch;
