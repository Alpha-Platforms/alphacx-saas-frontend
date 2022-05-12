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

    tenantId;

    constructor(userId, domain, tenantId) {
        this.userId = userId;
        this.domain = domain;
        this.tenantId = tenantId;

        this.defaultLiveSteamMsg = {
            msgid: domain,
            action: 'liveStream',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                msgsenderid: userId,
                domain,
                tenantid: tenantId,
                accounttype: 'agent',
            },
            msgreciever: {
                domain,
                msgrecieverid: tenantId,
                tenantid: tenantId,
            },
            data: {},
        };

        this.defaultAuthyMsg = {
            msgid: domain,
            action: 'authy',
            msglocation: '',
            msgplatform: 'Web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                tenantid: tenantId,
                msgsenderid: userId,
                domain,
                accounttype: 'agent',
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
