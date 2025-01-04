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
      <div className="container">
        <h2 className="search-results">Search results for {query} :</h2>
        {movies.length > 0 ? (
          <MovieApp movies={movies} />
        ) : (
          <p>No movies found for {query}</p>
        )}
      </div>

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .search-results {
          color: #fff;
          font-size: 1.5rem;
          margin-left: 2rem;
        }
      `}</style>
      <Footer />
    </div>
  );
}
