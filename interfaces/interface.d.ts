interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  movie_id: number;
  title: string;
  poster_url: string;
  count: number;
}

interface MovieGenre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface MovieDetails extends Movie {
  runtime?: number;
  budget?: number;
  revenue?: number;
  genres?: MovieGenre[];
  production_companies?: ProductionCompany[];
}
