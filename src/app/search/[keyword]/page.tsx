import { Card, CardFooter } from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import HeaderContent from "@/components/ui/header-content";
import Navbar from "@/components/ui/navbar";
import { getAnimeResponse } from "@/lib/utils";
import { Anime } from "@/types/anime";
import Link from "next/link";

type Params = {
  params: Record<string, string>;
};

export default async function Page({ params }: Params) {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);
  const animes = await getAnimeResponse("anime", `q=${decodeKeyword}`);

  return (
    <>
      <Navbar />
      <main className="my-16 px-6">
        <HeaderContent title={`Hasil Pencarian Untuk ${decodeKeyword}...`} />
        <div className="w-full flex gap-4 flex-wrap py-2 px-4 justify-center items-center">
          {animes.map((anime: Anime, index: number) => {
            return (
              <Link href={`/anime/${anime.mal_id}`} key={index}>
                <Card
                  style={{
                    backgroundImage: `url(${anime.images.webp.large_image_url})`,
                  }}
                  className="w-48 h-80 bg-cover bg-no-repeat bg-center relative hover:scale-105"
                >
                  <CardFooter className="absolute font-bold text-accent bg-gradient-to-t from-primary w-full rounded-lg to-transparent bottom-0">
                    {anime.title}
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
