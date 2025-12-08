import MoviePage from "../../components/MoviePage";
import {
  getCachedData,
  setCachedData,
  generateCacheKey,
} from "../../utils/apiCache";

export async function getServerSideProps(context) {
  const { query } = context;
  const { type = "upcoming" } = query;

  // Check cache first
  const cacheKey = generateCacheKey(`movies_${type}`);
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return {
      props: {
        data: cachedData,
        type,
      },
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
    // Fetch pages in parallel instead of sequentially
    const pagePromises = Array.from({ length: 5 }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${
          i + 1
        }`,
        options
      ).then((res) => res.json())
    );

    const pages = await Promise.all(pagePromises);
    const allResults = pages.flatMap((page) => page.results || []);
    const resultData = { results: allResults };

    // Cache the result
    setCachedData(cacheKey, resultData);

    return {
      props: {
        data: resultData,
        type,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return { props: { data: { results: [] }, type } };
  }
}

export default function MoviesPage({ data, type }) {
  return <MoviePage data={data} type={type} />;
}
