import PopularList from "@/components/popular/popularlist";
import Footer from "@/components/ui/footer";
import HeaderContent from "@/components/ui/headercontent";
import Navbar from "@/components/ui/navbar";
import { getAnimeResponse } from "@/lib/utils";

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
