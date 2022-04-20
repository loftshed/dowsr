import { useState, createContext } from "react";
import socketio from "socket.io-client";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddedToDb, setUserAddedToDb] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [threads, setThreads] = useState([]);
  const [displayedThreadId, setDisplayedThreadId] = useState("");
  const [showLoadingAnim, setShowLoadingAnim] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [viewedProfile, setViewedProfile] = useState({});
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
        loggedInUser,
        setLoggedInUser,
        threads,
        setThreads,
        showLoadingAnim,
        setShowLoadingAnim,
        displayedThreadId,
        setDisplayedThreadId,
        showBurgerMenu,
        setShowBurgerMenu,
        showSearchBar,
        setShowSearchBar,
        viewedProfile,
        setViewedProfile,
        firstLogin,
        setFirstLogin,
        // socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
