import Navbar from "@/components/layout/navbar";
import Popular from "@/components/Popular";
import RecommendationsList from "@/components/Recommendations";
import Footer from "@/components/layout/footer";
import HeaderContent from "@/components/ui/header-content";
import { getAnimeResponse, getNestedAnime, reproduce } from "@/lib/utils";

export default async function Page() {
  const popularAnime = await getAnimeResponse("top/anime", "limit=10");
  const recommendAnime = await getNestedAnime("recommendations/anime", "entry");
  const prAnime = reproduce(recommendAnime, 5);

  return (
    <>
      <Navbar />
      <main className="mt-16 px-2 md:px-6">
        <HeaderContent title="Popular" linkHref="/anime/popular" />
        <Popular api={popularAnime} />

        <HeaderContent title="Recommendations" />
        <RecommendationsList api={prAnime} />
      </main>
      <Footer />
    </>
  );
}
