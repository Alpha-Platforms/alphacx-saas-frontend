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
    

    /* UPDATE MODAL FORM VALUES */
    const [RSCustomerName, setRSCustomerName] = useState("");
    const [RSTicketCate, setRSTicketCate] = useState("");
    const [RSTickeSubject, setRSTickeSubject] = useState("");
    const [RSTicketStage, setRSTicketStage] = useState("");
    const [RSTicketPriority, setRSTicketPriority] = useState("");
    const [RSTicketRemarks, setRSTicketRemarks] = useState("");
    const [RSTicketAssignedAgent, setRSTicketAssignedAgent] = useState("");
    const [RSTicketDueDate, setRSTicketDueDate] = useState("");

    return (
        <Modal 
        open={openSaveTicketModal}
        onClose={openSaveTicketModal} center>
            <div className="saveTicketWrapModal">
            <div className="modalHeaderSaveT">
                Kindly update ticket before closing the chat
            </div>

            <div className="saveTicketModalForm">
                <div className="ticketmodalInput-twoCol">
                <div className="ticketmodalInputWrapMain">
                    <label htmlFor="">Customer</label>
                    <input
                    value="weird"
                    type="text"
                    disabled
                    />
                </div>

                {/* 
                Andy's setters
                setCategoryUpdate,
                updateTicket              
                */}

                <div className="ticketmodalInputWrapMain">
                    <label htmlFor="">Category</label>
                    <RSelect
                    className="rselectfield"
                    style={{ fontSize: "12px" }}
                    onChange={(value, actionMeta) => {
                        setRSTicketCate(value);
                    }}
                    isClearable={false}
                    options={
                        // populate 'options' prop from $Category, with names remapped
                        Category.map((data) => {
                        return { value: data.id, label: data.name };
                        })
                    }
                    />
                </div>
                </div>

                <div className="ticketmodalInput-OneCol">
                <div className="ticketmodalInputWrapMainOne">
                    <label htmlFor="">Subject</label>
                    <input
                    type="text"
                    value=""
                    type="text"
                    disabled
                    style={{ fontSize: "12px" }}
                    />
                </div>
                </div>

                <div className="ticketmodalInput-twoCol">
                <div className="ticketmodalInputWrapMain">
                    <label htmlFor="">Stage</label>
                    <RSelect
                    className="rselectfield"
                    style={{ fontSize: "12px" }}
                    onChange={(value, actionMeta) => {
                        setRSTicketStage(value);
                    }}
                    isClearable={false}
                    options={
                        // populate 'options' prop from $Category, with names remapped
                        // Andy, replace Category below with whichever const holds list of priorities
                        ticketStatuses.map((data) => {
                        return { value: data.id, label: data.status };
                        })
                    }
                    />
                </div>

                <div className="ticketmodalInputWrapMain">
                    <label htmlFor="">Priority</label>
                    <RSelect
                    className="rselectfield"
                    style={{ fontSize: "12px" }}
                    onChange={(value, actionMeta) => {
                        setRSTicketStage(value);
                    }}
                    isClearable={false}
                    options={
                        // populate 'options' prop from $Statues, with names remapped
                        Category.map((data) => {
                        return { value: data.id, label: data.name };
                        })
                    }
                    />
                </div>
                </div>

                <div className="descriptionWrap">
                <label htmlFor="">Remarks</label>
                <textarea
                    style={{ padding: "10px" }}
                    value=""
                    style={{ fontSize: "12px", padding: "7px" }}
                ></textarea>
                </div>

                <p
                className="btn mt-3 p-0 text-start"
                role="button"
                style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: 0,
                    color: "#006298!important",
                }}
                onClick={() => setIsAdditionalOptionVisible((v) => !v)}
                >
                Additional Options
                </p>

                {isAdditionalOptionVisible && (
                <div className="additional-options">
                    <div className="ticketmodalInput-OneCol">
                    <div className="ticketmodalInputWrapMainOne">
                        <label htmlFor="">Assigned To</label>
                        <input
                        type="text"
                        value=""
                        type="text"
                        disabled
                        style={{ fontSize: "12px" }}
                        />
                    </div>
                    </div>

                    <div className="ticketmodalInput-twoCol">
                    <div
                        className="ticketmodalInputWrapMain"
                        style={{ width: "100%" }}
                    >
                        <label htmlFor="">Ticket Due Date</label>
                        <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="thirdselects">
                            <RSelect
                            className="rselectfield"
                            style={{ fontSize: "12px" }}
                            onChange={(value, actionMeta) => {
                                setRSTicketStage(value);
                            }}
                            isClearable={false}
                            options={[
                                { value: 1, label: 1 },
                                { value: 2, label: 2 },
                                { value: 3, label: 3 },
                                { value: 4, label: 4 },
                                { value: 5, label: 5 },
                                { value: 6, label: 6 },
                                { value: 7, label: 7 },
                            ]}
                            />
                            <label htmlFor="">Days</label>
                        </div>
                        <div className="thirdselects">
                            <RSelect
                            className="rselectfield"
                            style={{ fontSize: "12px" }}
                            onChange={(value, actionMeta) => {
                                setRSTicketStage(value);
                            }}
                            isClearable={false}
                            options={[
                                { value: 1, label: 1 },
                                { value: 2, label: 2 },
                                { value: 3, label: 3 },
                                { value: 4, label: 4 },
                                { value: 5, label: 5 },
                                { value: 6, label: 6 },
                                { value: 7, label: 7 },
                            ]}
                            />
                            <label htmlFor="">Hours</label>
                        </div>
                        <div className="thirdselects">
                            <RSelect
                            className="rselectfield"
                            style={{ fontSize: "12px" }}
                            onChange={(value, actionMeta) => {
                                setRSTicketStage(value);
                            }}
                            isClearable={false}
                            options={[
                                { value: 1, label: 1 },
                                { value: 2, label: 2 },
                                { value: 3, label: 3 },
                                { value: 4, label: 4 },
                                { value: 5, label: 5 },
                                { value: 6, label: 6 },
                                { value: 7, label: 7 },
                            ]}
                            />
                            <label htmlFor="">Minutes</label>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div>
                    <label htmlFor="">Tags</label>
                    <RSelect
                        className="rselectfield mt-4"
                        onChange={(value, actionMeta) => setRSCustomerName(value)}
                        isMulti
                    />
                    </div>
                </div>
                )}
                <div className="closeTicketModdalj">
                <button type="submit" onClick={ () => {} }>
                    Update
                </button>
                </div>
            </div>
            </div>
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

