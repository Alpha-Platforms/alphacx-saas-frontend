/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
// 
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// 
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';
// 
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// 
import {uuid} from '../../../../../helper';
import { httpPostMain } from 'helpers/httpMethods';
import { setCurrentAgentLoading } from './../../../../../reduxstore/actions/agentActions';
import { getChannels, updateChannel, addChannel} from '../../../../../reduxstore/actions/channelActions';

const AddChannelModal = ({createModalShow, setCreateModalShow, isEditing, editInfo, getChannels, updateChannel, addChannel, setChannels}) => {
    
    const [modalChannel, setModalChannel] = useState({
        id: '',
        name: '',
        status: ''
    });
    const [editing, setEditing] = useState(false);
    // 
    useEffect(() => {
        if (isEditing) {
            setModalChannel(prev => ({
                ...prev,
                ...editInfo
            }));
        }
    }, [createModalShow])

    // 
    // 
    const handleSwitch = (e) => {
        setModalChannel((prevState) => ({
            ...prevState,
            "status": `${e.target.value? "active" : ""}`
        }));
    }
    // 
    const handleInputChange = e => {
        const {name, value} = e.target;
        setModalChannel(prev => ({
            ...prev,
            [name]: value 
        }));
    }

    const handleCancelClick = () => {
        setModalChannel(prev => ({
            ...prev,
            id: '',
            name: '',
            status: ''
        }));
        setCreateModalShow(false);
    }

    const handleModalHide = () => {
        setCreateModalShow(false);
        setModalChannel(prev => ({
            ...prev, 
            id: '', 
            name: '', 
            status: ''
        }));
    }

    const handleChannelUpdate = async () => {
        setEditing(true);
        const {id, status, name} = modalChannel;
        const data = {status, name}

        if (id) {
            updateChannel(id, data, () => {
                setEditing(false);
                setCreateModalShow(false);
                setModalChannel(prev => ({...prev, id: '', name: '', status: ''}));
                getChannels();
                NotificationManager.success('Channel updated successfully', 'Success');
            }, (error) => {
                setEditing(false);
                NotificationManager.error('An error occurred', 'Error');
            });
        } else {
            const res = await httpPostMain("channel", JSON.stringify(data));
            setEditing(false);
            setCreateModalShow(false);
            
            if (res?.status === "success") {             
                // getChannels();   
                setChannels(prev => [...prev, res.data.channels])
            } else {
                return NotificationManager.error(res?.er?.message, "Error Adding Status", 4000);
            }
        }


    }

    //create user modal
    return (
        <Modal
            show={createModalShow}
            onHide={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="modal-body ">
                    <h3 className="f-16 text-black">{isEditing ? 'Edit' : 'Add New'} Channel</h3>
                    <form action="">
                        <div className="" id="ticketFieldWrapper">
                            <div className="w-100 d-flex align-items-center my-4">
                                <Form.Group  className="form-group acx-form-group flex-grow-1">
                                    <Form.Label className="f-14" htmlFor="name">Channel Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Channel name"
                                        defaultValue={modalChannel?.name}
                                        onChange={handleInputChange}/>
                                </Form.Group>
                            </div>
                            <div className="d-flex my-4">
                                <div className="w-100 d-flex align-items-center">
                                    <Form.Group className="form-group acx-form-group flex-grow-1">
                                        <Form.Label className="f-14" htmlFor="fieldType">Channel Status</Form.Label>
                                        <Form.Select className="form-control" defaultValue={modalChannel?.status} onChange={handleInputChange} 
                                            name="status" id="status" required>
                                            <option value="" disabled>Set channel active</option>
                                            <option value="active">Active</option>
                                            <option value="">Not Active</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>

                        </div>

                        <div className="text-end">
                            <button
                                style={{borderColor: "var(--at-blue-light)"}}
                                className="btn btn-sm btn-outline-secondary px-3 me-2 text-at-blue-light reset-btn-outline"
                                type="button" onClick={handleCancelClick}>
                                Cancel
                            </button>

                            {!isEditing ? 
                                <button 
                                    onClick={handleChannelUpdate} 
                                    type="button" 
                                    className="btn btn-custom btn-sm  px-3 d-inline-block">
                                    Add Channel
                                </button> 
                            :
                                <button 
                                    onClick={handleChannelUpdate} 
                                    type="button" 
                                    disabled={editing} 
                                    className="btn btn-custom btn-sm  px-3 d-inline-block">
                                    {editing ? 'Editing...' : 'Edit'} Channel
                                </button>
                            }

                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {getChannels, updateChannel, addChannel})(AddChannelModal);
