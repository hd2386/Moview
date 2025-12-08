const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "/placeholder_film.svg";
import { useRouter } from "next/router";
import { useMemo, useCallback, memo } from "react";
import Image from "next/image";

function MovieCard({ movie, onMovieClick }) {
  const getClassByRate = useCallback((vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }, []);

  const handleClick = useCallback(() => {
    onMovieClick(movie.id);
  }, [movie.id, onMovieClick]);

  const voteClass = useMemo(
    () => getClassByRate(movie.vote_average),
    [movie.vote_average, getClassByRate]
  );

  return (
    <div className="movie" onClick={handleClick}>
      <Image
        src={movie.poster_path ? IMG_PATH + movie.poster_path : FALLBACK_POSTER}
        alt={movie.title}
        width={300}
        height={450}
        loading="lazy"
        unoptimized
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className={voteClass}>{movie.vote_average}</span>
      </div>
      <div className="overview">
        <h3>Overview</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

const MemoizedMovieCard = memo(MovieCard);

export default function MovieApp({ movies }) {
  const router = useRouter();

  const handleMovieClick = useCallback(
    (movieId) => {
      router.push(`/movies/${movieId}`);
    },
    [router]
  );

  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <main id="main">
      {memoizedMovies.map((movie) => (
        <MemoizedMovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={handleMovieClick}
        />
      ))}
    </main>
  );
}
