import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(
        `/movies/search?query=${encodeURIComponent(searchTerm.trim())}`
      ); // Trim spaces from search term
    }
  };

  return (
    <header>
      <Link href="/movies?type=upcoming" style={{ textDecoration: "none" }}>
        <h1>MOVIEW</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/movies?type=top_rated">Top Rated</Link>
          </li>
          <li>
            <Link href="/movies?type=popular">Popular</Link>
          </li>
          <li>
            <Link href="/movies?type=upcoming">Upcoming</Link>
          </li>
          <li>
            <Link href="/movies?type=now_playing">Now Playing</Link>
          </li>
        </ul>
      </nav>
      <form id="form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search"
          placeholder="Search movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </header>
  );
}
