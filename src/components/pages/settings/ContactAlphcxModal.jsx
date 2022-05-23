/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { config } from '../../../config/keys';
// import { uuid } from '../../../helper';
// import Socket from '../../../socket';

function ContactAlphcxModal({ contactSupportModalShow, setContactSupportModalShow }) {
    // create user modal
    const [creating, setCreating] = useState(false);
    const [newMessage, setNewMessage] = useState({
        subject: '',
        message: '',
    });
    // const [appSocket, setAppSocket] = useState(null);
    // const [connectionClosed, setConnectionClosed] = useState(false);
    // const [generatedUuid] = useState(uuid());

    // const loggedInUser = JSON.parse(window.localStorage.getItem('user') || '{}')?.user;
    // // const domain = window.localStorage.getItem('domain');
    // const tenantId = window.localStorage.getItem('tenantId');
    const domain = 'manager';
    // const tenantId = 'manager';
    // const accounttype = 'client';

    // useEffect(() => {
    //     setAppSocket(new Socket(generatedUuid, domain, tenantId, accounttype));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     setConnectionClosed(false);
    //     /* create a socket connection */
    //     if (appSocket) {
    //         appSocket.createConnection();

    //         appSocket?.socket.addEventListener('close', () => {
    //             setConnectionClosed(true);
    //             // console.log('%csocket.js WebSocket has closed: ', 'color: white; background-color: #007acc;', event);
    //             if (navigator.onLine) {
    //                 setAppSocket(new Socket(loggedInUser?.id, domain, tenantId, accounttype));
    //             }
    //         });

    //         appSocket.socket.onmessage = (event) => {
    //             console.log('Message from socket => ', JSON.parse(event?.data || '{}'));
    //         };
    //     }

    //     return () => appSocket?.socket.close();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [appSocket]);

    // useEffect(() => {
    //     const newConnection = () => {
    //         if (connectionClosed) {
    //             setAppSocket(new Socket(loggedInUser?.id, domain, tenantId, accounttype));
    //         }
    //     };

    //     window.document.addEventListener('online', newConnection);

    //     return () => window.document.removeEventListener('online', newConnection);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [connectionClosed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMessage({ ...newMessage, [name]: value });
    };

    const handleModalHide = () => {
        setContactSupportModalShow(false);
    };

    // submit form - contact support
    const sendMessage = async () => {
        const { subject, message } = newMessage;

        if (!subject || !message) {
            return NotificationManager.error('All fields are required', 'Validation Error');
        }
        let user;
        // get user from localStorage
        const localUser = window.localStorage.getItem('user');
        if (localUser) {
            user = JSON.parse(localUser)?.user;
        }

        setCreating(true);
        // const domain = window.localStorage.getItem('domain');

        const supportBody = {
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            email: user?.email || '',
            subject: `${domain} :: ${subject}`,
            description: message,
            plainDescription: message,
            attachment: '',
            channel: 'livechat',
            support_ticket: true,
        };

        try {
            const res = await axios.post(`${config.stagingBaseUrl}/customer/ticket`, supportBody, {
                headers: { domain: 'manager' },
            });
            console.log('response => ', res.data);
            if (res.data?.status?.toLowerCase() === 'success') {
                NotificationManager.success('Message sent successfully', 'Success', 4000);
                setContactSupportModalShow(false);
                const customer = res.data?.data?.user || {};
                const ticket = res.data?.data?.ticket || {};
                const assignee = Array.isArray(res.data?.data?.assignee) ? res.data?.data?.assignee[0] : {};

                const reply = {
                    type: 'note',
                    attachment: null,
                    response: `New message from ${customer?.firstname} ${customer?.lastname}`,
                    plainResponse: `New message from ${customer?.firstname} ${customer?.lastname}`,
                };

                const newTicket = {
                    ...ticket,
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: {
                        id: ticket?.status_id,
                    },
                    customer,
                    assignee,
                    history: [
                        {
                            response: `<p>${domain} :: ${subject}</p>`,
                            plain_response: `${domain} :: ${subject}`,
                            created_at: new Date(),
                        },
                    ],
                };

                const data = { ...newTicket, reply: { ...reply, user: { ...customer }, created_at: new Date() } };

                const msg = {
                    msgreciever: {
                        msgrecieverid: 'manager',
                        domain: 'manager',
                        tenantid: 'manager',
                    },
                    data,
                };

                // appSocket.sendLiveStreamMessage(msg);
            }
        } catch (err) {
            NotificationManager.error(err.response.data?.message, 'Error', 4000);
        }

        return setCreating(false);
    };

    return (
        <Modal
            // show={contactSupportModalShow}
            // onHide={() => setContactSupportModalShow(false)}
            classNames={{
                overlay: 'acx-overlay',
                modal: 'acx-modal',
            }}
            open={contactSupportModalShow}
            onClose={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            center
        >
            {/* <Modal.Body> */}
            <div className="saveTicketWrapModal p-4 pb-1 mb-0">
                <div className="col-12 pb-4">
                    {/* <h6 className="fw-bold">Create A Team</h6> */}
                    <p className="fs-5 mb-3">Contact AlphaCX Support</p>
                    <form action="">
                        <div className="col-12 mt-3">
                            <label className="form-label" htmlFor="groupName">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="form-control mb-2"
                                name="subject"
                                value={newMessage.subject || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12 mt-3">
                            <label className="form-label" htmlFor="groupDesc">
                                Message
                            </label>

                            <textarea
                                id="groupDesc"
                                className="form-control"
                                name="message"
                                value={newMessage.message || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                type="button"
                                className="btn bg-at-blue-light px-4 mt-3"
                                disabled={creating}
                                onClick={sendMessage}
                            >
                                {creating ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default ContactAlphcxModal;
