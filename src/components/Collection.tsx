import Link from "next/link";
import { Card, CardFooter } from "./ui/card";
import { authSession } from "@/lib/auth";

const Collection = async () => {
  const session = await authSession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER}/collection?email=${session?.email}`
  );

  const data = await response.json();

  const myCollection = data.collection;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-y-4 gap-x-4">
      {myCollection?.map((collection: any, index: number) => (
        <Link href={`/anime/${collection.anime_id}`} key={index}>
          <Card
            style={{
              backgroundImage: `url(${collection.anime_image})`,
            }}
            className="w-32 md:w-44 h-48 md:h-72 bg-cover bg-no-repeat bg-center relative hover:scale-105"
          >
            <CardFooter className="px-0">
              <p className="absolute px-2 rounded-md w-full font-bold text-accent shadow-md max-w-xs text-nowrap bg-gradient-to-t from-primary to-trasnparent bottom-0 text-ellipsis overflow-hidden">
                {collection.anime_name}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Collection;
