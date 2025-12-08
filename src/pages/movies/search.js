import SearchedMoviesPage from "../../components/searchedMovies";
import {
  getCachedData,
  setCachedData,
  generateCacheKey,
} from "../../utils/apiCache";

export default function SearchPage(props) {
  return <SearchedMoviesPage {...props} />;
}

export async function getServerSideProps(context) {
  const searchTerm = context.query?.query || "";

  if (!searchTerm.trim()) {
    return {
      props: {
        data: { results: [] },
        query: "",
      },
    };
  }

  // Check cache first
  const cacheKey = generateCacheKey(`search_${searchTerm}`);
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
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    const result = {
      data,
      query: searchTerm,
    };

    // Cache the result
    setCachedData(cacheKey, result);

    return {
      props: result,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        data: { results: [] },
        query: searchTerm,
      },
    };
  }
}
