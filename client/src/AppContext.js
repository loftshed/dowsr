import { useState, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddedToDb, setUserAddedToDb] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userLocation,
        setUserLocation,
        userAddedToDb,
        setUserAddedToDb,
        firstLogin,
        setFirstLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
