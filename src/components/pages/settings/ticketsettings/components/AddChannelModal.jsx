/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
//
import { httpPostMain } from 'helpers/httpMethods';
import { ReactComponent as HamburgerSvg } from '../../../../../assets/icons/hamburger.svg';
import { ReactComponent as FormMinusSvg } from '../../../../../assets/icons/form-minus.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
//
import { uuid, brandKit } from '../../../../../helper';
import { setCurrentAgentLoading } from '../../../../../reduxstore/actions/agentActions';
import { updateChannel, addChannel } from '../../../../../reduxstore/actions/channelActions';

function AddChannelModal({
    createModalShow,
    setCreateModalShow,
    isEditing,
    editInfo,
    updateChannel,
    addChannel,
    setChannels,
    modalChannel,
    setModalChannel,
}) {
    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalChannel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancelClick = () => {
        setModalChannel((prev) => ({
            ...prev,
            id: '',
            name: '',
        }));
        setCreateModalShow(false);
    };

    const handleModalHide = () => {
        setCreateModalShow(false);
        setModalChannel((prev) => ({
            ...prev,
            id: '',
            name: '',
        }));
    };

    const handleChannelUpdate = async () => {
        setEditing(true);
        const { id, name } = modalChannel;
        const data = { name };
        if (id) {
            updateChannel(
                id,
                data,
                () => {
                    setEditing(false);
                    setCreateModalShow(false);
                    setModalChannel((prev) => ({ ...prev, id: '', name: '' }));
                    NotificationManager.success('Channel updated successfully', 'Success');
                },
                (error) => {
                    setEditing(false);
                    NotificationManager.error(error, 'Error');
                },
            );
        } else {
            addChannel(
                data,
                () => {
                    setEditing(false);
                    setCreateModalShow(false);
                    setModalChannel((prev) => ({ ...prev, id: '', name: '' }));
                    NotificationManager.success('Channel created successfully', 'Success');
                },
                (error) => {
                    setEditing(false);
                    NotificationManager.error(error, 'Error');
                },
            );
        }
    };

    // create user modal
    return (
        <Modal show={createModalShow} onHide={handleModalHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div className="modal-body ">
                    <h3 className="f-16 text-black">{isEditing ? 'Edit' : 'Add New'} Channel</h3>
                    <form action="">
                        <div className="" id="ticketFieldWrapper">
                            <div className="w-100 d-flex align-items-center my-4">
                                <Form.Group className="form-group acx-form-group flex-grow-1">
                                    <Form.Label className="f-14" htmlFor="name">
                                        Channel Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Channel name"
                                        defaultValue={modalChannel?.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="text-end">
                            <button
                                style={{ borderColor: 'var(--at-blue-light)' }}
                                className="btn btn-sm border px-3 me-2 reset-btn-outline"
                                type="button"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>

                            {!isEditing ? (
                                <button
                                    onClick={handleChannelUpdate}
                                    type="button"
                                    className={`btn btn-custom btn-sm  px-3 d-inline-block ${css({
                                        ...brandKit({ bgCol: 0 }),
                                        color: 'white',
                                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                    })}`}
                                >
                                    Add Channel
                                </button>
                            ) : (
                                <button
                                    onClick={handleChannelUpdate}
                                    type="button"
                                    disabled={editing}
                                    className={`btn btn-custom btn-sm  px-3 d-inline-block ${css({
                                        ...brandKit({ bgCol: 0 }),
                                        color: 'white',
                                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                    })}`}
                                >
                                    {editing ? 'Editing...' : 'Edit'} Channel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, { updateChannel, addChannel })(AddChannelModal);
