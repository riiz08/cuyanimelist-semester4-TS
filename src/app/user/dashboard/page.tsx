import Navbar from "@/components/ui/navbar";
import ProfileUser from "@/components/ui/profileuser";
import TabsUser from "@/components/ui/tabs-user";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="md:py-20 md:px-6">
        <div className="flex w-[90%] items-center gap-4">
          <ProfileUser />
          <TabsUser />
        </div>
      </main>
    </>
  );
}
