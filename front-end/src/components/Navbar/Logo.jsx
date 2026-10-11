import { Link } from 'react-router-dom';
import logoDM from '../../assets/logo/Logo_DM.png';
import logoWM from '../../assets/logo/Logo_WM.png';

/* ─────────────────────────────────────────────
   Logo
   Desktop: logo image + site name text
   Mobile:  logo image only (name hidden)

   The logo image path is resolved from context
   (dark/light) via the `isDark` prop passed
   down from the parent Navbar.
   ───────────────────────────────────────────── */
export default function Logo({ isDark }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 select-none"
      aria-label="MAS Bookmark — Home"
    >
      {/* Logo mark */}
      <img
        src={isDark ? logoDM : logoWM}
        alt="MAS Bookmark logo"
        className="h-6 w-auto scale-[1.8] sm:scale-[2.2] object-contain"
      />

      {/* Site name — hidden on mobile */}
      <span
        className="
          hidden md:block
          font-geist font-semibold text-[17px] tracking-tight
          text-text-high
        "
      >
        MAS_<span className="text-text-medium font-normal">Bookmark</span>
      </span>
    </Link>
  );
}
