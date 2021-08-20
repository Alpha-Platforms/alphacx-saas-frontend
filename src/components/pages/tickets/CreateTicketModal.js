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
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import {
    httpGetMain,
    httpPostMain,
    httpPatchMain,
} from "../../../helpers/httpMethods";


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
    // setChangingRow,
    subCategories,
    tags
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
        priority: 'Medium',
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

        /* if (name === 'category' && modalInputs.category) {
            setSubCatLoading(true);
            const res = await getSubCategory(modalInputs.category);
            if (res?.status === 'success') {
                setSubCatLoading(false);
                setSubCat(res?.data);
            }
        } */
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
        const realTags = tags.map(tag => tag.value);
        setSelectedTags(realTags);
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
            NotificationManager.error('All fields are required', 'Error', 5000);
        } else {
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

        prevCategoriesAndSubs()

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

    const [Category, setCategory] = useState([]);
    const [openSaveTicketModal, setopenSaveTicketModal] = useState(false);
    const [ticketStatuses, setTicketStatuses] = useState([]);
    const [isAdditionalOptionVisible, setIsAdditionalOptionVisible] = useState(false)
    const [assignType, setAssignType] = useState('teams')
    const [categoriesAndSubs, setCategoriesAndSubs] = useState([])
    

    /* UPDATE MODAL FORM VALUES */
    const [RSCustomerName, setRSCustomerName] = useState("");
    const [RSTicketCate, setRSTicketCate] = useState("");
    const [RSTickeSubject, setRSTickeSubject] = useState("");
    const [RSTicketStage, setRSTicketStage] = useState("");
    const [RSTicketPriority, setRSTicketPriority] = useState("");
    const [RSTicketRemarks, setRSTicketRemarks] = useState("");
    const [RSTicketAssignedAgent, setRSTicketAssignedAgent] = useState("");
    const [RSTicketDueDate, setRSTicketDueDate] = useState("");
    const [RSTeams, setRSTeams] = useState([])

    const prevCategoriesAndSubs = () => {
        categories.forEach(item => {
            if (item.subCategories.length === 0) {
                setCategoriesAndSubs(prev => [...prev, {'value':item.id, 'label':item.name}])
            } else {
                setCategoriesAndSubs(prev => [...prev, {'value':item.id, 'label':item.name}])
                item.subCategories.forEach(sub => {
                    setCategoriesAndSubs(prev => [...prev, {'value':sub.id, 'label':sub.name}])
                });
            }
        })
        
    }

    const getTeams = async () => {
        const res = await httpGetMain(`groups`);
        if (res.status == "success") {
            setRSTeams(res?.data?.groups);
        } else {
            return NotificationManager.error(res.er.message, "Error", 4000);
        }
    };

    function DowncaretIcon() {
        return (
        <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M8.5 1.25L5 4.75L1.5 1.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        );
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
                <div className="saveTicketWrapModal p-4 pb-1">
                    <p className="fs-5">Create New Ticket</p>
                    <form className="needs-validation mb-4" onSubmit={e => e.preventDefault()}>
                        <div className="row mb-3">
                            <div className="col-6 mt-2 position-relative">
                                <label htmlFor="customer" className="form-label">Customer</label>
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
                                
                            </div>
    
                            <div className="col-6 mt-2">
                                <label htmlFor="status" className="form-label">Stage</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    onChange={ (value, actionMeta) => {
                                        // handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isMulti={false}
                                    options={
                                        // populate 'options' prop from $agents, with names remapped
                                        statuses?.map(item => {
                                            return {value: item.id,label: item.status}
                                        })
                                    }
                                />
                            </div>
    
                            
                        </div>
                        <div className="row mb-3">
                            <div className="col-6 mt-2 tags-select-wrapper">
                                <label htmlFor="title" className="form-label">Categories</label>
                                <RSelect className="rselectfield" 
                                    style={{ fontSize: "12px" }}
                                    onChange={ (value, actionMeta) => {
                                        // handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isMulti={false}
                                    options={categoriesAndSubs}
                                />
                            </div>


                            <div className="col-6 mt-2 position-relative">

                                <label htmlFor="priority" className="form-label">Priority</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    onChange={ (value, actionMeta) => {
                                        // handleTagSelection(value);
                                    }}
                                    isClearable={false}
                                    isMulti={false}
                                    options={
                                        // populate 'options' prop from $agents, with names remapped
                                        priorities?.map(item => {
                                            return {value: item.id,label: item.name}
                                        })
                                    }
                                />
                            </div>
    
                        </div>                        
                       
                        
                        <div className="row">
                            <div className="col-12 mt-2">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    onChange={handleModalInput}/>
                            </div>

                        </div>
                        
                        <div className="col-12 mt-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control ct-description"
                                onChange={handleModalInput}></textarea>
                        </div>

                        <p
                            className="btn my-3 p-0 text-start"
                            role="button"
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                marginBottom: 0,
                                color: "#006298!important",
                            }}
                            onClick={() => setIsAdditionalOptionVisible((v) => !v)}
                            >
                            Additional Options <span><DowncaretIcon /></span>
                        </p>
                        
                        { isAdditionalOptionVisible &&
                            <div className="">
                                {/* groups agents */}
            
                                <div className="row">


                                    <div className="d-flex">

                                        <label htmlFor="assignedto" className="form-label me-3">Assigned To</label>
                                        
                                        <div className="form-check me-3">
                                            <input
                                            className="form-check-input"
                                            name="assignedto"
                                            type="radio"
                                            id="assignedToTeam"
                                            value="teams"
                                            checked={assignType === "teams"}
                                            onChange={(e) => setAssignType(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="radio-2">
                                            Teams
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            name="assignedto"
                                            type="radio"
                                            id="assignedToAgent"
                                            value="agents"
                                            checked={assignType === "agents"}
                                            onChange={(e) => setAssignType(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="radio-2">
                                            Agents
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12 tags-select-wrapper">
                                        {assignType === 'teams'?
                                            (<RSelect className="rselectfield"
                                                style={{ fontSize: "12px" }}
                                                onChange={ (value, actionMeta) => {
                                                    // handleTagSelection(value);
                                                }}
                                                isClearable={false}
                                                isMulti
                                                options={
                                                    // populate 'options' prop from $agents, with names remapped
                                                    groups?.map(item => {
                                                        return {value: item.id,label: item.name}
                                                    })
                                                }
                                            />)
                                            :
                                            (<RSelect className="rselectfield"
                                                style={{ fontSize: "12px" }}
                                                onChange={ (value, actionMeta) => {
                                                    // handleTagSelection(value);
                                                }}
                                                isClearable={false}
                                                isMulti
                                                options={
                                                    // populate 'options' prop from $agents, with names remapped
                                                    agents?.map(item => {
                                                        return {value: item.id,label: item.firstname +" "+ item.lastname}
                                                    })
                                                }
                                            />)
                                        }
                                    </div>
            
                                    <div className="col-12 mt-3 tags-select-wrapper">
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
                                                tags?.map(item => {
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
                                        className="btn bg-at-blue-light  py-1 px-4">{creatingTicket ? 'Creating...' : 'Create'}</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            {/* </Modal.Body> */}
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => ({
    priorities: state.priority.priorities,
    categories: state.category.categories,
    subCategories: state.subCategory.subCategories,
    statuses: state.status.statuses,
    agents: state.agent.agents,
    groups: state.group.groups,
    isTicketCreated: state.ticket.isTicketCreated,
    customers: state.customer.customers,
    tags: state.tag.tags?.tags_names?.tags
})

export default connect(mapStateToProps, {addTicket, getPaginatedTickets, resetTicketCreated})(CreateTicketModal);

