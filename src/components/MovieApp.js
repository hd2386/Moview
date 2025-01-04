const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
import { useRouter } from "next/router";

export default function MovieApp({ movies }) {
  const router = useRouter();

  const handleMovieClick = (movieId) => {
    router.push(`/movies/${movieId}`);
  };

  function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <main id="main">
      {movies.map((movie) => (
        <div
          className="movie"
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)}
        >
          <img src={IMG_PATH + movie.poster_path} alt={movie.title} />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <span className={getClassByRate(movie.vote_average)}>
              {movie.vote_average}
            </span>
          </div>
          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
