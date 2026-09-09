/**
 * ServerAlert.jsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Animated inline alert that shows server response messages (success / fail).
 * Designed per the Monolith Design System:
 *   - Uses geometric 6-px status indicator instead of colored badges
 *   - Monochrome palette — icon conveys state, not color
 *   - Framer Motion: slides down from top with opacity fade
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { motion, AnimatePresence } from "framer-motion";

/* ── Icons ───────────────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Component ───────────────────────────────────────────────────────────── */
export default function ServerAlert({ status, message }) {
  const isSuccess = status === "success";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`overflow-hidden rounded-sm border px-3 py-2.5 flex items-start gap-2.5 ${
            isSuccess
              ? "border-border bg-elevated"
              : "border-border bg-elevated"
          }`}
        >
          {/* Geometric status indicator (6px dot) */}
          <span className="mt-[2px] flex-shrink-0 text-text-high">
            {isSuccess ? <CheckIcon /> : <XIcon />}
          </span>

          {/* Message text — JetBrains Mono for the technical label style */}
          <p className="font-mono text-[11px] leading-[1.5] tracking-[0.02em] text-text-high">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
