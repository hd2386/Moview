import Navbar from "./navbar";
import MovieApp from "./MovieApp";
import Footer from "./Footer";

export default function MovieDetails({
  movie,
  videos,
  credits,
  similar,
  movieId,
}) {
  const IMG_PATH = "https://image.tmdb.org/t/p/w185";
  const trailers =
    videos.results?.filter((video) => video.type === "Trailer") || [];
  const cast =
    credits.cast?.slice(0, 10).sort((a, b) => b.popularity - a.popularity) ||
    [];

  function getClassByRate(popularity) {
    if (popularity >= 20) {
      return "green";
    } else if (popularity >= 10) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div>
      <Navbar />
      <div className="movie-details-container">
        <div className="video-section">
          <h1 className="movie-title">{movie.title}</h1>
          {trailers.length > 0 && (
            <iframe
              width="700"
              height="400"
              src={`https://www.youtube.com/embed/${trailers[0].key}`}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            />
          )}
          <h2 className="similar-title">Similar Movies</h2>
          <MovieApp movies={similar.results} />
        </div>
        <div className="credits-section">
          <h2>Cast</h2>
          <br />
          <ul>
            {cast.map((actor) => (
              <li key={actor.id} className="cast-item">
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_PATH}${actor.profile_path}`
                      : "/placeholder.jpg"
                  }
                  alt={actor.name}
                  className="profile-image"
                />
                <div className="actor-info">
                  <span
                    className={`popularity ${getClassByRate(actor.popularity)}`}
                  >
                    {actor.popularity.toFixed(1)}
                  </span>
                  <span className="actor-name">{actor.name}</span>
                  <span className="character">as {actor.character}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
