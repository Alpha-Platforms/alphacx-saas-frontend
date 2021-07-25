import React, { createContext, useState, useEffect } from "react";
import socketIO from "socket.io-client";
// import { baseUrlMain as baseUrl } from '../helpers/httpMethods';
export const SocketDataContext = createContext();
export const AppSocket = {};
export const SocketDataProvider = (props) => {
  const [wsTickets, setwsTickets] = useState([]);
let baseUrl = "https://kustormar-staging.herokuapp.com"
  useEffect(() => {}, [wsTickets]);

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
    AppSocket.io.on("ws_tickets", (data) => {
        console.log(">>>a","gets here");
      console.log("this is a notification", data?.data?.tickets);
      setwsTickets(data?.data?.tickets)
    });

    AppSocket.io.emit("ws_tickets", (data) => {
      
    });
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
      }}
    >
      {props.children}
    </SocketDataContext.Provider>
  );
};
