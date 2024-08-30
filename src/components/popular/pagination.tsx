import { PaginationAnime } from "@/types/anime";
import { Button } from "../ui/button";

const Pagination = ({ page, setPage }: PaginationAnime) => {
  const handlePrev = () => {
    setPage((prevState: number) => prevState - 1);
    scrollTop();
  };

  const handleNext = () => {
    setPage((prevState: number) => prevState + 1);
    scrollTop();
  };

  const scrollTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      {page > 1 ? (
        <Button
          variant={"secondary"}
          onClick={handlePrev}
          className="font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Prev
        </Button>
      ) : null}
      <Button variant={"ghost"}>{page}</Button>
      <Button
        variant={"secondary"}
        onClick={handleNext}
        className="font-semibold"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
