// @ts-nocheck
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
import RSelect from 'react-select';
import RCreatable from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import {
    httpGetMain,
    httpPostMain,
    httpPatchMain,
} from "../../../helpers/httpMethods";
import {createTags} from '../../../reduxstore/actions/tagActions';
import axios from 'axios';
import {getAcceptValue, allowedFiles} from '../../../helper';
import {config} from '../../../config/keys';



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
    customerId,
    customer,
    isEditing = false,
    // setChangingRow,
    subCategories,
    tags,
    createTags
}) => {
    const [selectedTags,
        setSelectedTags] = useState([]);
    const [tagSelectLoading, setTagSelectLoading] = useState(false);
    const [custSearch,
        setCustSearch] = useState({gottenCust: [], term: '', openPreview: false, isLoading: false, isLoaded: false});
    const [subCatLoading, setSubCatLoading] = useState(false);
    const [subCat, setSubCat] = useState(null);
    const [creatingTicket, setCreatingTicket] = useState(false);
    const [channels, setChannels] = useState([
        'Email',
        'Facebook',
        'Helpdesk',
        'WhatsApp'
    ]);
    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Add file or drag file here',
        error: false,
        image: null,
        ownAvatar: ''
    });

    // console.log('UPLOAD INFO => ', uploadInfo);

    // ref to customer input
    const custInputRef = useRef(null); 

    const [modalInputs,
        setModalInputs] = useState({
        customer: '',
        priority: '',
        stage: '',
        subject: '',
        description: '',
        assignee: '',
        group: '',
        category: '',
        subcategory: '',
        dueDays: 0,
        dueHours: 0,
        channel: ''
    });
    // const [cancelExec, setCancelExec] = useState(false);

    // 
    useEffect(() => {
        if(isEditing){
            setModalInputs(prevState => ({
                ...prevState,
                customer: customerId
            }));
        }
    }, [createModalShow])
    // 
    const handleRSInput = async ({value}, {name}) => {
        // {value}, {name} destructured - react-select onChange event takes inputValue and meta

        // set state of inputs in the modal
        setModalInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRSCategoryInput = async (v) => {
        setModalInputs(prevState => ({
            ...prevState,
            category: v.subcate,
            subcategory: v.value
        }));
    };

    const handleModalInput = async e => {
        const {name, value} = e.target;

        // set state of inputs in the modal
        setModalInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // useEffect(() => {
    //     console.clear()
    //     console.log(tags)
    // }, [tags])
    

    // FIND AND REMOVE - getSubCategory, setSubCatLoading, 

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

    /* const handleTagSelection = tags => {
        const realTags = tags.map(tag => tag.value);
        setSelectedTags(realTags);
    } */

    const handleTagSelection = tags => {
        setSelectedTags(tags);
    }

    
    const handleTicketCreation = async e => {
        e.preventDefault();
        const {
            customer,
            category,
            priority,
            stage,
            subject,
            description,
            assignee,
            group,
            subcategory,
            dueDays,
            dueHours,
            channel
        } = modalInputs;

        if (!customer || !category || !stage || !subject || !description ) {
            NotificationManager.error('All fields are required', 'Error', 5000);
        } else {
            // initiate ticket creation            
            setCreatingTicket(true);

            let newTicket = {
                customer,
                priorityId: priority || "5a6635d0-0561-11ea-8d71-362b9e155667",
                assigneeId: assignee || null,
                description,
                plainDescription: description,
                userId: customer,
                statusId: stage,
                subject,
                categoryId: category,
                channel: channel || "helpdesk",
                tags: selectedTags,
                groupId: group || null,
                dueDate: (dueDays * 24) + dueHours
            };

            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', config.cloudinaryUploadPreset);
                data.append('cloud_name', config.cloudinaryCloudName);
                axios
                    .post(`${config.cloudinaryBaseUrl}/${allowedFiles.types.slice(0,3).includes(uploadInfo.image?.type) ?  'image' : 'raw'}/upload`, data)
                    .then(async res => {
                        // add res

                        // add attachment to ticket body
                        newTicket.attachment = res?.data?.url || ''
                        addTicket(newTicket, () => {
                            NotificationManager.success("Ticket created successfully", 'Successful')
                            setCreatingTicket(false);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        NotificationManager.error("Photo could not be uploaded", "Error");
                        setCreatingTicket(false);
                    });
            } else {
                await addTicket(newTicket, () => {
                    NotificationManager.success("Ticket created successfully", 'Successful')
                    setCreatingTicket(false);
                });
            }
            
        }
    }

    useEffect(() => {
        if (isTicketCreated) {
            resetTicketCreated();
            setCreateModalShow(false);
            setCreatingTicket(false);
            setSubCatLoading(false);
            // setChangingRow(true);
            getPaginatedTickets(50, 1);
            setUploadInfo({
                blob: null,
                msg: 'Add file or drag file here.',
                error: false,
                image: null,
                ownAvatar: ''
            });
        }

        prepCategoriesAndSubs()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTicketCreated])

    const wordCapitalize = word => {
        return word
            .charAt(0)
            .toUpperCase() + word.slice(1);
    }


    // OLD GET CUSTOMER SEARCH, JUST IN CASE //
    // const timeBeforeSearch = 1500;
    // let timeoutId;
    // const handleCustomerSearch = (e) => {
    //     if (!navigator.onLine) 
    //         return;
        
    //     // return NotificationManager.error('Check your network', 'Oops');
    //     const {value} = e.target;

    //     if (!value) {
    //         setCustSearch(prev => ({
    //             ...prev,
    //             openPreview: false
    //         }))
    //     }

    //     if (timeoutId) 
    //         clearTimeout(timeoutId);
        
    //     timeoutId = setTimeout(async() => {
    //         if (value) {
    //             setCustSearch(prev => ({
    //                 ...prev,
    //                 openPreview: true,
    //                 isLoading: true
    //             }));

    //             const res = await getInstantSearchedCustomers(value);
    //             if (res
    //                 ?.data) {
    //                 setCustSearch(prev => ({
    //                     ...prev,
    //                     isLoading: false,
    //                     isLoaded: true,
    //                     gottenCust: res.data.users
    //                 }));
    //             }

    //         } else {
    //             setCustSearch(prev => ({
    //                 ...prev,
    //                 openPreview: false
    //             }));
    //         }

    //     }, timeBeforeSearch);

    // }

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
        setUploadInfo({
            blob: null,
            msg: 'Add file or drag file here',
            error: false,
            image: null,
            ownAvatar: ''
        });
    }

    const searchTypeChecker = (query) => {
        let searchType = "";
        if(Number(query)){
            searchType = "phone_number"
        } else if(/\S+@\S+\.\S+/.test(query)){
            searchType = "email"
        } else {
            searchType = "lastname"
        }
        return searchType;
    }


    const getSearchedCustomers = async (userInput) => {

        const searchType = searchTypeChecker(userInput)

        const res = await httpGetMain(`users?role=Customer&searchType=${searchType}&search=${userInput}`);

        if(res.status === "success"){
            let remappedData = []
            res.data.users.forEach(item => {
                remappedData.push({label: item.firstname+" "+item.lastname, value: item.id})
            })
            return remappedData;
        }
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

    const prepCategoriesAndSubs = () => {
        categories.forEach(item => {
            // Leave the below line commented until Olumide implemented nullable sub-categories
            // setCategoriesAndSubs(prev => [...prev, {'value':item.id, 'label':item.name, 'subcate': item.id}])
            if (item.subCategories.length > 0) {
                item.subCategories.forEach(sub => {
                    setCategoriesAndSubs(prev => [...prev, {'value':sub.id, 'label':sub.name, 'subcate': item.id}])
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


    const tagCreated = (newTags, newTag) => {
        // new tag created successfully
        setSelectedTags(prev => ([...selectedTags, {value: newTag, label: newTag}]));
        setTagSelectLoading(false);
    }

    const tagNotCreated = () => {
        // tag creation failed
        NotificationManager.error("Tag could not be created, pls try again", "Error");
        setTagSelectLoading(false);
    }


    const handleTagCreation = newTag => {
        newTag = newTag.toLowerCase();
        setTagSelectLoading(true);
        const newTags = [...tags, newTag];
        createTags(newTags, tagCreated, tagNotCreated, newTag);
    }

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


    const handleImgSelect = function (e) {
        // store current input
        const fileInput = e.target

        // create a store for the current dimension and default info
        let maxReqDimensions = {
                width: 1500,
                height: 1500
            };

        if (!fileInput.files.length) {
            // No file is selected
            setUploadInfo(prev => ({...prev, msg: 'No file is slected', error: true, blob: null, image: null, ownAvatar: ''}));
            
        } else {
            // file selected
            
            // check if selected file is an image
            if (fileInput.files[0].type.indexOf("image/") === -1) {
                // Selected file is not an image
                setUploadInfo(prev => ({...prev, msg: 'Selected file is not an image', error: true, blob: null, image: null, ownAvatar: ''}));
            } else {
                // Selected file is an image
                /* 
                * read the selected image to get the file width and height
                */
                // create a new file reader object
                const reader = new FileReader();
                reader.readAsDataURL(fileInput.files[0]);
                reader.onload = function (e) {
                    // when reader has loaded

                    //create a new image object
                    const currentImage = new Image();
                    // set the source of the image to the base64 string from the file reader
                    currentImage.src = this.result;

                    currentImage.onload = function () {
                        const [currentImageHeight, currentImageWidth] = [this.height, this
                            .width
                        ];

                        if (currentImageWidth > maxReqDimensions.width ||
                            currentImageHeight > maxReqDimensions.height) {
                            // current selected image dimesions are not acceptable
                            setUploadInfo(prev => ({...prev, msg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`, error: true, blog: null, image: null}));
                        } else {
                            // current selected image dimensions are acceptable
                            const fileName = fileInput.files[0].name;
                            const fileBlob = URL.createObjectURL(fileInput.files[0]);

                            setUploadInfo(prev => ({...prev, blob: fileBlob, msg: fileName, error: false, image: fileInput.files[0], ownAvatar: ''}));
                            /* 
                            when the image with the blob loads call the below method
                            URL.revokeObjectURL(this.src);  where this.src is the blob created
                            */
                        }
                    }
                }
            }
        }
    }

    const handleFileSelect = function (e) {
        // store current input
        const fileInput = e.target

        // create a store for the current dimension and default info
        let maxReqDimensions = {
                width: 1500,
                height: 1500
            };

        if (!fileInput.files.length) {
            // No file is selected
            setUploadInfo(prev => ({...prev, msg: 'No file is selected', error: true, blob: null, image: null, ownAvatar: ''}));
            
        } else {
            // file selected
            
            // // check if selected file is an image
            // if (fileInput.files[0].type.indexOf("image/") === -1) {
            //     // Selected file is not an image
            //     setUploadInfo(prev => ({...prev, msg: 'Selected file is not an image', error: true, blob: null, image: null, ownAvatar: ''}));
            // } 
            
            if (fileInput.files[0].type.indexOf("image/") !== -1) {
                // Selected file is an image
                /* 
                * read the selected image to get the file width and height
                */
                // create a new file reader object
                const reader = new FileReader();
                reader.readAsDataURL(fileInput.files[0]);
                reader.onload = function (e) {
                    // when reader has loaded

                    //create a new image object
                    const currentImage = new Image();
                    // set the source of the image to the base64 string from the file reader
                    currentImage.src = this.result;

                    currentImage.onload = function () {
                        const [currentImageHeight, currentImageWidth] = [this.height, this
                            .width
                        ];

                        if (currentImageWidth > maxReqDimensions.width ||
                            currentImageHeight > maxReqDimensions.height) {
                            // current selected image dimesions are not acceptable
                            setUploadInfo(prev => ({...prev, msg: `Selected image should have max dimension of ${maxReqDimensions.width}x${maxReqDimensions.height}`, error: true, blog: null, image: null}));
                        } else {
                            // current selected image dimensions are acceptable
                            const fileName = fileInput.files[0].name;
                            const fileBlob = URL.createObjectURL(fileInput.files[0]);

                            setUploadInfo(prev => ({...prev, blob: fileBlob, msg: fileName, error: false, image: fileInput.files[0], ownAvatar: ''}));
                            /* 
                            when the image with the blob loads call the below method
                            URL.revokeObjectURL(this.src);  where this.src is the blob created
                            */
                        }
                    }
                }
            } else if (allowedFiles.types.includes(fileInput.files[0].type)) {
                // selected file is a doc
                if (fileInput.files[0].size > allowedFiles.maxSize) {
                    setUploadInfo(prev => ({...prev, msg: `File exceeds maximum upload size of ${allowedFiles.maxSize}`, error: true, blob: null, image: null, ownAvatar: ''}));
                } else {
                    const fileName = fileInput.files[0].name;
                    const fileBlob = URL.createObjectURL(fileInput.files[0]);

                    setUploadInfo(prev => ({...prev, blob: fileBlob, msg: fileName, error: false, image: fileInput.files[0], ownAvatar: ''}));
                }
            } else {
                setUploadInfo(prev => ({...prev, msg: 'Selected file is not an image or document', error: true, blob: null, image: null, ownAvatar: ''}));
            }
        }
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
                                <AsyncSelect 
                                    isDisabled={isEditing}
                                    loadOptions={getSearchedCustomers}
                                    name="customer"
                                    placeholder="Lastname, Email or Phone"
                                    onChange={handleRSInput}
                                    defaultValue={isEditing? {
                                        value: customerId, 
                                        label: `${customer?.firstname} ${customer?.lastname}`
                                    }: null }

                                    defaultOptions={true}
                                />                                
                            </div>
    
                            <div className="col-6 mt-2">
                                <label htmlFor="status" className="form-label">Stage</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    name="stage"
                                    onChange={handleRSInput}
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
                            <div className="col-6 mt-2">
                                <label htmlFor="title" className="form-label">Categories</label>
                                <RSelect className="rselectfield" 
                                    style={{ fontSize: "12px" }}
                                    name="category"
                                    // onChange={handleRSCategoryInput}
                                    onChange={handleRSInput}
                                    isClearable={false}
                                    maxMenuHeight={200}
                                    isMulti={false}
                                    options={
                                        categories?.map(item => {
                                            return {value: item.id,label: item.name}
                                        })
                                    }
                                />
                            </div>

                            <div className="col-6 mt-2 position-relative">

                                <label htmlFor="priority" className="form-label">Priority</label>
                                <RSelect className="rselectfield"
                                    style={{ fontSize: "12px" }}
                                    name="priority"
                                    onChange={handleRSInput}
                                    isClearable={false}
                                    noOptionsMessage={() => "No options available!"}
                                    placeholder="Medium"
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
                                    onChange={handleModalInput}
                                />
                            </div>

                        </div>
                        
                        <div className="col-12 mt-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control ct-description"
                                onChange={handleModalInput}
                            ></textarea>
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
                            <div className="mb-3">
                                {/* groups agents */}
            
                                {/* ASSIGNED-TO */}
                                {/* <div className="row">

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

                                    <div className="col-12">
                                        {assignType === 'teams'?
                                            (<RSelect className="rselectfield"
                                                style={{ fontSize: "12px" }}
                                                onChange={handleRSInput}
                                                isClearable={false}
                                                name="assignee"
                                                options={
                                                    groups?.map(item => {
                                                        return {value: item.id,label: item.name}
                                                    })
                                                }
                                            />)
                                            :
                                            (<RSelect className="rselectfield"
                                                style={{ fontSize: "12px" }}
                                                onChange={handleRSInput}
                                                isClearable={false}
                                                // isMulti
                                                name="assignee"
                                                options={
                                                    agents?.map(item => {
                                                        return {value: item.id,label: item.firstname +" "+ item.lastname}
                                                    })
                                                }
                                            />)
                                        }
                                    </div>
                                </div> */}

                                <div className="row">

                                    {/* DUE DATE */}
                                    {/* <div className="col-12 mt-3 d-flex align-items-center flex-wrap" >
                                        
                                        <label htmlFor="" className="w-100 mb-2">Ticket Due In</label>

                                        <div className="input-group w-25 me-3">
                                            <input type="number" className="form-control" 
                                            name="dueDays"
                                            onChange={handleModalInput} 
                                            ariaLabel="Recipient's username" 
                                            ariaDescribedby="basic-addon2" />
                                            <span class="input-group-text" id="basic-addon2">Days</span>
                                        </div>
                                        <div className="input-group w-25">
                                            <input type="number" className="form-control" 
                                            name="dueHours"
                                            onChange={handleModalInput}
                                            ariaLabel="Recipient's username" ariaDescribedby="basic-addon2" />
                                            <span class="input-group-text" id="basic-addon2">Hours</span>
                                        </div>
                                    
                                    </div> */}


                                    {/* CHANNEL */}

                                    <div className="col-12 tags-select-wrapper">
                                        <label htmlFor="title" className="form-label">Channel</label>
                                        <RCreatable className="rselectfield"
                                            style={{ fontSize: "12px" }}
                                            onChange={handleRSInput}
                                            name="channel"
                                            isClearable={false}
                                            placeholder="helpdesk"
                                            isMulti={false}
                                            options={
                                                channels?.map(item => {
                                                return {value: item,label: item}
                                                })
                                            }
                                        />
                                    </div>
            
                                    <div className="col-12 mt-3 tags-select-wrapper">
                                        <label htmlFor="title" className="form-label">Tags</label>
                                        {/* <RCreatable className="rselectfield"
                                            style={{ fontSize: "12px" }}
                                            onChange={ (value, actionMeta) => {
                                                handleTagSelection(value);
                                            }}
                                            isClearable={false}
                                            isMulti
                                            placeholder="Select or create new tags"
                                            options={
                                                tags?.map(item => {
                                                return {value: item,label: item}
                                                })
                                            }
                                        /> */}
                                        <RCreatable className="rselectfield"
                                            style={{ fontSize: "12px" }}
                                            onChange={ (value, actionMeta) => {
                                                handleTagSelection(value);
                                            }}
                                            isClearable={false}
                                            isDisabled={tagSelectLoading}
                                            isLoading={tagSelectLoading}
                                            isMulti
                                            onCreateOption={handleTagCreation}
                                            value={selectedTags}
                                            options={
                                                // populate 'options' prop from $agents, with names remapped
                                                tags?.map(item => {
                                                item = item?.toLowerCase();
                                                return {value: item,label: item}
                                                })
                                            }
                                        /> 
                                    </div>
            
                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Attachment (If Any)</label>
                                        <label
                                            id="ticket-ath-box"
                                            // onClick={() => document.getElementById("ticketUploadFile").click()}
                                            htmlFor="ticketUploadFile"
                                            className="border border-1 d-block text-center f-14 p-3"><img src={PinIcon} 
                                            alt=""/>
                                            {/* <span className="text-at-blue-light">Add file</span>&nbsp;<span>or drag file here</span> */}
                                            <span>{uploadInfo?.msg}</span>
                                        <p className="mb-0 text-at-red"></p>
                                        </label>
                                    </div>
                                    <input type="file" name="ticketUploadFile" id="ticketUploadFile" accept={getAcceptValue(allowedFiles.ext, allowedFiles.types)} onChange={handleFileSelect}/>
            
                                </div>
                            </div>
                        }
            
                        <div className="text-end">
                            <button
                                type="button"
                                onClick={handleTicketCreation}
                                disabled={creatingTicket}
                                className="btn bg-at-blue-light  py-1 px-4">{creatingTicket ? 'Creating...' : 'Create'}</button>
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
    subCategories: state.subCategory.subCategories,
    statuses: state.status.statuses,
    agents: state.agent.agents,
    groups: state.group.groups,
    isTicketCreated: state.ticket.isTicketCreated,
    customers: state.customer.customers,
    tags: state.tag.tags?.tags_names?.tags
})

export default connect(mapStateToProps, {addTicket, getPaginatedTickets, resetTicketCreated, createTags})(CreateTicketModal);
