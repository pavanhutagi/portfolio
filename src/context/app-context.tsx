import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}
