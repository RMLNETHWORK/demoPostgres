export const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === "dark") {
    root.removeAttribute("data-theme"); // default = dark
  } else {
    root.setAttribute("data-theme", "light");
  }

  localStorage.setItem("theme", theme);
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme || getSystemTheme();

  applyTheme(theme);
  return theme;
};