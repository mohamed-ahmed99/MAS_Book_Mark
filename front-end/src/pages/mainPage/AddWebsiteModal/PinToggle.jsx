import React from 'react';




export default function PinToggle({ isPinned, onChange }) {
  const checked = isPinned || false;
  
  return (
    <div
      onClick={() => onChange(!checked)}
      className="
        flex items-center justify-between p-3 rounded-md
        border border-border bg-elevated/40 hover:bg-elevated/70
        cursor-pointer select-none transition-colors duration-150
      "
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-mono font-medium text-text-high uppercase tracking-widest">
          Pin Website
        </span>
        <span className="text-xs text-text-medium">
          Pin this website to your priority dashboard
        </span>
      </div>

      {/* ── Soft-Square Checkbox (4px radius) ── */}
      <div
        className={`
          w-5 h-5 rounded-sm border flex items-center justify-center shrink-0
          transition-all duration-150
          ${
            checked
              ? 'bg-text-high border-text-high text-canvas'
              : 'border-border bg-transparent hover:border-text-medium'
          }
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );
}
