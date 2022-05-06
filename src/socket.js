// @ts-nocheck
import dayjs from 'dayjs';
import { config } from './config/keys';
import { uuid } from './helper';

class Socket {
    socket;

    socketUrl = config.socketUrl;

    connected = false;

    userId;

    defaultMsgObj;

    domain;

    constructor(userId, domain) {
        this.userId = userId;
        this.domain = domain;
        this.defaultMsgObj = {
            msgid: uuid(),
            action: 'liveStream',
            msglocation: '',
            msgplatform: 'web',
            msgtimestamp: dayjs(),
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

            const msg = {
                msgid: uuid(),
                action: 'authy',
                msglocation: '',
                msgplatform: 'Web',
                msgtimestamp: dayjs(),
                msgsender: {
                    msgsenderdevice: navigator.userAgent,
                    msgsenderid: this.userId,
                    domain: this.domain,
                },
            };

            console.log('%csocket.js line:70 msg', 'color: white; background-color: #007acc;', msg);

            this.socket.send(JSON.stringify(msg));
        });

        this.socket.addEventListener('error', (event) => {
            console.log('%cerror socket.js WebSocket Error', 'color: red; display: block; width: 100%;', event);
        });

        this.socket.addEventListener('close', (event) => {
            console.log('%csocket.js WebSocket has closed: ', 'color: white; background-color: #007acc;', event);
        });
    }

    /**
     *  A typical liveStream message object
     * {
            "msgid":"123223",
            "action":"liveStream",
            "msglocation":"lat:38.8951, log:-77.0364",
            "msgplatform":"web",
            "msgtimestamp":"2020-06-30 10:45",
            "msgsender":{
            "msgsenderdevice":"MAC-1029383",
            "msgsenderid":"muna",
            "domain":"pluzzer"
            },
            "msgreciever":{
            "msgrecieverid":"chima",
            "domain":"pluzzer"
            },
            "payload":{}
        }
     *
     * @param {*} newMsgObj
     * @memberof Socket
     */
    sendMessage(newMsgObj) {
        this.send(
            JSON.stringify(
                {
                    ...this.defaultMsgObj,
                    ...newMsgObj,
                    msgsender: {
                        ...this.defaultMsgObj.msgsender,
                        ...newMsgObj.msgsender,
                    },
                    msgreciever: {
                        ...this.defaultMsgObj.msgreciever,
                        ...newMsgObj.msgreciever,
                    },
                },
                null,
                4,
            ),
        );
    }
}

export default Socket;
