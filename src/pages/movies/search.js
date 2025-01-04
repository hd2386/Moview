import SearchedMoviesPage from "../../components/searchedMovies";

export default function SearchPage(props) {
  return <SearchedMoviesPage {...props} />;
}

export async function getServerSideProps(context) {
  const searchTerm = context.query?.query || "";

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

    return {
      props: {
        data,
        query: searchTerm,
      },
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
