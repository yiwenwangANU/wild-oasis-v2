import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorageState(false, "isDarkMode");
  const toggleTheme = () => {
    setTheme((theme) => !theme);
  };
  useEffect(() => {
    if (theme) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  }, [theme]);
  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkModeContext was used outside provider.");
  return context;
}

export { DarkModeProvider, useDarkMode };
