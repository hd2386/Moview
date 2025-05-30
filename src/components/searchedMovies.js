// src/components/searchedMovies.js
import MovieApp from "./MovieApp";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function SearchedMoviesPage({ data, query }) {
  // Ensure to provide a fallback to an empty array
  const movies = data?.results || [];
  //console.log(movies);

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
