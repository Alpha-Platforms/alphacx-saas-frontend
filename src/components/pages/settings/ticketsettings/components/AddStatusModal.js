/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {uuid} from '../../../../../helper';
import { updateStatus } from './../../../../../reduxstore/actions/statusActions';
import {NotificationManager} from 'react-notifications';
import { setCurrentAgentLoading } from './../../../../../reduxstore/actions/agentActions';

const AddStatusModal = ({createModalShow, setCreateModalShow, isEditing, editInfo, updateStatus}) => {
    const [modalStatus,
        setModalStatus] = useState({id: '', status: ''});
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
        console.log('ddd');
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

    const handleStatusUpdate = () => {
        setEditing(true);
        const {id, status} = modalStatus;
        updateStatus(id, {status}, updateSuccess, updateFailed);
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
                                style={{
                                borderColor: "var(--at-blue-light)"
                            }}
                                className="btn btn-sm btn-outline-secondary px-3 me-2 text-at-blue-light reset-btn-outline"
                                type="button" onClick={handleCancelClick}>Cancel</button>
                            {!isEditing ? <button type="button" className="btn btn-custom btn-sm  px-3 d-inline-block">Add Stage</button> : <button onClick={handleStatusUpdate} type="button" disabled={editing} className="btn btn-custom btn-sm  px-3 d-inline-block">{editing ? 'Editing...' : 'Edit'} Stage</button>}

                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {updateStatus})(AddStatusModal);
