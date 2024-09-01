import Link from "next/link";

type Props = {
  title: string;
  linkHref?: string;
};

const HeaderContent = ({ title, linkHref }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      {linkHref ? (
        <Link
          href={linkHref}
          className="hover:underline hover:text-primary underline-offset-2 transition-all"
        >
          View All
        </Link>
      ) : null}
    </div>
  );
};

export default HeaderContent;
