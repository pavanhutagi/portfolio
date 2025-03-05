import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLeftNeonBulbLit: boolean;
  setIsLeftNeonBulbLit: (isLit: boolean) => void;
  isRightNeonBulbLit: boolean;
  setIsRightNeonBulbLit: (isLit: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isLeftNeonBulbLit, setIsLeftNeonBulbLit] = useState(false);
  const [isRightNeonBulbLit, setIsRightNeonBulbLit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isLeftNeonBulbLit,
    setIsLeftNeonBulbLit,
    isRightNeonBulbLit,
    setIsRightNeonBulbLit,
    isMenuOpen,
    setIsMenuOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}
