// /types/anime.ts

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    webp: {
      large_image_url: string;
    };
  };
}

export interface PaginationAnime {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface CollectionType {
  anime_id: string;
  anime_name: string;
  anime_image: string;
}
