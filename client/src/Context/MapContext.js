import { useState, createContext } from "react";

export const MappingContext = createContext(null);

export const MappingProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMapFilter, setSelectedMapFilter] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <MappingContext.Provider
      value={{
        userLocation,
        setUserLocation,
        selectedMapFilter,
        setSelectedMapFilter,
        showFilterMenu,
        setShowFilterMenu,
      }}
    >
      {children}
    </MappingContext.Provider>
  );
};
