/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import SimpleReactValidator from 'simple-react-validator';
import { createSupportTicket } from '../../../reduxstore/actions/supportActions';

function ContactAlphcxModal({ contactSupportModalShow, setContactSupportModalShow }) {
    // create user modal
    const [creating, setCreating] = useState(false);
    const [newMessage, setNewMessage] = useState({
        subject: '',
        message: '',
    });
    const [, forceUpdate] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMessage({ ...newMessage, [name]: value });
    };

    const handleModalHide = () => {
        setContactSupportModalShow(false);
    };

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message.replace(/(The|field)/gi, '').trim()}</div>,
        }),
    );

    // submit form - contact support
    const sendMessage = async () => {
        if (!simpleValidator.current.allValid()) {
            simpleValidator.current.showMessages();
            return forceUpdate((prev) => !prev);
        }
        const { subject, message } = newMessage;
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
            subject: `${domain} :: ${subject}`,
            description: message,
            plainDescription: message,
            attachment: '',
            channel: 'livechat',
            support_ticket: true,
        };

        return dispatch(
            createSupportTicket(
                supportBody,
                () => {
                    NotificationManager.success('Message sent sucessfully', 'Success', 3000);
                    setCreating(false);
                },
                (err) => {
                    NotificationManager.error(err?.response?.data?.message || '', 'Error', 3000);
                    setCreating(false);
                },
            ),
        );
    };

    return (
        <Modal
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
                            <label className="form-label" htmlFor="support-subject">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="support-subject"
                                className="form-control mb-2"
                                name="subject"
                                value={newMessage.subject || ''}
                                onChange={handleChange}
                                required
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message('Subject', newMessage.subject, `required`)
                            }
                        </div>

                        <div className="col-12 mt-3">
                            <label className="form-label" htmlFor="support-message">
                                Message
                            </label>

                            <textarea
                                id="support-message"
                                className="form-control"
                                name="message"
                                value={newMessage.message || ''}
                                onChange={handleChange}
                                required
                            />
                            {
                                /* simple validation */
                                simpleValidator.current.message('message', newMessage.message, `required`)
                            }
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
