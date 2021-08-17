import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ReactComponent as HamburgerSvg} from '../../../../../assets/icons/hamburger.svg';
// import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg';
// import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as FormMinusSvg} from '../../../../../assets/icons/form-minus.svg';
import {uuid} from '../../../../../helper';

const AddStatusModal = ({createModalShow, setCreateModalShow}) => {
    const [modalStatuses,
        setModalStatuses] = useState([
        {
            id: uuid(),
            status: ""
        }
    ]);

    console.log("modalStatuses: ", modalStatuses);

    function handleInputChange(e) {
        const {id} = this;

        setModalStatuses(prev => {
            return prev.map(x => {
                if (x.id === id) {
                    return {...x, status: e.target.value};
                } else {
                    return x;
                }
            })
        });
    }

    const addStatusBox = () => {
        setModalStatuses(prev => ([...prev, {id: uuid(), status: ''}]));
    }

    function removeStatusBox() {
        const {id} = this;
        setModalStatuses(prev => prev.filter(x => x.id !==  id));
    }

    const handleCancelClick = () => {
        setModalStatuses([{
            id: uuid(),
            status: ""
        }]);
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
                    <h3 className="f-16 text-black">Add New Ticket Status</h3>
                    <form action="">
                        <div className="" id="ticketFieldWrapper">

                            {modalStatuses && modalStatuses.map(({
                                id,
                                status
                            }, idx) => <div key={idx} className="d-flex my-2">
                                <button
                                    type="button"
                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                    <HamburgerSvg/>
                                </button>
                                <div className="w-100 d-flex align-items-center">
                                    <input
                                        type="text"
                                        name="field-option"
                                        className="form-control form-control-sm"
                                        onChange={handleInputChange.bind({id})}
                                        value={status}/>
                                </div>
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        onClick={removeStatusBox.bind({id})}
                                        className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0">
                                        <FormMinusSvg/>
                                    </button>
                                </div>
                            </div>)}

                            <div>
                                <button
                                    type="button"
                                    className="no-focus btn btn-link f-12 text-decoration-none text-at-blue-light" onClick={addStatusBox}>+ Add new ticket status</button>
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
