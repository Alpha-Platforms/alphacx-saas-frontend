import {useState} from 'react';
import {Modal} from 'react-bootstrap';
import PinIcon from '../../../assets/icons/pin.svg';

const CreateTicketModal = ({createModalShow, setCreateModalShow}) => {
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
            centered
            size="lg">
            <Modal.Body>
                <div className="col-12 p-4 pb-2">
                    <h5 className="mb-3">Create Ticket</h5>
                    <form className="needs-validation mb-5" noValidate>
                        <div className="row">
                            <div className="col-6 mt-2 position-relative">
                                <label htmlFor="customer" className="form-label">Customer</label>
                                <input type="text" name="customer" className="form-control"/>
                                <span className="text-at-blue-light f-12 d-inline-block w-100 text-end">Add Customer</span>
                            </div>

                            <div className="col-6 mt-2">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" name="category" aria-label="Category select">
                                    <option value=""></option>
                                    <option value="1">--</option>
                                    <option value="2">--</option>
                                    <option value="3">--</option>
                                </select>
                            </div>
                        </div>
                        <div className="row g-3 ">
                            <div className="col-12 mt-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input type="text" name="subject" id="subject" className="form-control"/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="form-control ct-description"></textarea>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select className="form-select" name="priority" aria-label="Category select">
                                    <option value=""></option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
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
                                        ].map((x, idx) => <span key={idx}
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

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Attachment (If Any)</label>
                                <div
                                    id="ticket-ath-box"
                                    className="border border-1 d-block text-center f-14 p-3"><img src={PinIcon} alt=""/>
                                    <span className="text-at-blue-light">Add file</span>&nbsp;
                                    <span>or drag file here</span>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3 mt-sm-3 pt-3 text-end">
                            <button className="btn btn-sm bg-at-blue-light  py-1 px-4" type="button">Add Ticket</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateTicketModal;
