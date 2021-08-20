import {useState, useEffect} from 'react';
import {Modal} from 'react-responsive-modal';
import {NotificationManager} from 'react-notifications';
import {addCustomer, getPaginatedCustomers, updateCustomer} from '../../../reduxstore/actions/customerActions';
import {connect} from 'react-redux';
import RSelect from 'react-select/creatable';

const CreateCustomerModal = ({createModalShow, setCreateModalShow, getPaginatedCustomers, tags, isEditing, customerId, customers, updateCustomer}) => {

    const [selectedTags,
        setSelectedTags] = useState([]);
    const [modalInputs,
        setModalInputs] = useState({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: ''});
    const [creatingCust, setCreatingCust] = useState(false);
    const [editingCust, setEditingCust] = useState(false);

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
        setSelectedTags(tags);
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

    
    useEffect(() => {
        if (createModalShow && isEditing && customerId) {
            console.log(customerId);
            console.log("foundee: ", customers.find(cust => cust.id === customerId));

            const {firstname, lastname, phone_number, email, organisation} = customers.find(cust => cust.id === customerId);
            setModalInputs(prev => ({
                ...prev,
                firstname,
                lastname,
                workphone: phone_number,
                emailaddress: email
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createModalShow]);

    const handleCustomerCreation = async () => {
        const {firstname, lastname, workphone, emailaddress, organisation} = modalInputs;
        if (!firstname || !lastname || !workphone || !emailaddress) {
            NotificationManager.error("Fill up the required fields", 'Error');
        } else {
            setCreatingCust(true);
            const res = await addCustomer({firstName: firstname, lastName: lastname, email: emailaddress, phone_number: workphone, organisation, tags: selectedTags.map(tag => tag.value)});
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

    const custEditSuccess = () => {
        NotificationManager.success('Customer updated successfully', 'Success');
        getPaginatedCustomers(10, 1);
        setEditingCust(false);
        setModalInputs(prev => ({...prev, firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: ''}));
        setCreateModalShow(false);
    }
    
    const custEditFail = () => {
        NotificationManager.error('Oops, an error occured', 'Error');
        setEditingCust(false);
    }

    const handleCustomerEdit = () => {
        const {firstname, lastname, workphone, emailaddress, organisation} = modalInputs;
        if (!firstname || !lastname || !workphone || !emailaddress) {
            NotificationManager.error("Fill up the required fields", 'Error');
        } else {
            setEditingCust(true);
            const newCustomer = {firstName: firstname, lastName: lastname, email: emailaddress, phone_number: workphone, organisation, tags: selectedTags.map(tag => tag.value)};
            updateCustomer(customerId, newCustomer, custEditSuccess, custEditFail);
        }
    }

    const handleModalHide = () => {
        setCreateModalShow(false);
        setCreatingCust(false);
    }

    const handleTagCreation = () => {
        console.log('should create tag');
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
                <div className="saveTicketWrapModal p-4 pb-1 mb-0">
                    <h5 className="mb-3">Create New Customer</h5>
                    <form
                        className="needs-validation mb-4"
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
                                <label htmlFor="organisation" className="form-label">Organisation (optional)</label>
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

                            <div className="col-12 mt-3 tags-select-wrapper">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    onChange={ (value, actionMeta) => {
                                        handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isMulti
                                    onCreateOption={handleTagCreation}
                                    value={selectedTags}
                                    options={
                                        // populate 'options' prop from $agents, with names remapped
                                        tags?.map(item => {
                                        return {value: item,label: item}
                                        })
                                    }
                                />
                            </div>

                        </div>

                        <div className="mt-3 mt-sm-3 pt-3 text-end">
                            {!isEditing ? <button
                                type="button"
                                className="btn bg-at-blue-light  py-1 px-4"
                                disabled={creatingCust}
                                onClick={handleCustomerCreation}>{creatingCust ? 'Creating...' : 'Create'}</button> : <button
                                type="button"
                                className="btn bg-at-blue-light  py-1 px-4"
                                disabled={editingCust}
                                onClick={handleCustomerEdit}>{editingCust ? 'Editing...' : 'Edit'}</button>}
                        </div>

                    </form>
                </div>
            {/* </Modal.Body> */}
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => ({tags: state.tag.tags?.tags_names?.tags, customers: state.customer.customers});

export default connect(mapStateToProps, {getPaginatedCustomers, updateCustomer})(CreateCustomerModal);
