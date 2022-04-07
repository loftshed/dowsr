import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <AppContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </AppContext.Provider>
  );
};
