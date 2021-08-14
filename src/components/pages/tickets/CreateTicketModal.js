import {useState, useEffect, useRef} from 'react';
// import {Modal} from 'react-bootstrap';
import {Modal} from 'react-responsive-modal';
import PinIcon from '../../../assets/icons/pin.svg';
import {connect} from 'react-redux';
import {addTicket, resetTicketCreated} from '../../../reduxstore/actions/ticketActions';
import {NotificationManager} from 'react-notifications';
import {getPaginatedTickets} from '../../../reduxstore/actions/ticketActions';
import {getInstantSearchedCustomers} from '../../../reduxstore/actions/customerActions';
import BeatLoader from 'react-spinners/BeatLoader';
import { getSubCategory } from './../../../reduxstore/actions/categoryActions';
import RSelect from 'react-select/creatable';

const CreateTicketModal = ({
    createModalShow,
    setCreateModalShow,
    categories,
    priorities,
    statuses,
    agents,
    groups,
    addTicket,
    isTicketCreated,
    getPaginatedTickets,
    resetTicketCreated,
    customers,
    // setChangingRow
}) => {
    const [selectedTags,
        setSelectedTags] = useState([]);
    const [custSearch,
        setCustSearch] = useState({gottenCust: [], term: '', openPreview: false, isLoading: false, isLoaded: false});
    const [subCatLoading, setSubCatLoading] = useState(false);
    const [subCat, setSubCat] = useState(null);
    const [creatingTicket, setCreatingTicket] = useState(false);

    // ref to customer input
    const custInputRef = useRef(null);

    const [modalInputs,
        setModalInputs] = useState({
        customer: '',
        category: '',
        priority: '',
        status: '',
        subject: '',
        description: '',
        assignee: '',
        group: '',
        subcategory: ''
    });
    // const [cancelExec, setCancelExec] = useState(false);

    const handleModalInput = async e => {
        // get name and curent value of component
        const {name, value} = e.target;
        // set state of inputs in the modal
        setModalInputs(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'category' && modalInputs.category) {
            setSubCatLoading(true);
            const res = await getSubCategory(modalInputs.category);
            console.log("res of sub cat: ", res);
            if (res?.status === 'success') {
                setSubCatLoading(false);
                setSubCat(res?.data);
            }
        }
    }

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
        // setSelectedTags(tag)
        console.log("tags: ", tags);
        const realTags = tags.map(tag => tag.value);

        console.log('real tags: ', realTags);
    }

    
    const handleTicketCreation = e => {
        e.preventDefault();
        const {
            customer,
            category,
            priority,
            status,
            subject,
            description,
            assignee,
            group,
            subcategory
        } = modalInputs;
        if (!customer || !category || !priority || !status || !subject || !description || !assignee || !group || !subcategory) {
            console.log("All field is required");
            NotificationManager.error('All fields are required', 'Error', 5000);
        } else {
            console.log("good to go");
            const newTicket = {
                priorityId: priority,
                assigneeId: assignee,
                description,
                plainDescription: description,
                categoryId: category,
                // userId,
                userId: customer,
                groupId: group,
                statusId: status,
                subject,
                tags: selectedTags,
                subCategoryId: subcategory,
                channel: 'system'
            };

            console.log("New Ticket: ", newTicket);

            setCreatingTicket(true);
            addTicket(newTicket);
        }
    }

    useEffect(() => {
        if (isTicketCreated) {
            resetTicketCreated();
            NotificationManager.success("Ticket created successfully", 'Successful');
            setCreateModalShow(false);
            setCreatingTicket(false);
            setSubCatLoading(false);
            // setChangingRow(true);
            getPaginatedTickets(10, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTicketCreated])

    const wordCapitalize = word => {
        return word
            .charAt(0)
            .toUpperCase() + word.slice(1);
    }

    const timeBeforeSearch = 1500;
    let timeoutId;

    const handleCustomerSearch = (e) => {
        if (!navigator.onLine) 
            return;
        
        // return NotificationManager.error('Check your network', 'Oops');
        const {value} = e.target;

        if (!value) {
            setCustSearch(prev => ({
                ...prev,
                openPreview: false
            }))
        }

        if (timeoutId) 
            clearTimeout(timeoutId);
        
        timeoutId = setTimeout(async() => {
            console.log('Search for: ', value);
            if (value) {
                setCustSearch(prev => ({
                    ...prev,
                    openPreview: true,
                    isLoading: true
                }));

                const res = await getInstantSearchedCustomers(value);
                if (res
                    ?.data) {
                    setCustSearch(prev => ({
                        ...prev,
                        isLoading: false,
                        isLoaded: true,
                        gottenCust: res.data.users
                    }));
                }

            } else {
                setCustSearch(prev => ({
                    ...prev,
                    openPreview: false
                }));
            }

        }, timeBeforeSearch);

    }

    const handleCustClick = function () {
        const {id, firstname, lastname} = this;
        const custInput = custInputRef.current;
        setModalInputs(prev => ({
            ...prev,
            customer: id
        }));
        custInput.value = `${wordCapitalize(firstname)} ${wordCapitalize(lastname)}`;
        setCustSearch(prev => ({
            ...prev,
            openPreview: false
        }));
    }

    const handleModalHide = () => {
        setCreateModalShow(false);
        setCreatingTicket(false);
        setCustSearch(prev => ({
            ...prev,
            openPreview: false
        }));
    }

    return (
        <Modal
            // show={createModalShow}
            // onHide={handleModalHide}
            open={createModalShow} onClose={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            {/* <Modal.Body> */}
                <div className="saveTicketWrapModal p-4 pb-2">
                    <h5 className="mb-3">Create Ticket</h5>
                    <form className="needs-validation mb-5" onSubmit={e => e.preventDefault()}>
                        <div className="row">
                            <div className="col-6 mt-2 position-relative">
                                <label htmlFor="customer" className="form-label">Customer</label>
                                {/* <select
                                    className="form-select"
                                    name="customer"
                                    aria-label="Customer select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {customers && customers.map(({id, firstname, lastname}) => <option value={id}>{`${wordCapitalize(firstname)} ${wordCapitalize(lastname)}`}</option>)}
                                </select> */}
                                <input
                                    type="text"
                                    name="customer"
                                    className="form-control"
                                    autoComplete="off"
                                    ref={custInputRef}
                                    onChange={handleCustomerSearch}/> {custSearch.openPreview && <div className="cust-search-preview">
                                    {custSearch.isLoading && <div
                                        style={{
                                        textAlign: 'center'
                                    }}><BeatLoader loading={true} color={"#006298"} margin={5} size={7}/></div>}
                                    <ul>{(custSearch.gottenCust.length !== 0) && custSearch.gottenCust.map(({firstname, lastname, id}) => <li onClick={handleCustClick.bind({id, firstname, lastname})}>{`${firstname} ${lastname}`}</li>)}</ul>
                                </div>}
                                <span className="text-at-blue-light f-12 d-inline-block w-100 text-end">Add Customer</span>
                            </div>

                            <div className="col-6 mt-2">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    aria-label="Status select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {statuses && statuses.map(({id, status}) => <option value={id}>{status}</option>)}
                                </select>
                            </div>

                            
                        </div>
                        <div className="row mb-3">
                            <div className="col-6 mt-2">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {categories && categories.map(({id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>

                            <div className="col-6 mt-2">
                                <label htmlFor="category" className="form-label">Sub Category</label>
                                <select
                                    className="form-select"
                                    name="subcategory"
                                    aria-label="Sub Category select"
                                    disabled={subCatLoading ? true : subCat ? false : true}
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {subCat && subCat.map(({id, category_id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>

                        </div>
                        <div className="row g-3 ">
                            <div className="col-12 mt-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    onChange={handleModalInput}/>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="form-control ct-description"
                                    onChange={handleModalInput}></textarea>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-6 mt-3 position-relative">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    name="priority"
                                    aria-label="Priority select"
                                    onChange={handleModalInput}>
                                    <option value="Medium">Medium</option>
                                    {priorities && priorities.map(({id, name}) => name !== "Medium" && <option value={id}>{name}</option>)}
                                </select>
                            </div>

                            <div className="col-6 mt-3">
                                <label htmlFor="priority" className="form-label">Team</label>
                                <select
                                    className="form-select"
                                    name="group"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {groups && groups.map(({id, name}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="mt-3">
                                <label htmlFor="assignee" className="form-label">Assigned To</label>
                                <select
                                    className="form-select"
                                    name="assignee"
                                    aria-label="Category select"
                                    onChange={handleModalInput}>
                                    <option value=""></option>
                                    {agents && agents.map(({id, firstname, lastname}) => <option value={id}>{`${firstname} ${lastname}`}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
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
                            <button
                                type="button"
                                onClick={handleTicketCreation}
                                disabled={creatingTicket}
                                className="btn btn-sm bg-at-blue-light  py-1 px-4">{creatingTicket ? 'Adding.. Ticket' : 'Add Ticket'}</button>
                        </div>
                    </form>
                </div>
            {/* </Modal.Body> */}
        </Modal>
    )
}
const mapStateToProps = (state, ownProps) => ({
    priorities: state.priority.priorities,
    categories: state.category.categories,
    statuses: state.status.statuses,
    agents: state.agent.agents,
    groups: state.group.groups,
    isTicketCreated: state.ticket.isTicketCreated,
    customers: state.customer.customers
})

export default connect(mapStateToProps, {addTicket, getPaginatedTickets, resetTicketCreated})(CreateTicketModal);
