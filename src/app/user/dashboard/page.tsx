import Navbar from "@/components/layout/navbar";
import ProfileUser from "@/components/ui/profile-user";
import TabsUser from "@/components/ui/tabs-user";
import { authSession } from "@/lib/auth";

export default async function Page() {
  const session = await authSession();
  return (
    <>
      <Navbar />
      <main className="py-16 px-4 md:py-20 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-[90%] gap-4">
          <ProfileUser />
          <TabsUser email={String(session?.email)} />
        </div>
      </main>
    </>
  );
}
