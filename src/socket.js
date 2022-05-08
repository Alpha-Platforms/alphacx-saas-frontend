// @ts-nocheck
import { config } from './config/keys';
import { uuid } from './helper';

class Socket {
    socket;

    socketUrl = config.socketUrl;

    connected = false;

    userId;

    defaultLiveSteamMsg;

    defaultAuthyMsg;

    domain;

    constructor(userId, domain) {
        this.userId = userId;
        this.domain = domain;
        this.defaultLiveSteamMsg = {
            msgid: uuid(),
            action: 'liveStream',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                msgsenderid: userId,
                domain,
            },
            msgreciever: {
                // msgrecieverid: 'chima',
                domain,
            },
            payload: {},
        };

        this.defaultAuthyMsg = {
            msgid: uuid(),
            action: 'authy',
            msglocation: '',
            msgplatform: 'Web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                msgsenderid: userId,
                domain,
            },
        };
    }

    /**
     *
     *
     * @return {*}
     * @memberof Socket
     */
    createConnection() {
        if (this.connected) return;

        this.socket = new WebSocket(this.socketUrl);

        // listen for connection
        this.socket.addEventListener('open', (event) => {
            this.connected = true;

            console.log('Connection is open => ', event);

            this.sendAuthyMessage();
        });

        this.socket.addEventListener('error', (event) => {
            console.log('%cerror socket.js WebSocket Error', 'color: red; display: block; width: 100%;', event);
        });

        this.socket.addEventListener('close', (event) => {
            console.log('%csocket.js WebSocket has closed: ', 'color: white; background-color: #007acc;', event);
        });
    }

    /**
     *
     * @param {*} newMsgObj
     * @memberof Socket
     */
    sendLiveStreamMessage(newMsgObj = {}) {
        const msgObj = {
            ...this.defaultLiveSteamMsg,
            ...newMsgObj,
            msgsender: {
                ...this.defaultLiveSteamMsg.msgsender,
                ...newMsgObj?.msgsender,
            },
            msgreciever: {
                ...this.defaultLiveSteamMsg.msgreciever,
                ...newMsgObj?.msgreciever,
            },
        };

        console.log('%csocket.js line:106 LIVESTREAM MESSAGE', 'color: white; background-color: #007acc;', msgObj);

        this.socket.send(JSON.stringify(msgObj, null, 4));
    }

    sendAuthyMessage(newMsgObj = {}) {
        console.log('Calling authy');
        const msgObj = {
            ...this.defaultAuthyMsg,
            ...newMsgObj,
            msgsender: {
                ...this.defaultAuthyMsg.msgsender,
                ...newMsgObj?.msgsender,
            },
        };

        console.log('%csocket.js line:121 AUTHY MESSAGE', 'color: white; background-color: #007acc;', msgObj);
        this.socket.send(JSON.stringify(msgObj));
    }
}

export default Socket;
