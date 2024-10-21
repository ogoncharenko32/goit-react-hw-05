import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';

import { getTrendsMovies } from '../../api/api';

import { ThreeDots } from 'react-loader-spinner';

const HomePage = () => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchMovies = async () => {
      try {
        const data = await getTrendsMovies();
        setMovieData(data.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
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

export default HomePage;
