import React from 'react';
import SectionHeader from './SectionHeader';
import WebsiteCard from './WebsiteCard';

/* ─────────────────────────────────────────────
   PinnedWebsitesGrid Component (Monolith System - App Icon Grid)
   
   Renders pinned bookmarks as a mobile-phone launcher style app-icon grid:
   - 4 columns on mobile, scaling up to 10 on desktop
   - Aligned to 4px spacing grid
   ───────────────────────────────────────────── */

/* Section Pin Icon */
const PinIcon = ({ className = "w-3.5 h-3.5" }) => (
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
    <line x1="12" y1="17" x2="12" y2="22" />
    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
  </svg>
);

export default function PinnedWebsitesGrid({ websites = [] }) {
  if (!websites || websites.length === 0) return null;

  return (
    <section aria-labelledby="pinned-websites-heading" className="flex flex-col">
      {/* ── Technical Section Header ── */}
      <SectionHeader
        title="Pinned Websites"
        count={websites.length}
        icon={PinIcon}
        badgeText="Priority"
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
