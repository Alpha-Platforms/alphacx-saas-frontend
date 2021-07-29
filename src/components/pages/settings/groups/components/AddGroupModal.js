import {Modal} from 'react-bootstrap';

const AddGroupModal = ({addGroupModalShow, setAddGroupModalShow}) => {

    //create user modal
    return (
        <Modal
            show={addGroupModalShow}
            onHide={() => setAddGroupModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="col-12 p-3">
                <h6 class="fw-bold">Create A Group</h6>
                    <form action="">
                        <div class="form-group mt-3">
                            <label class="form-label" for="groupName">Group Name</label>
                            <input type="text" id="groupName" class="form-control mb-2"/>

                            <label class="form-label" for="groupDesc">Group Description</label>
                            <input type="text" id="groupDesc" class="form-control"/>

                            <div class="d-flex justify-content-end">
                                <btn type="button" class="btn btn-sm bg-at-blue px-4 mt-3">Create</btn>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddGroupModal
