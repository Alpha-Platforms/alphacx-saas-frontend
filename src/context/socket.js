import React, { createContext, useState, useEffect } from "react";
import socketIO from "socket.io-client";
// import { baseUrlMain as baseUrl } from '../helpers/httpMethods';
import { getLocalItem } from '../components/helpers/authService';
export const SocketDataContext = createContext();
export const AppSocket = {};
export const SocketDataProvider = (props) => {
  const [wsTickets, setwsTickets] = useState([]);
  const [user, setuser] = useState([]);
  const [wsTicketFilter, setWsTicketFilter] = useState({ channel: "",per_page:100 });
  const [msgHistory, setMsgHistory] = useState([]);
let baseUrl = "https://kustormar-staging.herokuapp.com"
  useEffect(() => {getUserFromStorage()}, [wsTickets]);

  const getUserFromStorage = () => {
    let lUser = getLocalItem("user");
    //alert(lUser);
    if (lUser == undefined || lUser == null) {
      // window.location.href = "/";
    } else {
      setuser(lUser)
      console.log(lUser);
    }
  };

  AppSocket.createConnection = async () => {
    if (AppSocket.io?.connected) return; // if there has been a connection before, return
    //open a connection
    var connectionOptions = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"], 
    };
    AppSocket.io = socketIO(
      `${baseUrl}?access_token=${localStorage.token}`,
      connectionOptions
    );
    //listen for connection
    AppSocket.io.on("connect", () => {
      console.log("connected to server");
    });
    //console.log(">>>a","gets here");
    
    AppSocket.io.emit(`join`, ({userId:user?.id}));
    AppSocket.io.emit(`ws_tickets`, (wsTicketFilter));
  };

  AppSocket.sendRequest = async (path, payload) => {
    if (AppSocket.io && AppSocket.io.connected === true) {
      AppSocket.io.emit(path, payload);
    } else {
      console.log("App disconnected from server");
    }
  };

  return (
    <SocketDataContext.Provider
      value={{
        AppSocket,
        wsTickets,
        setWsTicketFilter,
        wsTicketFilter,
        setMsgHistory,
        msgHistory
      }}
    >
      {props.children}
    </SocketDataContext.Provider>
  );
};
