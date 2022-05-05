/* eslint-disable */
import React, { createContext, useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
// import { baseUrlMain as baseUrl } from '../helpers/httpMethods';
import { getLocalItem } from '../components/helpers/authService';

export const SocketDataContext = createContext();
export const AppSocket = {};
export function SocketDataProvider(props) {
    const [wsTickets, setwsTickets] = useState([]);
    const [user, setuser] = useState([]);
    const [wsTicketFilter, setWsTicketFilter] = useState({ channel: '', per_page: 100 });
    const [msgHistory, setMsgHistory] = useState([]);
    // let baseUrl ="https://d3437b953f42.ngrok.io";
    //  let baseUrl ="https://kustormar-staging.herokuapp.com";
    const baseUrl = process.env.REACT_APP_SOCKET_BASE_URL;
    // useEffect(() => {getUserFromStorage()}, [wsTickets]);

    const getUserFromStorage = () => {
        const lUser = getLocalItem('user');
        // alert(lUser);
        if (lUser == undefined || lUser == null) {
            window.location.href = '/';
        } else {
            setuser(lUser);
            // console.log(lUser);
        }
    };

    console.log('AppSocket => ', AppSocket);

    AppSocket.createNativeConnection = () => {
        console.log('Attemting to call native');
        if (AppSocket?.connected) return;
        console.log('Called Native');

        AppSocket.native = new WebSocket('wss://1jxn2z9fi1.execute-api.us-east-1.amazonaws.com/dev');
        // listen for connection

        AppSocket.native.addEventListener('open', (event) => {
            AppSocket.connected = true;
            console.log('connection is open => ', event);
            const msg = {
                "msgid":"123223",
                "action":"authy",
                "msglocation":"",
                "msgplatform":"Web",
                "msgtimestamp":"2022-05-01 10:45:32",
                "msgsender": {
                  "msgsenderdevice":"MAC-1029383",
                  "msgsenderid":"Muna",
                  "domain":"pluzzer"
                }
              };
            AppSocket.native.send(JSON.stringify(msg));
        });

        // Listen for messages
        AppSocket.native.addEventListener('message', (event) => {
            console.log('Message from server ', JSON.parse(event.data));
        });

        AppSocket.native.addEventListener('error', function (event) {
            console.log(event)
        });
        
        AppSocket.native.addEventListener('close', function (event) {
            console.log("socket close")
        });
    }

    AppSocket.createConnection = async () => {
        if (AppSocket.io?.connected) return; // if there has been a connection before, return
        // open a connection
        const connectionOptions = {
            'force new connection': true,
            reconnectionAttempts: 'Infinity',
            timeout: 10000,
            transports: ['websocket'],
        };
        AppSocket.io = socketIO(
            `${baseUrl}?access_token=${localStorage.token}&domain=${localStorage.domain}`,
            connectionOptions,
        );
        // listen for connection
        AppSocket.io.on('connect', () => {
            console.log('connected to server');
        });
        // console.log(">>>a","gets here");

        AppSocket.io.emit(`join`, { userId: user?.id });
        AppSocket.io.emit(`ws_tickets`, wsTicketFilter);
    };

    AppSocket.sendRequest = async (path, payload) => {
        if (AppSocket.io && AppSocket.io.connected === true) {
            AppSocket.io.emit(path, payload);
        } else {
            console.log('App disconnected from server');
        }
    };

    console.log('AppSocket => ', AppSocket);

    return (
        <SocketDataContext.Provider
            value={{
                AppSocket,
                wsTickets,
                setWsTicketFilter,
                wsTicketFilter,
                setMsgHistory,
                msgHistory,
            }}
        >
            {props.children}
        </SocketDataContext.Provider>
    );
}
