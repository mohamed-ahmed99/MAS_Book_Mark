/**
 * LoginHeader.jsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Animated heading block for the login page.
 * Follows the Monolith Design System:
 *   - Headline uses Geist, tight negative letter-spacing
 *   - Sub-label uses JetBrains Mono, small-caps style
 *   - Motion: each element slides up and fades in with a staggered delay
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { motion } from "framer-motion";

/* ── Animation variants ──────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function LoginHeader() {
  return (
    <motion.div
      className="mb-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow label — JetBrains Mono for the "technical" feel */}
      <motion.p
        variants={itemVariants}
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-disabled mb-3"
      >
        MAS Bookmark
      </motion.p>

      {/* Main headline — tight Geist */}
      <motion.h1
        variants={itemVariants}
        className="font-geist text-[28px] sm:text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-text-high"
      >
        Welcome back
      </motion.h1>

      {/* Sub-text */}
      <motion.p
        variants={itemVariants}
        className="mt-2 text-[14px] text-text-medium font-geist"
      >
        Sign in to continue to your workspace.
      </motion.p>
    </motion.div>
  );
}
