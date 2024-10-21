import { useParams, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMovieById } from '../../api/api';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

import { ThreeDots } from 'react-loader-spinner';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cssClasses = ({ isActive }) => clsx(css.link, isActive && css.active);

  const backUrl = location.state?.from || 'movies';
  const goBack = () => navigate(backUrl);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const fetchData = async movieId => {
      setLoading(true);

      try {
        const data = await getMovieById(movieId);
        setMovieData(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData(movieId);
  }, [movieId]);

  return (
    <div>
      <button className={clsx(css.btn)} onClick={goBack}>
        Go back
      </button>
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
      {movieData && (
        <div className={clsx(css.wrapper)}>
          <MovieDetails data={movieData} />
          <div className={clsx(css.creditsWrapper)}>
            <div>
              <NavLink className={cssClasses} state={location.state} to="cast">
                Cast
              </NavLink>
              <NavLink className={cssClasses} state={location.state} to="reviews">
                Reviews
              </NavLink>
            </div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
