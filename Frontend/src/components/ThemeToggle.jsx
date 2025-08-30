import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const getInitial = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Téma váltás"
      className={`btn btn-secondary px-3 py-2 ${className}`}
      title={theme === "dark" ? "Váltás világos módra" : "Váltás sötét módra"}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
