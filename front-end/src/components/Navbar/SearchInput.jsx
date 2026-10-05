import { useState } from 'react';

/* ─────────────────────────────────────────────
   SearchInput
   Full-width search bar in the Navbar.

   Design: Monolith System
   - Flat, 1px border, no shadow
   - JetBrains Mono placeholder (technical feel)
   - Clear (×) button appears on the right when
     the user has typed something

   Props:
     onSearch – called with the query string on change / clear
   ───────────────────────────────────────────── */

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  /* Clear the input and notify parent */
  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form
      role="search"
      className="flex-1 w-full"
      aria-label="Search bookmarks"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative flex items-center">

        {/* Leading search icon */}
        <span className="absolute left-3 text-text-disabled pointer-events-none">
          <SearchIcon />
        </span>

        {/* Input field – pr-8 leaves room for the clear button */}
        <input
          id="navbar-search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search bookmarks..."
          aria-label="Search bookmarks"
          className="
            w-full h-8
            pl-9 pr-8
            rounded bg-canvas border border-border
            text-text-high text-[13px] font-geist
            placeholder:font-mono placeholder:text-[11px] placeholder:tracking-wider placeholder:text-text-disabled
            focus:outline-none focus:border-border-hover
            transition-colors duration-150
          "
        />

        {/* Clear button – only visible when query is non-empty */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="
              absolute right-2
              flex items-center justify-center w-5 h-5 rounded
              text-text-disabled hover:text-text-high
              transition-colors duration-150
            "
          >
            <ClearIcon />
          </button>
        )}

      </div>
    </form>
  );
}
