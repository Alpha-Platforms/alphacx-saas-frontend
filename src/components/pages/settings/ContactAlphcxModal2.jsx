/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
// import { Prev } from 'react-bootstrap/esm/PageItem';
import { httpGet, httpPostMain } from 'helpers/httpMethods';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getAdmins } from 'reduxstore/actions/adminActions';

function ContactAlphcxModalComponent({ contactSupportModalShow, setContactSupportModalShow, admins, getAdmins }) {
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

    // useEffect(() => {
    //     getAdmins();
    //     console.log(admins);
    // }, []);

    useEffect(() => {
        if (newMessage.body && newMessage.category && newMessage.subject) {
            setSendReady(true);
        } else {
            setSendReady(false);
        }
    }, [newMessage]);

    const sendMessage = async () => {
        const tenantId = localStorage.getItem('tenantId');
        const domain = localStorage.getItem('domain');
        const tenantRes = await httpGet(`auth/tenant-info/${domain}`);
        const subRes = await httpGet(`subscriptions/${tenantId}`);

        let tenantData = {};

        if (tenantRes.status === 'success' && subRes.status === 'success') {
            tenantData = {
                company_name: tenantRes.data.company_name,
                created_at: tenantRes.data.created_at,
                website: tenantRes.data.website || '',
                domain: tenantRes.data.domain,
                email: tenantRes.data.email,
                subscriptionPlan: subRes.data.plan.name,
                users: subRes.data.subscription.totalActiveUsers,
            };
        } else {
            setCreating(false);
            setContactSupportModalShow(false);
            return NotificationManager.error('An error occured, please, try again', 'Email Error', 4000);
        }
        const date = dayjs(tenantData.created_at).format('MMM DD, YYYY');
        const subject = `AlphaCX Tenant Support: ${newMessage.subject}`;
        const body = `
            <h4 style='margin:0'>Message</h4>
            <hr style='border:none; margin: 0; height: 2px; background-color: #7aafda'>
            <p>${newMessage.body}</p>
            <h4 style='margin:0'>Tenant Information</h4>
            <hr style='border:none; margin: 0; height: 2px; background-color: #7aafda'>
            <p>Subject: <span style='font-weight: bold'>${newMessage.subject}</span></p>
            <p>Category: <span style='font-weight: bold'>${newMessage.category}</span></p>
            <p>Email: <span style='font-weight: bold'>${tenantData.email}</span></p>
            <p>Company Name: <span style='font-weight: bold'>${tenantData.company_name}</span></p>
            <p>Domain: <span style='font-weight: bold'>${tenantData.domain}</span></p>
            <p>Number of Users: <span style='font-weight: bold'>${tenantData.users}</span></p>
            <p>Account created: <span style='font-weight: bold'>${date}</span></p>
            <p>Subscription Plan: <span style='font-weight: bold'>${tenantData.subscriptionPlan}</span></p>
        `;

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

const mapStateToProps = (state) => {
    return {
        admins: state.admin.admins,
    };
};

export default connect(mapStateToProps, { getAdmins })(ContactAlphcxModalComponent);
