import { createContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const initialState = {
  theme: "light", // Default to light theme
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light", // Default theme is light
  storageKey = "shadcn-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) ?? defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove any previous theme classes
    root.classList.remove("light", "dark");

    // Always set the theme to light
    root.classList.add("light");
  }, [theme]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme: (theme: string) => {
          // Ensure the theme is set to light and stored
          localStorage.setItem(storageKey, "light");
          setTheme("light");
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
