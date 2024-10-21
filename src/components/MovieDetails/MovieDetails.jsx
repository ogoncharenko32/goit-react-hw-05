import clsx from 'clsx';
import css from './MovieDetails.module.css';

const MovieDetails = ({ data }) => {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <div className={clsx(css.wrapper)}>
        <img
          src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : `${defaultImg}`}
          width={250}
          alt="poster"
        />
        <div>
          <h2>{data.original_title}</h2>
          <h3>{data.tagline}</h3>
          <h3>Overview:</h3>
          <p>{data.overview}</p>
          <h3>Rating: {data.vote_average}</h3>
          <h3>
            Genres:
            {data.genres.map(genre => ` ${genre.name} `)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
