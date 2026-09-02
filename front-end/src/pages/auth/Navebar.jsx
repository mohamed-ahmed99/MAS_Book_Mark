import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navebar() {
  const [isDark, setIsDark] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname.includes('/login');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-sm bg-text-high flex items-center justify-center text-canvas font-bold font-mono">
          M
        </div>
        <span className="font-geist font-medium text-text-high tracking-tight">Monolith</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 flex items-center justify-center rounded-sm border border-border hover:border-border-hover text-text-high transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        <button 
          onClick={() => navigate(isLogin ? '/auth/create-account' : '/auth/login')}
          className="px-4 py-2 rounded-sm bg-text-high text-canvas font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          {isLogin ? 'Create Account' : 'Log In'}
        </button>
      </div>
    </nav>
  );
}
