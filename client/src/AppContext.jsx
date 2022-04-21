import { useState, createContext } from "react";
import socketio from "socket.io-client";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [viewedProfile, setViewedProfile] = useState({});
  const [firstLogin, setFirstLogin] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userLocation,
        setUserLocation,
        firstLogin,
        setFirstLogin,
        loggedInUser,
        setLoggedInUser,
        showBurgerMenu,
        setShowBurgerMenu,
        showSearchBar,
        setShowSearchBar,
        viewedProfile,
        setViewedProfile,
        // socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
