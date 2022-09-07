/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// @ts-nocheck
import { config } from './config/keys';
// import { uuid } from './helper';

class Socket {
    socketUrl = config.socketUrl;

    constructor(userId, domain, tenantId, accounttype = 'agent') {
        this.userId = userId;
        this.domain = domain;
        this.tenantId = tenantId;

        this.defaultLiveStreamMsg = {
            msgid: domain,
            action: 'liveStream',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                msgsenderid: userId,
                domain,
                domainId: domain,
                tenantid: domain,
                accounttype,
            },
            msgreciever: {
                domain,
                msgrecieverid: tenantId,
                // tenantid: tenantId,
                tenantid: domain,
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
                // tenantid: tenantId,
                tenantid: domain,
                msgsenderid: userId,
                domain,
                domainId: domain,
                accounttype,
            },
        };

        this.defaultWhatsappInit = {
            msgid: domain,
            action: 'whatsappInit',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                tenantid: domain,
                msgsenderid: userId,
                domain,
                domainId: domain,
                accounttype,
            },
        };

        this.defaultWhatsappSend = {
            msgid: domain,
            action: 'whatsappsendmessage',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: new Date(),
            msgsender: {
                msgsenderdevice: navigator.userAgent,
                msgsenderid: userId,
                domain,
                domainId: domain,
                tenantid: domain,
                accounttype,
            },
        };
    }

    /**
     * Create and open a new socket connection.
     *
     * @return {*}
     * @memberof Socket
     */
    createConnection() {
        // console.log('CALLING CREATE CONNECTION');
        if (
            (this.socket && (this.socket?.readyState === 0 || this.socket?.readyState === 1)) ||
            (navigator && !navigator.onLine)
        )
            return;
        // console.log('CREATE CONNECTION SUCCESSFUL');

        this.socket = new WebSocket(this.socketUrl);

        // listen for connection
        this.socket.addEventListener('open', (event) => {
            // console.log('Connection is open => ', event);

            this.sendAuthyMessage();
        });

        this.socket?.addEventListener('close', (event) => {
            // console.log('%csocket.js WebSocket has closed: ', 'color: white; background-color: #007acc;', event);
            this.createConnection();
        });

        this.socket.addEventListener('error', (event) => {
            // console.log('%cerror socket.js WebSocket Error', 'color: red; display: block; width: 100%;', event);
        });
    }

    /**
     * Close current socket connection
     * @param {*} newMsgObj
     * @memberof Socket
     */
    closeConnection() {
        this?.socket?.close();
    }

    /**
     *
     * @param {*} newMsgObj
     * @memberof Socket
     */
    sendLiveStreamMessage(newMsgObj = {}) {
        const msgObj = {
            ...this.defaultLiveStreamMsg,
            ...newMsgObj,
            msgsender: {
                ...this.defaultLiveStreamMsg.msgsender,
                ...newMsgObj?.msgsender,
            },
            msgreciever: {
                ...this.defaultLiveStreamMsg.msgreciever,
                ...newMsgObj?.msgreciever,
            },
        };

        // console.log('%csocket.js line:106 LIVESTREAM MESSAGE', 'color: white; background-color: #007acc;', msgObj);

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

        // console.log('%csocket.js line:121 AUTHY MESSAGE', 'color: white; background-color: #007acc;', msgObj);
        this.socket.send(JSON.stringify(msgObj));
    }

    /**
     *
     * @param {*} newMsgObj
     * @memberof Socket
     */
    triggerWhatsappInit(newMsgObj = {}) {
        const msgObj = {
            ...this.defaultWhatsappInit,
            ...newMsgObj,
            msgsender: {
                ...this.defaultWhatsappInit.msgsender,
                ...newMsgObj?.msgsender,
            },
        };

        this.socket.send(JSON.stringify(msgObj, null, 4));
    }

    /**
     *
     * @param {*} newMsgObj
     * @memberof Socket
     */
    sendWhatsappMessage(newMsgObj = {}) {
        const msgObj = {
            ...this.defaultWhatsappSend,
            ...newMsgObj,
            msgsender: {
                ...this.defaultWhatsappSend.msgsender,
                ...newMsgObj?.msgsender,
            },
        };

        this.socket.send(JSON.stringify(msgObj, null, 4));
    }
}

export default Socket;
