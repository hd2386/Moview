// src/components/searchedMovies.js
import MovieApp from "./MovieApp";
import Navbar from "./navbar";
import Footer from "./Footer";
import { useMemo, memo } from "react";

function SearchedMoviesPage({ data, query }) {
  const movies = useMemo(() => data?.results || [], [data?.results]);

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <h2 className="search-results">Search results for {query} :</h2>
        {movies.length > 0 ? (
          <MovieApp movies={movies} />
        ) : (
          <p>No movies found for {query}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default memo(SearchedMoviesPage);
