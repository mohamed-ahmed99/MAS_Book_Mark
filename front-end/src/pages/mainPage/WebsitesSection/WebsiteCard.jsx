import React, { useState } from 'react';

/* ─────────────────────────────────────────────
   WebsiteCard Component (Monolith System - App Icon Style)
   
   Renders websites as native-feeling "App Icons" (like a smartphone home screen):
   - Vertical orientation: Centered App Icon module on top + Label below
   - Mobile & Desktop parity: Consistent smartphone-style launcher experience
   - Conforms strictly to DESIGN.md:
     • 8px soft-square icon module (rounded-lg)
     • Elevated Level-1 surface (bg-elevated) with 1px border
     • Mechanical micro-interaction (scale on hover / active)
     • Pure monochrome contrast
   - Pin indicator: Subtle geometric badge on the icon corner
   - Quick action: Floating copy link button on hover
   ───────────────────────────────────────────── */

/* External link jump icon */
const ExternalLinkIcon = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* Pin icon badge */
const PinBadgeIcon = ({ className = "w-2.5 h-2.5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
  </svg>
);

/* Copy icon */
const CopyIcon = ({ className = "w-3 h-3" }) => (
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
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/* Checkmark icon for copied state */
const CheckIcon = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* Fallback globe icon */
const GlobeIcon = ({ className = "w-6 h-6 text-text-disabled" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function WebsiteCard({ website }) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    name = 'Untitled',
    url = '#',
    domain = '',
    photo = {},
    isPinned = false,
  } = website || {};

  // Resolve photo URL (uploaded custom photo -> domain Google Favicon auto-fetch)
  const photoUrl =
    photo?.url ||
    (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '');

  // Quick Copy URL handler
  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!url || url === '#') return;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="relative group flex flex-col items-center justify-start w-full max-w-[84px] sm:max-w-[96px]">
      {/* ── Main clickable link to external website ── */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${name}`}
        title={`${name} (${domain || url})`}
        className="
          flex flex-col items-center w-full
          focus:outline-none select-none
        "
      >
        {/* ── Mobile-Style App Icon Box (56x56px mobile, 64x64px desktop) ── */}
        <div
          className="
            relative w-14 h-14 sm:w-16 sm:h-16
            rounded-lg bg-elevated border border-border
            flex items-center justify-center overflow-hidden
            group-hover:border-border-hover group-hover:bg-elevated/90
            group-hover:-translate-y-0.5 active:translate-y-0 active:scale-95
            transition-all duration-150 ease-out cursor-pointer
          "
        >
          {photoUrl && !imageError ? (
            <img
              src={photoUrl}
              alt={`${name} icon`}
              onError={() => setImageError(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm object-contain transition-transform duration-150 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <GlobeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-text-disabled group-hover:text-text-medium transition-colors" />
          )}

          {/* ── Pinned Indicator Badge (Top-Right Corner) ── */}
          {isPinned && (
            <div
              className="
                absolute top-1 right-1 w-3.5 h-3.5 rounded-xs
                bg-text-high text-canvas
                flex items-center justify-center shadow-xs
              "
              title="Pinned bookmark"
              aria-label="Pinned"
            >
              <PinBadgeIcon />
            </div>
          )}

          {/* ── Hover Overlay: External Link Arrow ── */}
          <div
            className="
              absolute bottom-1 right-1 w-4 h-4 rounded-xs
              bg-canvas/90 border border-border
              flex items-center justify-center text-text-high
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
            "
            aria-hidden="true"
          >
            <ExternalLinkIcon />
          </div>
        </div>

        {/* ── App Icon Label (Centered underneath icon, 1-2 lines) ── */}
        <div className="w-full mt-1.5 px-0.5 text-center flex flex-col items-center">
          <span
            className="
              font-geist text-[11px] sm:text-xs font-medium text-text-high
              truncate max-w-full tracking-tight
              group-hover:underline transition-colors
            "
          >
            {name}
          </span>

          {/* Optional subtle domain line in JetBrains Mono */}
          <span className="font-mono text-[9px] text-text-disabled truncate max-w-full">
            {domain}
          </span>
        </div>
      </a>

      {/* ── Quick Copy Button (Floats on hover on top left) ── */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy URL"}
        title={copied ? "Copied!" : "Copy link"}
        className="
          absolute -top-1 -left-1 z-10
          w-5 h-5 rounded-xs
          bg-elevated border border-border
          flex items-center justify-center
          text-text-medium hover:text-text-high hover:border-border-hover
          opacity-0 group-hover:opacity-100 transition-all duration-150
          cursor-pointer
        "
      >
        {copied ? (
          <CheckIcon className="text-text-high" />
        ) : (
          <CopyIcon />
        )}
      </button>
    </div>
  );
}
