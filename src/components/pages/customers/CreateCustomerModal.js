import {useState} from 'react';
import {Modal} from 'react-responsive-modal';
import {NotificationManager} from 'react-notifications';
import {addCustomer, getPaginatedCustomers} from '../../../reduxstore/actions/customerActions';
import {connect} from 'react-redux';
import RSelect from 'react-select/creatable';

const CreateCustomerModal = ({createModalShow, setCreateModalShow, getPaginatedCustomers}) => {

    const [selectedTags,
        setSelectedTags] = useState([]);
    const [modalInputs,
        setModalInputs] = useState({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: ''});
    const [creatingCust, setCreatingCust] = useState(false);

    // function handleTagSelection() {
    //     const {tag} = this;
    //     if (selectedTags.includes(tag)) {
    //         setSelectedTags(prevState => prevState.filter(x => x !== tag));
    //     } else {
    //         setSelectedTags(prevState => [
    //             ...prevState,
    //             tag
    //         ]);
    //     }
    // }

    const handleTagSelection = tags => {
        const realTags = tags.map(tag => tag.value);
        setSelectedTags(realTags);
    }

    // update state with inputs from user
    const handleModalInput = e => {
        // get name and curent value of component
        const {name, value} = e.target;
        // set state of inputs in the modal
        setModalInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCustomerCreation = async () => {
        const {firstname, lastname, workphone, emailaddress, organisation} = modalInputs;
        if (!firstname || !lastname || !workphone || !emailaddress || !organisation) {
            NotificationManager.error("All fields are required", 'Error');
        } else {
            setCreatingCust(true);
            const res = await addCustomer({firstName: firstname, lastName: lastname, email: emailaddress, phone_number: workphone, organisation, tags: selectedTags});
            if (res.status === "success") {
                NotificationManager.success(res?.message, 'Success');
                setCreateModalShow(false);
                setModalInputs({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: ''});
                getPaginatedCustomers(10, 1);
                setCreatingCust(false);
            } else {
                setCreatingCust(false);
            }
        }
    }

    const handleModalHide = () => {
        setCreateModalShow(false);
        setCreatingCust(false);
    }

    return (
        <Modal
            // show={createModalShow}
            // onHide={() => setCreateModalShow(false)}
            open={createModalShow} onClose={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>
            {/* <Modal.Body> */}
                <div className="saveTicketWrapModal p-4">
                    <h5 className="mb-3">Create Customer</h5>
                    <form
                        className="needs-validation mb-5"
                        noValidate
                        onSubmit={e => e.preventDefault()}>
                        <div className="row">
                            <div className="col-6 mt-2">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="form-control"
                                    value={modalInputs.firstname}
                                    onChange={handleModalInput}/>
                            </div>
                            <div className="col-6 mt-2">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="form-control"
                                    value={modalInputs.lastname}
                                    onChange={handleModalInput}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mt-3">
                                <label htmlFor="workphone" className="form-label">Workphone</label>
                                <input
                                    type="tel"
                                    name="workphone"
                                    id="workphone"
                                    className="form-control"
                                    value={modalInputs.workphone}
                                    onChange={handleModalInput}/>
                            </div>

                            <div className="col-6 mt-3">
                                <label htmlFor="emailaddress" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="emailaddress"
                                    id="emailaddress"
                                    className="form-control"
                                    value={modalInputs.emailaddress}
                                    onChange={handleModalInput}/>
                            </div>

                        </div>
                        <div className="row g-3 pt-3">

                            <div className="col-12 mt-3">
                                <label htmlFor="organisation" className="form-label">Organisation</label>
                                <input
                                    type="text"
                                    name="organisation"
                                    id="organisation"
                                    className="form-control"
                                    value={modalInputs.organisation}
                                    onChange={handleModalInput}/>
                            </div>

                            {/* <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <div className="border rounded-2 p-3 py-2">
                                    <label className="text-muted d-block f-12 op-6">Select Tag</label>
                                    <div className="mt-1">
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
                            </div> */}

                            <div className="col-12 mt-3">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    onChange={ (value, actionMeta) => {
                                        handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isMulti
                                    options={
                                        // populate 'options' prop from $agents, with names remapped
                                        [
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
                                        ].map(item => {
                                        return {value: item,label: item}
                                        })
                                    }
                                />
                            </div>

                        </div>

                        <div className="mt-3 mt-sm-3 pt-3 text-end">
                            <button
                                type="button"
                                className="btn btn-sm bg-at-blue-light  py-1 px-4"
                                disabled={creatingCust}
                                onClick={handleCustomerCreation}>{creatingCust ? 'Saving... Changes' : 'Save Changes'}</button>
                        </div>

                    </form>
                </div>
            {/* </Modal.Body> */}
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => ({prop: state.prop});

export default connect(mapStateToProps, {getPaginatedCustomers})(CreateCustomerModal);
