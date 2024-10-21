import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { getReviews } from '../../api/api';

import { ThreeDots } from 'react-loader-spinner';

import css from './MovieReviews.module.css';
import clsx from 'clsx';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);

    const fetchData = async id => {
      try {
        const data = await getReviews(id);
        setMovieReviews(data);
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
      {movieReviews && movieReviews.results.length > 0 ? (
        <div className={clsx(css.wrapper)}>
          {movieReviews.results.map(review => (
            <li className={clsx(css.review)} key={nanoid()}>
              <h3>Author: {review.author}</h3>
              <h3>Review:</h3>
              <p>{review.content}</p>
              <p>Rating: {review.author_details.rating}</p>
            </li>
          ))}
        </div>
      ) : (
        <p> No reviews found </p>
      )}
    </div>
  );
};

export default MovieReviews;
