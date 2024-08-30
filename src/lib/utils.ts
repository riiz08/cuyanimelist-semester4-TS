import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAnimeResponse(resource: string, query?: string) {
  const animes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
  );
  const response = await animes.json();
  return response.data;
}

export async function getNestedAnime(resource: string, objectProperty: string) {
  const response = await getAnimeResponse(resource);

  return response.flatMap((item: any) => item[objectProperty]);
}

export function reproduce(data: any, gap: number) {
  const first = ~~Math.floor(Math.random() * (data.length - gap) + 1);
  const last = first + gap;
  const response = data.slice(first, last);

  return response;
}
