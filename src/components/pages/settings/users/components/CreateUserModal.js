import {Modal} from 'react-bootstrap';

const CreateUserModal = ({createModalShow, setCreateModalShow}) => {

    //create user modal
    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="col-12 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="f-16">Create User Record</h3>
                        <div>
                            <button
                                type="button"
                                className="btn bg-outline-custom d-inline-block btn-sm px-5 f-12 text-at-blue-light">Import User</button>
                        </div>
                    </div>
                    <div>
                        <form action="">
                            <div className="d-flex flex-row w-100 justify-content-between mt-3">
                                <div className="form-group w-100 me-2">
                                    <label className="f-12" for="#fullName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm w-100"
                                        id="fullName"/>
                                </div>
                                <div className="form-group w-100 ms-2">
                                    <label className="f-12" for="#fullName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm w-100"
                                        id="fullName"/>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" for="#email">Email Address</label>
                                <input type="text" className="form-control form-control-sm" id="email"/>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" for="#role">Role</label>
                                <input type="text" className="form-control form-control-sm" id="role"/>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" for="#level">Group (Optional)</label>
                                <input type="text" className="form-control form-control-sm" id="level"/>
                            </div>
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn btn-custom btn-sm float-end w-25 mt-4 mb-2"
                                    id="createUser">Create</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateUserModal
