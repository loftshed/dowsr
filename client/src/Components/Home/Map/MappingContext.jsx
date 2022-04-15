import { useState, createContext } from "react";

export const MappingContext = createContext(null);

export const MappingProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMapFilter, setSelectedMapFilter] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [mapModalMessage, setMapModalMessage] = useState("");
  const [creatingNewPin, setCreatingNewPin] = useState(false);
  const [showPinCreationModal, setShowPinCreationModal] = useState(false);
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pinCreationSuccessful, setPinCreationSuccessful] = useState(null);
  const [newPinData, setNewPinData] = useState(null);
  const [storedFilteredPins, setStoredFilteredPins] = useState(null);

  return (
    <MappingContext.Provider
      value={{
        userLocation,
        setUserLocation,
        selectedMapFilter,
        setSelectedMapFilter,
        showFilterMenu,
        setShowFilterMenu,
        mapModalMessage,
        setMapModalMessage,
        creatingNewPin,
        setCreatingNewPin,
        setShowPinCreationModal,
        showPinCreationModal,
        setClickedLocation,
        clickedLocation,
        popupInfo,
        setPopupInfo,
        popupIsVisible,
        setPopupIsVisible,
        pinCreationSuccessful,
        setPinCreationSuccessful,
        newPinData,
        setNewPinData,
        storedFilteredPins,
        setStoredFilteredPins,
      }}
    >
      {children}
    </MappingContext.Provider>
  );
};
