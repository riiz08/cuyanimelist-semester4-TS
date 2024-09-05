import { Skeleton } from "../ui/skeleton";

const SkeletonPopular = () => {
  const dummyData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  return (
    <div className="w-full flex md:gap-4 px-2 flex-wrap gap-2 py-2 md:px-4 justify-center items-center">
      {dummyData.map((dummy: any, index: number) => (
        <Skeleton
          className="w-40 md:w-48 h-80 bg-cover bg-no-repeat bg-center relative hover:scale-105"
          key={index}
        />
      ))}
    </div>
  );
};

export default SkeletonPopular;
