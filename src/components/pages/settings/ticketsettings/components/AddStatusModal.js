import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {uuid} from '../../../../../helper';

const AddStatusModal = ({createModalShow, setCreateModalShow}) => {
    const [modalStatus,
        setModalStatus] = useState('');

    const handleInputChange = e => {
        setModalStatus(e.target.value);
    }

    const handleCancelClick = () => {
        setModalStatus('');
        setCreateModalShow(false);
    }

    //create user modal
    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="modal-body ">
                    <h3 className="f-16 text-black">Add New Ticket Stage</h3>
                    <form action="">
                        <div className="" id="ticketFieldWrapper">

                            <div className="d-flex my-4">
                                <div className="w-100 d-flex align-items-center">
                                    <input
                                        type="text"
                                        name="field-option"
                                        className="form-control form-control-sm"
                                        value={modalStatus}
                                        onChange={handleInputChange}/>
                                </div>
                            </div>

                        </div>

                        <div className="text-end">
                            <button
                                style={{
                                borderColor: "var(--at-blue-light)"
                            }}
                                className="btn btn-sm btn-outline-secondary w-25 me-2 text-at-blue-light reset-btn-outline"
                                type="button" onClick={handleCancelClick}>Cancel</button>
                            <button type="button" className="btn btn-custom btn-sm w-25 d-inline-block">Save Changes</button>

                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, null)(AddStatusModal);
