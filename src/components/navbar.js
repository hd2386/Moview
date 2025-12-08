import Link from "next/link";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const debounceTimer = useRef(null);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(
          `/movies/search?query=${encodeURIComponent(searchTerm.trim())}`
        );
        setIsSearchOpen(false);
      }
    },
    [searchTerm, router]
  );

  useEffect(() => {
    const timer = debounceTimer.current;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      setIsSearchOpen(false);
      return !prev;
    });
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      setIsMenuOpen(false);
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Search Overlay */}
      <div
        className={`search-overlay ${isSearchOpen ? "active" : ""}`}
        onClick={closeSearch}
      ></div>

      <header>
        <div className="nav-left">
          <Link href="/movies?type=upcoming" style={{ textDecoration: "none" }}>
            <h1>MOVIEW</h1>
          </Link>

          <nav className={isMenuOpen ? "nav-open" : ""}>
            <ul>
              <li>
                <Link href="/movies?type=top_rated" onClick={closeMenu}>
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/movies?type=popular" onClick={closeMenu}>
                  Popular
                </Link>
              </li>
              <li>
                <Link href="/movies?type=upcoming" onClick={closeMenu}>
                  Upcoming
                </Link>
              </li>
              <li>
                <Link href="/movies?type=now_playing" onClick={closeMenu}>
                  Now Playing
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Desktop Search Input (always at far right) */}
        <div className="desktop-search">
          <form id="form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search"
              placeholder="Search movies"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="mobile-controls">
          {/* Mobile Search Icon */}
          <button
            className="search-icon-btn"
            onClick={toggleSearch}
            aria-label="Search movies"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className={`mobile-search ${isSearchOpen ? "active" : ""}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search"
              placeholder="Search movies"
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
            />
          </form>
        </div>
      </header>
    </>
  );
}
