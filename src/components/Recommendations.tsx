import { Anime } from "@/types/anime";
import Link from "next/link";
import { Card, CardFooter } from "./ui/card";

const RecommendationsList = ({ api }: any) => {
  return (
    <section className="py-2 px-6">
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
                <CardFooter className="absolute font-bold text-accent bg-gradient-to-t from-primary w-full rounded-lg to-transparent bottom-0">
                  {anime.title}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendationsList;
