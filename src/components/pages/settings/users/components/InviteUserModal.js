import {Modal} from 'react-bootstrap';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {ReactComponent as AddButtonSvg} from '../../../../../assets/icons/add-button.svg';

const InviteUserModal = ({inviteModalShow, setInviteModalShow}) => {
    return (
        <Modal
            show={inviteModalShow}
            onHide={() => setInviteModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>
            <Modal.Body>
                <div className="modal-body w-100" id="new-modal">
                    <h3 className="f-16">Invite User</h3>
                    <div className="invite-info-row">
                        <div className="row gx-2">
                            <div className="col-md-4">
                                <div className="form-group mt-4">
                                    <label className="f-14 mb-1" for="#fullName">First Name</label>
                                    <input type="text" className="form-control form-control-sm" id="fullName"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mt-4">
                                    <label className="f-14 mb-1" for="#role">Last Name</label>
                                    <input type="text" className="form-control form-control-sm" id="role"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mt-4">
                                    <label className="f-14 mb-1" for="#email">Email Address</label>
                                    <input type="text" className="form-control form-control-sm" id="email"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mt-4">
                                <label className="f-14 mb-1" for="#email"></label>
                                <span className="fs-3 d-inline ms-2 cursor mt-3 d-inline-block">
                                    <FormMinusSvg/>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-between px-3">
                        <button
                            type="button"
                            className="btn bg-outline-custom btn-sm float-start w-25 mt-4 mb-2 text-center btn-add">Add more&nbsp;<AddButtonSvg/></button>
                        <button
                            type="button"
                            className="btn btn-custom btn-sm float-start w-25 mt-4 mb-2"
                            data-bs-dismiss="modal"
                            data-bs-toggle="modal"
                            data-bs-target="#successModal">Send Invite</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default InviteUserModal
