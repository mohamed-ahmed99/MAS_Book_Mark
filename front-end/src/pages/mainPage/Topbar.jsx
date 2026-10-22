import React from 'react';

/* ─────────────────────────────────────────────
   Topbar Component (Monolith System)
   
   Placed at the top of the main content area in MainPage.
   
   Features:
   - Left side: 
     1. "Add Website" button (Primary: high-contrast monochrome)
     2. "Arrange" button (Ghost: border with hover background)
   - Responsive Icon display:
     - Large screens (md+): Icons are visible alongside button text.
     - Small screens (<md): Icons are hidden ("in small don't"), clean compact text only.
   - Dark / Light mode support:
     - Leverages semantic design tokens (--canvas, --text-high, --border-color, etc.)
     - Conforms to DESIGN.md technical minimalism specifications.
   ───────────────────────────────────────────── */

/* Plus Icon for Add Website */
const PlusIcon = ({ className = "w-4 h-4" }) => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* Arrange / Layout Grid Icon */
const ArrangeIcon = ({ className = "w-4 h-4" }) => (
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

export default function Topbar({
  onAddWebsite,
  onArrange,
  actionsRight = null,
}) {
  return (
    <header
      className="
        w-full
        border-b border-border bg-transparent backdrop-blur-xs
        px-4 py-3 md:px-6 md:py-3.5
        transition-colors duration-150
      "
      role="region"
      aria-label="Top Actions Bar"
    >
      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* ── Left side: Action Buttons ── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Arrange Button (Ghost) */}
          <button
            type="button"
            id="topbar-arrange-btn"
            onClick={onArrange}
            aria-label="Arrange"
            className="
              inline-flex items-center justify-center gap-2
              h-8.5 px-3 md:px-4
              rounded-sm text-xs md:text-sm font-medium
              border border-border text-text-high bg-transparent
              hover:bg-elevated hover:border-border-hover
              active:scale-[0.98]
              transition-all duration-150 cursor-pointer select-none
              focus:outline-none focus-visible:ring-1 focus-visible:ring-text-high
            "
          >
            {/* Icon: visible only on large screens (md+), hidden on small screens */}
            <ArrangeIcon className=" w-4 h-4 shrink-0" />
            <span className='hidden sm:block'>Arrange</span>
          </button>



           {/* Add Website Button (Primary) */}
          <button
            type="button"
            id="topbar-add-website-btn"
            onClick={onAddWebsite}
            aria-label="Add Website"
            className="
              inline-flex items-center justify-center gap-2
              h-8.5 px-3 md:px-4
              rounded-sm text-xs md:text-sm font-medium
              bg-text-high text-canvas
              hover:opacity-90 active:scale-[0.98]
              transition-all duration-150 cursor-pointer select-none
              focus:outline-none focus-visible:ring-1 focus-visible:ring-text-high
            "
          >
            {/* Icon: visible only on large screens (md+), hidden on small screens */}
            <PlusIcon className="w-4 h-4 shrink-0" />
            <span className='hidden sm:block'>Add Website</span>
          </button>


        </div>
      </div>
    </header>
  );
}
