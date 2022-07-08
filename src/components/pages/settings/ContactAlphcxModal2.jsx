/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
// import { Prev } from 'react-bootstrap/esm/PageItem';
import { httpPostMain } from 'helpers/httpMethods';

function ContactAlphcxModal({ contactSupportModalShow, setContactSupportModalShow }) {
    // create user modal
    const [creating, setCreating] = useState(false);
    const [sendReady, setSendReady] = useState(false);
    const [newMessage, setNewMessage] = useState({
        subject: '',
        category: '',
        body: '',
    });

    const supportEmailAddress = 'contact@alphacx.co';
    const supportCategories = [
        'Billing and Subscription',
        'Bugs and Feature Request',
        'How-To',
        'Partnership Enquiries',
        'Feedback',
    ];

    useEffect(() => {
        if (newMessage.body && newMessage.category && newMessage.subject) {
            setSendReady(true);
        } else {
            setSendReady(false);
        }
    }, [newMessage]);

    const sendMessage = async () => {
        const tenantEmail = localStorage.getItem('tenantEmail');
        const domain = localStorage.getItem('domain');
        const subject = `AlphaCX Tenant Support: ${newMessage.subject}`;
        const body = `
            <p>${newMessage.body}</p>
            <hr>
            <p>Category: <span style='font-weight: bold'>${newMessage.category}</span></p>
            <p>Email: <span style='font-weight: bold'>${tenantEmail}</span></p>
            <p>Domain: <span style='font-weight: bold'>${domain}</span></p>
        `;
        // Add tenant company name later


        setCreating(true);
        const res = await httpPostMain(`send-outgoing-mail`, {
            subject,
            receiverEmail: supportEmailAddress,
            body,
        });

        if (res?.status?.toLowerCase() === 'success') {
            NotificationManager.success('AlphaCX Support team will reach out to you, ASAP', 'Message sent!', 4000);
        } else {
            NotificationManager.error('An error occured, please, try again', 'Email Error', 4000);
        }
        setCreating(false);
        setContactSupportModalShow(false);
    };

    const handleChange = (event) => {
        setNewMessage((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        });
    };

    return (
        <Modal
            classNames={{
                overlay: 'acx-overlay',
                modal: 'acx-modal',
            }}
            open={contactSupportModalShow}
            center
            closeOnEsc={contactSupportModalShow}
            closeOnOverlayClick
            showCloseIcon
            onClose={() => setContactSupportModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
        >
            {/* <Modal.Body> */}
            <div className="rounded">
                <header className="bg-at-blue-light rounded-top">
                    <h6 className="fs-5 text-white p-3">Contact AlphaCX Support</h6>
                </header>
                <div className="saveTicketWrapModal bg-transparent pb-4">

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
                            <label className="form-label" htmlFor="groupName">
                                Issue Type
                            </label>
                            <select
                                defaultValue="choose"
                                className="form-control mb-2"
                                name="category"
                                id="category"
                                onChange={handleChange}
                            >
                                <option disabled value="choose">
                                    Choose Issue Type{' '}
                                </option>
                                {supportCategories.map((i, index) => (
                                    <option key={index}>{i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 mt-3">
                            <label className="form-label" htmlFor="groupDesc">
                                Message
                            </label>

                            <textarea
                                id="groupDesc"
                                className="form-control"
                                name="body"
                                value={newMessage.body || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                type="button"
                                className="btn bg-at-blue-light px-4 mt-3"
                                disabled={creating || !sendReady}
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
