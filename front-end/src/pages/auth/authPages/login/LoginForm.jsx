/**
 * LoginForm.jsx
 * ──────────────────────────────────────────────────────────────────────────────
 * The actual login form card.
 * Uses:
 *   - Existing <Input> and <Button> components (unchanged)
 *   - useLoginForm custom hook for all state / submit logic
 *   - ServerAlert for inline server feedback
 *   - Framer Motion for card entrance + field stagger animations
 *
 * Design system adherence (Monolith / Technical Minimalism):
 *   - Border-box card with Level-1 elevation (bg-elevated + border-border)
 *   - 4px grid spacing via Tailwind utility classes
 *   - JetBrains Mono used for labels (via the shared Input component)
 *   - Password eye toggle respects the same icon scale as nav
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import ServerAlert from "./ServerAlert";
import { useLoginForm } from "./useLoginForm";
import LoginFooter from "./LoginFooter";
import { cardVariants, rowVariants } from "./loginAnimations";
import { EyeIcon, EyeOffIcon } from "./PasswordVisibilityIcons";

/* ── Component ───────────────────────────────────────────────────────────── */
export default function LoginForm() {
  const {
    fields,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    loading,
    serverStatus,
    serverMessage,
  } = useLoginForm();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm mx-auto"
    >
      {/* ── Card container (Level-1 elevation) ────────────────────────── */}
      <div className="border border-border bg-elevated rounded-sm p-6 sm:p-8">

        {/* ── Server feedback alert ─────────────────────────────────────── */}
        <div className="mb-5">
          <ServerAlert status={serverStatus} message={serverMessage} />
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          {/* ── Username field ──────────────────────────────────────────── */}
          <motion.div custom={0} variants={rowVariants} initial="hidden" animate="visible">
            <Input
              label="Username"
              type="text"
              name="username"
              value={fields.username}
              onChange={handleChange}
              placeholder="your_username"
              required
              error={errors.username}
            />
          </motion.div>

          {/* ── Password field with visibility toggle ──────────────────── */}
          <motion.div custom={1} variants={rowVariants} initial="hidden" animate="visible">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={fields.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                error={errors.password}
                className="w-full"
              />
              {/* Eye toggle button — positioned inside the input area */}
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-3 text-text-disabled hover:text-text-medium transition-colors ${
                  errors.password ? "bottom-[26px]" : "bottom-[10px]"
                }`}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </motion.div>

          {/* ── Forgot password link ────────────────────────────────────── */}
          <motion.div
            custom={2}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            className="-mt-2 flex justify-end"
          >
            <Link
              to="/auth/forgot-password"
              className="font-mono text-[11px] tracking-[0.04em] text-text-disabled hover:text-text-medium transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* ── Submit button ────────────────────────────────────────────── */}
          <motion.div custom={3} variants={rowVariants} initial="hidden" animate="visible">
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </motion.div>

        </form>

        <LoginFooter />

      </div>
    </motion.div>
  );
}
