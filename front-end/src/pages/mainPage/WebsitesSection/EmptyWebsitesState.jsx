import React from 'react';
import Button from '../../../components/Button';

/* ─────────────────────────────────────────────
   EmptyWebsitesState Component (Monolith System)
   
   Technical Minimalist empty state for:
   1. Brand-new account with zero bookmarks
   2. Search query yielding zero matches
   
   Conforms to DESIGN.md:
   - Elevated soft-square module (8px radius)
   - Geist heading with negative tracking
   - JetBrains Mono metadata/hint
   - High-contrast action button
   ───────────────────────────────────────────── */

/* Bookmark / Bookmark Add Icon */
const BookmarkStackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 text-text-medium"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

/* Search empty icon */
const SearchSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7 text-text-medium"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export default function EmptyWebsitesState({
  isSearch = false,
  searchQuery = '',
  onAddWebsite,
  onClearSearch,
}) {
  return (
    <div
      className="
        flex flex-col items-center justify-center text-center
        py-16 px-4 my-4 rounded-lg
        border border-dashed border-border
        bg-elevated/20 transition-colors duration-150
      "
      role="status"
    >
      {/* ── App Icon Module Centerpiece (64x64px, 8px radius) ── */}
      <div
        className="
          w-14 h-14 rounded-md mb-4
          bg-elevated border border-border
          flex items-center justify-center
          transition-colors duration-150
        "
      >
        {isSearch ? <SearchSlashIcon /> : <BookmarkStackIcon />}
      </div>

      {/* ── Heading in Geist with negative tracking ── */}
      <h3 className="font-geist font-medium text-base md:text-lg text-text-high tracking-tight">
        {isSearch ? 'No matching websites' : 'No websites saved yet'}
      </h3>

      {/* ── Technical Mono Description ── */}
      <p className="font-mono text-xs text-text-disabled max-w-sm mt-1.5 mb-5">
        {isSearch ? (
          <>
            No bookmarks matching query <span className="text-text-high">"{searchQuery}"</span>. Try adjusting your search term.
          </>
        ) : (
          'Add your frequently visited links and pin your priority tools to build your workspace dashboard.'
        )}
      </p>

      {/* ── Action Trigger ── */}
      <div>
        {isSearch ? (
          <Button
            variant="ghost"
            onClick={onClearSearch}
            className="text-xs px-3.5"
          >
            Clear Search Filter
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onAddWebsite}
            className="text-xs px-4"
          >
            Add Your First Website
          </Button>
        )}
      </div>
    </div>
  );
}
