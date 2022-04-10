import { useState, createContext } from "react";
import socketio from "socket.io-client";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddedToDb, setUserAddedToDb] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [threads, setThreads] = useState([]);
  const [viewedThread, setViewedThread] = useState("");

  // const socket = socketio.connect("http://localhost:8080");

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
        viewedThread,
        setViewedThread,
        //socket
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
