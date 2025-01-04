import Head from "next/head";
import MovieApp from "./MovieApp";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function MoviePage({ data, type }) {
  return (
    <>
      <Head>
        <title>{type.charAt(0).toUpperCase() + type.slice(1)} Movies</title>
      </Head>
      <Navbar />
      <div>
        <h1 style={{ display: "none" }}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Movies
        </h1>
        <MovieApp movies={data.results} />
      </div>
      <Footer />
    </>
  );
}
