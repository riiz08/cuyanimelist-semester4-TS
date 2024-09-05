import PopularList from "@/components/popular/popularlist";
import Footer from "@/components/layout/footer";
import HeaderContent from "@/components/ui/header-content";
import { getAnimeResponse } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";

const Page = async () => {
  const popular = await getAnimeResponse("top/anime");
  return (
    <>
      <Navbar />
      <main className="my-16 px-4">
        <HeaderContent title="Popular Anime" />
        <PopularList />
      </main>
      <Footer />
    </>
  );
};

export default Page;
