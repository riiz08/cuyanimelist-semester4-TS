"use client";
import { Anime } from "@/types/anime";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import Pagination from "./pagination";
import { getAnimeResponse } from "@/lib/utils";

const PopularList = () => {
  const [page, setPage] = useState(1);
  const [api, setApi] = useState<Anime[]>([]);

  const fetchData = async () => {
    const response = await getAnimeResponse("top/anime", `page=${page}`);
    setApi(response);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <div className="w-full flex gap-4 flex-wrap py-2 px-4 justify-center items-center">
        {api?.map((anime: Anime, index: number) => {
          return (
            <Link href={`/anime/${anime.mal_id}`} key={index}>
              <Card
                style={{
                  backgroundImage: `url(${anime.images.webp.large_image_url})`,
                }}
                className="w-48 h-80 bg-cover bg-no-repeat bg-center relative hover:scale-105"
              >
                <CardHeader>
                  <CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 absolute top-2 left-2 text-secondary bg-destructive rounded-full p-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                      />
                    </svg>
                  </CardTitle>
                </CardHeader>
                <CardFooter className="absolute font-bold text-accent bg-gradient-to-t from-primary w-full rounded-lg to-transparent bottom-0">
                  {anime.title}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default PopularList;
