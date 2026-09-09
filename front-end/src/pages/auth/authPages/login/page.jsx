/**
 * page.jsx — Login Page
 * ──────────────────────────────────────────────────────────────────────────────
 * Orchestrator for the /auth/login route.
 * Renders a centred layout with:
 *   - A subtle animated background accent (top-right radial glow)
 *   - LoginHeader  — animated title block
 *   - LoginForm    — form card (inputs, submit, server alert)
 *
 * Theme: inherits dark/light mode from the class on <html> toggled in Navebar.
 * Responsive: stacks to single column on mobile, contained at max-w-sm.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { motion } from "framer-motion";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    /* Outer wrapper: fills the remaining viewport height provided by AuthLayout */
    <section className="relative flex-1 flex items-center justify-center px-4 py-12 overflow-hidden">

      {/* ── Subtle background accent ──────────────────────────────────────
          A very faint radial gradient circle in the top-right corner.
          Monochrome, no colour — consistent with the "Technical Minimalism" spec.
      ──────────────────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="
          pointer-events-none absolute -top-32 -right-32
          w-[480px] h-[480px] rounded-full
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]
        "
      />

      {/* ── Content column ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-sm">

        {/* Animated heading block */}
        <LoginHeader />

        {/* Form card */}
        <LoginForm />

      </div>
    </section>
  );
}
