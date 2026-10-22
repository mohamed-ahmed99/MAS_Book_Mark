import React from 'react';
import SectionHeader from './SectionHeader';
import WebsiteCard from './WebsiteCard';

/* ─────────────────────────────────────────────
   RegularWebsitesGrid Component (Monolith System - App Icon Grid)
   
   Renders regular/unpinned bookmarks as a smartphone launcher style app-icon grid:
   - 4 columns on mobile, up to 10 on desktop
   - Aligned to 4px spacing grid
   ───────────────────────────────────────────── */

/* Section Grid Icon */
const GridIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export default function RegularWebsitesGrid({
  websites = [],
  title = "Websites",
}) {
  if (!websites || websites.length === 0) return null;

  return (
    <section aria-labelledby="regular-websites-heading" className="flex flex-col">
      {/* ── Technical Section Header ── */}
      <SectionHeader
        title={title}
        count={websites.length}
        icon={GridIcon}
      />

      {/* ── App Icon Grid (Mobile-launcher style) ── */}
      <div
        className="
          grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
          gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6 justify-items-center py-1
        "
      >
        {websites.map((website) => (
          <WebsiteCard
            key={website._id || website.url}
            website={website}
          />
        ))}
      </div>
    </section>
  );
}
