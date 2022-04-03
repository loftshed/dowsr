import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState("");

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
};
