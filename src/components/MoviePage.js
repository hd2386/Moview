import Head from "next/head";
import MovieApp from "./MovieApp";
import Navbar from "./navbar";
import Footer from "./Footer";
import { memo } from "react";

function MoviePage({ data, type }) {
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <Head>
        <title>{title} Movies</title>
      </Head>
      <Navbar />
      <div className="page-container">
        <h1 style={{ display: "none" }}>{title} Movies</h1>
        <MovieApp movies={data.results} />
      </div>
      <Footer />
    </>
  );
}

export default memo(MoviePage);
