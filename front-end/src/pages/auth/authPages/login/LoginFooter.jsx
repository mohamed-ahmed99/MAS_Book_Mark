import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { rowVariants } from "./loginAnimations";

export default function LoginFooter() {
  return (
    <>
      <motion.div
        custom={4}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 flex items-center gap-3"
      >
        <span className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-text-disabled">
          or
        </span>
        <span className="flex-1 h-px bg-border" />
      </motion.div>

      <motion.p
        custom={5}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 text-center font-mono text-[11px] tracking-[0.03em] text-text-disabled"
      >
        No account?{" "}
        <Link
          to="/auth/create-account"
          className="text-text-medium hover:text-text-high transition-colors underline underline-offset-2"
        >
          Create one
        </Link>
      </motion.p>
    </>
  );
}