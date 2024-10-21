import axios from 'axios';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjYwY2E3MDIzY2MxODc1YjQyMzVjYzUyZjQwZDk5MCIsIm5iZiI6MTcyODgyNDIzMi4xMDcwODgsInN1YiI6IjY3MGJjMjc1MzdkODZkNTIwYmIwZTViNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rh9MB3X4-9NVFnAnXIED30IRjxIOvCH4N6toRYCXnrg',
  },
  params: {
    include_adult: false,
    language: 'en-US',
  },
});

export const getTrendsMovies = async () => {
  const { data } = await moviesInstance.get('/trending/movie/week?language=en-US');
  return data;
};

export const getMovieById = async id => {
  const { data } = await moviesInstance.get(`/movie/${id}?language=en-US`);
  return data;
};

export const getCast = async id => {
  const { data } = await moviesInstance.get(`/movie/${id}/credits?language=en-US`);
  return data;
};

export const getReviews = async id => {
  const { data } = await moviesInstance.get(`/movie/${id}/reviews?language=en-US`);
  return data;
};

export const searchMovies = async query => {
  const { data } = await moviesInstance.get('/search/movie', {
    params: {
      query: query,
    },
  });
  return data;
};
