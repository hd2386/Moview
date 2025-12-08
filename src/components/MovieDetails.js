import Navbar from "./navbar";
import MovieApp from "./MovieApp";
import Footer from "./Footer";
import { useMemo, memo, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const LazyMovieApp = dynamic(() => import("./MovieApp"), {
  loading: () => (
    <div style={{ color: "white" }}>Loading similar movies...</div>
  ),
});

function CastItem({ actor }) {
  const IMG_PATH = "https://image.tmdb.org/t/p/w185";

  const getClassByRate = useCallback((popularity) => {
    if (popularity >= 20) {
      return "green";
    } else if (popularity >= 10) {
      return "orange";
    } else {
      return "red";
    }
  }, []);

  const popularityClass = useMemo(
    () => getClassByRate(actor.popularity),
    [actor.popularity, getClassByRate]
  );

  return (
    <li className="cast-item">
      <Image
        src={
          actor.profile_path
            ? `${IMG_PATH}${actor.profile_path}`
            : "/placeholder_actor.svg"
        }
        alt={actor.name}
        className="profile-image"
        width={60}
        height={90}
        loading="lazy"
      />
      <div className="actor-info">
        <span className={`popularity ${popularityClass}`}>
          {actor.popularity.toFixed(1)}
        </span>
        <span className="actor-name">{actor.name}</span>
        <span className="character">as {actor.character}</span>
      </div>
    </li>
  );
}

const MemoizedCastItem = memo(CastItem);

export default function MovieDetails({
  movie,
  videos,
  credits,
  similar,
  movieId,
}) {
  const trailers = useMemo(
    () => videos.results?.filter((video) => video.type === "Trailer") || [],
    [videos.results]
  );

  const cast = useMemo(
    () =>
      credits.cast?.slice(0, 10).sort((a, b) => b.popularity - a.popularity) ||
      [],
    [credits.cast]
  );

  return (
    <div>
      <Navbar />
      <div className="movie-details-container">
        <div className="video-section">
          <h1 className="movie-title">{movie.title}</h1>
          {trailers.length > 0 ? (
            <div className="trailer-container">
              <iframe
                width="700"
                height="400"
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="trailer-iframe"
              />
            </div>
          ) : (
            <div className="trailer-placeholder">
              <Image
                src="/placeholder_trailer.svg"
                alt="No Trailer Available"
                width={700}
                height={400}
                unoptimized
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
          <h2 className="similar-title">Similar Movies</h2>
          {similar.results && similar.results.length > 0 ? (
            <LazyMovieApp movies={similar.results} />
          ) : (
            <div className="similar-movies-placeholder">
              <p style={{ color: "#8197a4", marginTop: "2rem" }}>
                No similar movies found
              </p>
            </div>
          )}
        </div>
        <div className="credits-section">
          <h2>Cast</h2>
          <br />
          {cast && cast.length > 0 ? (
            <ul>
              {cast.map((actor) => (
                <MemoizedCastItem key={actor.id} actor={actor} />
              ))}
            </ul>
          ) : (
            <div className="cast-placeholder">
              <p style={{ color: "#8197a4", marginTop: "2rem" }}>
                No cast information available
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
