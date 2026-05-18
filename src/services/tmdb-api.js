import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "en-US",
  },
});

tmdbApi.interceptors.request.use((config) => {
  if (!API_TOKEN) {
    throw new Error(
      "TMDB access token is missing. Add VITE_TMDB_TOKEN to .env",
    );
  }

  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  return config;
});

export const getTrendingMovies = async () => {
  const { data } = await tmdbApi.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await tmdbApi.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      page: 1,
    },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCredits = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await tmdbApi.get(`/movie/${movieId}/reviews`);
  return data.results;
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    return null;
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
};
