import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {data.map(movie => (
          <li key={nanoid()}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
