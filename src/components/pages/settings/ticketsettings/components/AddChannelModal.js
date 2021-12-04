/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {uuid} from '../../../../../helper';
import { updateStatus, addStatus } from './../../../../../reduxstore/actions/statusActions';
import {NotificationManager} from 'react-notifications';
import { setCurrentAgentLoading } from './../../../../../reduxstore/actions/agentActions';
import { httpPostMain } from 'helpers/httpMethods';

const AddChannelModal = ({createModalShow, setCreateModalShow, isEditing, editInfo, updateStatus, addStatus, setStatuses}) => {
    
    const [modalStatus, setModalStatus] = useState({id: '', status: ''});
    const [editing, setEditing] = useState(false);

    const handleInputChange = e => {
        setModalStatus(prev => ({
            ...prev,
            status: e.target.value
        }));
    }

    const handleCancelClick = () => {
        setModalStatus(prev => ({
            ...prev,
            id: '',
            status: ''
        }));
        setCreateModalShow(false);
    }

    useEffect(() => {
        if (isEditing) {
            setModalStatus(prev => ({
                ...prev,
                id: editInfo.id,
                status: editInfo.status
            }));
        }
    }, [isEditing, createModalShow])

    const handleModalHide = () => {
        setCreateModalShow(false);
        setModalStatus(prev => ({...prev, id: '', status: ''}));
    }

    const updateSuccess = () => {
        setEditing(false);
        setCreateModalShow(false);
        setModalStatus(prev => ({...prev, id: '', status: ''}));
        NotificationManager.success('Status updated successfully', 'Success');
    }
    
    const updateFailed = () => {
        setEditing(false);
        NotificationManager.error('An error occurred', 'Error');
    }

    const handleStatusUpdate = async () => {
        setEditing(true);
        const {id, status} = modalStatus;

        if (id) {
            updateStatus(id, {status}, updateSuccess, updateFailed);

        } else {
            const data = {status}
            const res = await httpPostMain("statuses", JSON.stringify(data));
            setEditing(false);
            setCreateModalShow(false);
            
            if (res?.status === "success") {                
                setStatuses(prev => [...prev, res.data])
            } else {
                return NotificationManager.error(res?.er?.message, "Error Adding Status", 4000);
            }

            // addStatus({status})
            // get back to 👆🏽 later. Status change must be instantanous!
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
                                        name="field-option"
                                        className="form-control form-control-sm"
                                        value={modalStatus?.status}
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
                                    onClick={handleStatusUpdate} 
                                    type="button" 
                                    className="btn btn-custom btn-sm  px-3 d-inline-block">
                                    Add Stage
                                </button> 
                            :
                                <button 
                                    onClick={handleStatusUpdate} 
                                    type="button" 
                                    disabled={editing} 
                                    className="btn btn-custom btn-sm  px-3 d-inline-block">
                                    {editing ? 'Editing...' : 'Edit'} Stage
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

export default connect(mapStateToProps, {updateStatus, addStatus})(AddChannelModal);
