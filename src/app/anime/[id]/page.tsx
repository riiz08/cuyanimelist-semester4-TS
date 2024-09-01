import Footer from "@/components/ui/footer";
import HandleAddCollection from "@/components/ui/handle-add-collection";
import HandleRemoveCollection from "@/components/ui/handle-remove-collection";
import Navbar from "@/components/ui/navbar";
import VideoPlayer from "@/components/ui/videoplayer";
import { prisma } from "@/lib/prisma";
import { getAnimeResponse } from "@/lib/utils";
import Image from "next/image";

type Params = {
  params: Record<string, string>;
};

type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export default async function Page({ params }: Params) {
  const { id } = params;
  const anime = await getAnimeResponse(`anime/${id}`);
  const cekCollection = await prisma.collection.findFirst({
    where: {
      anime_id: anime.mal_id,
    },
  });

  console.log(cekCollection);

  return (
    <>
      <Navbar />
      <main className="py-20 md:py-28">
        {!cekCollection ? (
          <HandleAddCollection
            anime_name={anime.title}
            anime_id={anime.mal_id}
            anime_image={anime.images.webp.large_image_url}
          />
        ) : (
          <HandleRemoveCollection anime_id={anime.mal_id} />
        )}
        <section className="px-6 flex gap-4 md:flex-row flex-col">
          <Image
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            width={400}
            height={350}
            className="rounded-md mx-auto"
          />
          <div className="">
            <h2 className="text-2xl font-bold">{anime.title}</h2>
            <div className="flex gap-2 text-sm mt-4">
              {anime.genres.map((genre: Genre, index: number) => {
                return (
                  <div key={index}>
                    <span className="border rounded-lg py-1 px-2 border-primary">
                      {genre.name}
                    </span>
                  </div>
                );
              })}
            </div>
            <blockquote className="my-6">{anime.synopsis}</blockquote>
            <div>
              <h4>
                <span className="font-semibold">Type</span> : {anime.type}
              </h4>
              <h4>
                <span className="font-semibold">Episodes</span> :{" "}
                {anime.episodes}
              </h4>
              <h4>
                <span className="font-semibold">Rating</span> : {anime.rating}
              </h4>
              <h4>
                <span className="font-semibold">Status</span> : {anime.status}
              </h4>
            </div>
          </div>
        </section>
        <div>
          <VideoPlayer youtubeId={anime.trailer.youtube_id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
