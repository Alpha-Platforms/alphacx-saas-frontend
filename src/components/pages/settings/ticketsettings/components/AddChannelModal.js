/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {uuid} from '../../../../../helper';
import { getChannels, updateChannel, addChannel} from '../../../../../reduxstore/actions/channelActions';
import {NotificationManager} from 'react-notifications';
import { setCurrentAgentLoading } from './../../../../../reduxstore/actions/agentActions';
import { httpPostMain } from 'helpers/httpMethods';

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
                id: editInfo.id,
                name: editInfo.name,
                status: editInfo.status
            }));
        }
    }, [createModalShow])

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
                    <h3 className="f-16 text-black">{isEditing ? 'Edit' : 'Add New'} Ticket Stage</h3>
                    <form action="">
                        <div className="" id="ticketFieldWrapper">
                            <div className="d-flex my-4">
                                <div className="w-100 d-flex align-items-center">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-sm"
                                        placeholder="Channel status"
                                        defaultValue={modalChannel?.name}
                                        onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="d-flex my-4">
                                <div className="w-100 d-flex align-items-center">
                                    <input
                                        type="text"
                                        name="status"
                                        className="form-control form-control-sm"
                                        placeholder="status"
                                        defaultValue={modalChannel?.status}
                                        onChange={handleInputChange}/>
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
