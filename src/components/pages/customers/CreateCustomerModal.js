import {useState} from 'react';
import {Modal} from 'react-bootstrap';

const CreateCustomerModal = ({createModalShow, setCreateModalShow}) => {

    const [selectedTags,
        setSelectedTags] = useState([]);

    function handleTagSelection() {
        const {tag} = this;
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevState => prevState.filter(x => x !== tag));
        } else {
            setSelectedTags(prevState => [
                ...prevState,
                tag
            ]);
        }
    }

    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>
            <Modal.Body>
                <div className="col-12 p-4">
                    <h5 className="mb-3">Create Customer</h5>
                    <form className="needs-validation mb-5" noValidate>
                        <div className="row">
                            <div className="col-6 mt-2">
                                <label htmlFor="title" className="form-label">First Name</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-6 mt-2">
                                <label htmlFor="title" className="form-label">Last Name</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="row g-3 pt-3">
                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Workphone</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Email Address</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Organisation</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Work Phone</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="description" className="form-label">Address</label>
                                <textarea name="description" className="form-control"></textarea>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <div className="border rounded-2 p-3 py-2">
                                    <label className="text-muted d-block f-12 op-6">Select Tag</label>
                                    <div className="mt-1">
                                        {/* create tag button */}
                                        {[
                                            'Customer Data',
                                            'Active',
                                            'Billing',
                                            'Important',
                                            'Gillete Group',
                                            'Oil & Gas',
                                            'Enquiry',
                                            'Pharmaceuticals',
                                            'Telecommunications',
                                            'Technology'
                                        ].map((x, idx) => <span
                                            key={idx}
                                            className={`badge rounded-pill ${selectedTags.includes(x)
                                            ? 'acx-bg-blue-light-30-bg-25'
                                            : 'acx-bg-blue-light-30'} px-3 py-2 my-1 me-1`}
                                            onClick={handleTagSelection.bind({tag: x})}
                                            style={{
                                            cursor: 'pointer'
                                        }}>{x}&nbsp; ×</span>)}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3 mt-sm-3 pt-3 text-end">
                            <button type="submit" className="btn btn-sm bg-at-blue-light  py-1 px-4">Save Changes</button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateCustomerModal
