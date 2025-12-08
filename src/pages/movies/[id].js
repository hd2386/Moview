import MovieDetails from "../../components/MovieDetails";
import {
  getCachedData,
  setCachedData,
  generateCacheKey,
} from "../../utils/apiCache";

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Check cache first
  const cacheKey = generateCacheKey(`movie_${id}`);
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return {
      props: cachedData,
    };
  }

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  try {
    const [movieRes, videosRes, creditsRes, similarRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        options
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        options
      ),
    ]);

    const [movie, videos, credits, similar] = await Promise.all([
      movieRes.json(),
      videosRes.json(),
      creditsRes.json(),
      similarRes.json(),
    ]);

    const result = {
      movie,
      videos,
      credits,
      similar,
      movieId: id,
    };

    // Cache the result
    setCachedData(cacheKey, result);

    return {
      props: result,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        movie: {},
        videos: { results: [] },
        credits: { cast: [], crew: [] },
        similar: { results: [] },
        movieId: id,
      },
    };
  }
}

export default function MovieDetailsPage({
  movie,
  videos,
  credits,
  similar,
  movieId,
}) {
  return (
    <MovieDetails
      movie={movie}
      videos={videos}
      credits={credits}
      similar={similar}
      movieId={movieId}
    />
  );
}
