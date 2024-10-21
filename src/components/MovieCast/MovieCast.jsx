import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCast } from '../../api/api';

import { ThreeDots } from 'react-loader-spinner';
import { nanoid } from 'nanoid';

import css from './MovieCast.module.css';
import clsx from 'clsx';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);

    const fetchData = async id => {
      try {
        const data = await getCast(id);
        setMovieCast(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(movieId);
  }, [movieId]);

  return (
    <div className={clsx(css.wrapper)}>
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
      {movieCast && (
        <div>
          <h2>Cast</h2>
          <div className={clsx(css.credits)}>
            {movieCast.cast.map(cast => (
              <li className={clsx(css.card)} key={nanoid()}>
                <img
                  src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : `${defaultImg}`}
                  alt={cast.name}
                  width={100}
                />
                <div>
                  <h3>Character:</h3>
                  <p>{cast.character}</p>
                  <h3>Name:</h3>
                  <p>{cast.original_name}</p>
                </div>
              </li>
            ))}
          </div>
          <h2>Crew</h2>
          <div className={clsx(css.credits)}>
            {movieCast.crew.map(crew => (
              <li className={clsx(css.card)} key={nanoid()}>
                <img
                  src={crew.profile_path ? `https://image.tmdb.org/t/p/w500${crew.profile_path}` : `${defaultImg}`}
                  alt={crew.name}
                  width={100}
                />
                <div>
                  <h3>Job:</h3>
                  <p>{crew.job}</p>
                  <h3>Name:</h3>
                  <p>{crew.original_name}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCast;
