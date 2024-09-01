import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Anime } from "@/types/anime";

export default function Popular({ api }: any) {
  return (
    <div className="w-full flex md:gap-4 px-2 flex-wrap gap-2 py-2 md:px-4 justify-center items-center">
      {api.map((anime: Anime, index: number) => {
        return (
          <Link href={`/anime/${anime.mal_id}`} key={index}>
            <Card
              style={{
                backgroundImage: `url(${anime.images.webp.large_image_url})`,
              }}
              className="w-40 md:w-48 h-80 bg-cover bg-no-repeat bg-center relative hover:scale-105"
            >
              <CardHeader>
                <CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7 absolute top-2 left-2 bg-destructive p-1 rounded-full text-secondary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </CardTitle>
              </CardHeader>
              <CardFooter className="px-0">
                <p className="absolute px-2 rounded-md w-full font-bold text-accent shadow-md max-w-xs text-nowrap bg-gradient-to-t from-primary to-trasnparent bottom-0 text-ellipsis overflow-hidden">
                  {anime.title}
                </p>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
