import MoviePage from "../../components/MoviePage";

export async function getServerSideProps(context) {
  const { query } = context;
  const { type = "upcoming" } = query;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  try {
    const allResults = [];

    // Fetch 5 pages
    for (let page = 1; page <= 5; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      allResults.push(...data.results);
    }

    return {
      props: {
        data: { results: allResults },
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
