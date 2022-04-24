/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { config } from '../../../config/keys';

function ContactAlphcxModal({ contactSupportModalShow, setContactSupportModalShow }) {
    // create user modal
    const [creating, setCreating] = useState(false);
    const [newMessage, setNewMessage] = useState({
        subject: '',
        message: '',
    });

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
        const domain = window.localStorage.getItem('domain');

        const supportBody = {
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            email: user?.email || '',
            subject: `${domain} :: $subject`,
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
