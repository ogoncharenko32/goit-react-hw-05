import { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../api/api';
import { useSearchParams } from 'react-router-dom';

import { ThreeDots } from 'react-loader-spinner';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchValue = searchParams.get('query');

  const onSearch = query => {
    console.log(query);
    setSearchParams({ query });
  };

  useEffect(() => {
    setLoading(true);

    const fetchMovies = async searchValue => {
      try {
        const data = await searchMovies(searchValue);
        setMovieData(data.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(searchValue);
  }, [searchParams]);

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
        />
      )}
      {movieData && <MovieList data={movieData} />}
    </div>
  );
};

export default MoviesPage;
