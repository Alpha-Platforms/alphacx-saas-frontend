import {Modal} from 'react-bootstrap';

const AddFieldModal = ({addFieldModalShow, setAddFieldModalShow}) => {
    return (
        <Modal
            show={addFieldModalShow}
            onHide={() => setAddFieldModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <h3 className="f-16 text-black">Add New field</h3>
                <form action="">
                    <div className="form-group mt-3">
                        <label className="f-12" for="fieldName">Field Name</label>
                        <input
                            type="text"
                            name="field-name"
                            className="form-control form-control-sm"
                            id="fieldName"/>
                    </div>
                    <div className="form-group mt-3">
                        <label className="f-12 form-select-label" for="fieldType">Field Type</label>
                        <select
                            name="field-type"
                            className="form-select form-select-sm f-12 py-2"
                            id="fieldType">
                            <option value="single-line-text">Single line text</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="paragraph">Paragraph</option>
                            <option value="date">Date</option>
                            <option value="attach-file">Attach File</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="user">User</option>
                            <option value="contact">Contact</option>
                        </select>
                    </div>

                    <div id="allOptionsContainer">
                        <div className="form-group mt-3 d-none" id="fieldOptionsWrapper">
                            <label className="f-12 d-block">Options</label>
                            <div className="optionsWrapper" id="optionsWrapper"></div>
                            <button
                                type="button"
                                className="no-focus btn btn-link f-12 text-decoration-none text-at-blue-light">+ Add option</button>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className="f-12" for="makeOptional">Make field optional</label>
                        <div className="form-check form-switch mt-1">
                            <input
                                name="optional"
                                className="legendInput legend-input form-check-input form-check-input-lg mt-1"
                                type="checkbox"
                                id="makeOptional"/>
                        </div>
                    </div>
                    <div className="text-end">
                        <button
                            style={{
                            borderColor: "var(--at-blue-light);"
                        }}
                            onClick={() => setAddFieldModalShow(false)}
                            className="btn btn-sm btn-outline-secondary w-25 me-1 text-at-blue-light reset-btn-outline"
                            type="button">Cancel</button>
                        <button type="button" className="btn btn-custom btn-sm w-25 d-inline-block">Add Field</button>

                    </div>

                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddFieldModal
