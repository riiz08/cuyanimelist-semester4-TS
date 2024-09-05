import { Card, CardContent } from "@/components/ui/card";
import CommentDisplay from "@/components/ui/comment-display";
import CommentInput from "@/components/ui/comment-input";
import Footer from "@/components/ui/footer";
import HandleAddCollection from "@/components/ui/handle-add-collection";
import HandleRemoveCollection from "@/components/ui/handle-remove-collection";
import HeaderContent from "@/components/ui/header-content";
import Navbar from "@/components/ui/navbar";
import VideoPlayer from "@/components/ui/videoplayer";
import { authSession } from "@/lib/auth";
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
  const session = await authSession();

  return (
    <>
      <Navbar />
      <main className="py-20 md:pt-24">
        <div className="mt-4">
          {!cekCollection ? (
            <HandleAddCollection
              anime_name={anime.title}
              anime_id={anime.mal_id}
              anime_image={anime.images.webp.large_image_url}
            />
          ) : (
            <HandleRemoveCollection anime_id={anime.mal_id} />
          )}
        </div>
        <Card className="bg-white/20 mx-4 py-4 backdrop-blur-sm">
          <CardContent className="px-6 flex gap-4 md:flex-row flex-col">
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              width={400}
              height={350}
              priority
              className="rounded-md md:w-[30%] mx-auto"
            />
            <div className="md:w-[50%]">
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
          </CardContent>
        </Card>
        <div className="px-4 mt-2">
          <HeaderContent title="Comment" />
        </div>

        <div className="mt-2">
          <CommentDisplay animeId={anime.mal_id} />
        </div>

        {session && (
          <CommentInput animeId={anime.mal_id} animeName={anime.title} />
        )}
        <div>
          {anime.trailer.youtube_id ? (
            <VideoPlayer youtubeId={anime.trailer.youtube_id} />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
