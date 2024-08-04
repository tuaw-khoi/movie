export type Tmovie = {
  id: string;
  title: string;
  release_year: string;
  description: string;
  runtime: number;
  country_id?: string | null;
  moviesUrl_id?: string | null;
  genre_id: string | null;
  img_url: string;
  trailer_url: string;
  directors: string;
  actor: string;
};
