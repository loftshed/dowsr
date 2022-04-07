import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <AppContext.Provider
      value={{ userLocation, setUserLocation, loggedIn, setLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
};
