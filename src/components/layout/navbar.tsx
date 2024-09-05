import { authSession } from "@/lib/auth";
import Link from "next/link";
import InputSearch from "../ui/input-search";
import { Button } from "../ui/button";
import DialogSignOut from "../ui/alert-dialog-signout";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = async () => {
  const session = await authSession();

  return (
    <header>
      <nav className="hidden md:flex fixed top-0 w-full bg-secondary/20 z-50 shadow-sm backdrop-blur-sm justify-between items-center py-2 px-4">
        <Link href={"/"}>
          <h1 className="font-extrabold text-2xl tracking-wide text-primary">
            CUYANIMELIST
          </h1>
        </Link>
        <div className="flex gap-2">
          <InputSearch />
          {!session ? (
            <Link href={"/auth/signin"}>
              <Button>Sign In</Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href={"/user/dashboard"}>
                <Button variant={"outline"}>Dashboard</Button>
              </Link>
              <DialogSignOut />
            </div>
          )}
        </div>
      </nav>
      <nav className="w-full flex justify-between items-center md:hidden py-2 px-4 bg-secondary/20 backdrop-blur-sm fixed top-0 z-10">
        <Link href={"/"}>
          <h2 className="font-extrabold tracking-wide text-primary text-xl">
            CUYANIMELIST
          </h2>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="py-4">
              <InputSearch />
              {!session ? (
                <Link href={"/auth/signin"}>
                  <Button className="mt-2">Sign In</Button>
                </Link>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link href={"/user/dashboard"}>
                    <Button variant={"outline"}>Dashboard</Button>
                  </Link>
                  <DialogSignOut />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
