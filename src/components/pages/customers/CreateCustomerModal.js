import {useState, useEffect} from 'react';
import {Modal} from 'react-responsive-modal';
import {NotificationManager} from 'react-notifications';
import {addCustomer, getPaginatedCustomers, updateCustomer} from '../../../reduxstore/actions/customerActions';
import {connect} from 'react-redux';
import RSelect from 'react-select/creatable';
import PinIcon from '../../../assets/icons/pin.svg';
import {countrycodes} from '../../shared/countrycodes';
import ImageDefault from '../../../assets/svgicons/image-default.svg';
import axios from 'axios';
import {createTags} from '../../../reduxstore/actions/tagActions';

const CreateCustomerModal = ({createModalShow, setCreateModalShow, getPaginatedCustomers, tags, isEditing, customerId, customers, updateCustomer, createTags}) => {

    const [selectedTags,
        setSelectedTags] = useState([]);
    const [modalInputs,
        setModalInputs] = useState({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: '', ccode: '+234'});
    const [creatingCust, setCreatingCust] = useState(false);
    const [editingCust, setEditingCust] = useState(false);
    const [showAddOption, setShowAddOption] = useState(false);
    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Upload logo for customer profile.',
        error: false,
        image: null,
        ownAvatar: ''
    });
    const [tagSelectLoading, setTagSelectLoading] = useState(false);

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
            const {firstname, lastname, phone_number, email, organisation, tags, avatar} = customers.find(cust => cust.id === customerId);
            setModalInputs(prev => ({
                ...prev,
                firstname,
                lastname,
                workphone: phone_number,
                emailaddress: email
            }));
            setSelectedTags(Array.isArray(tags) ? tags.map(tag => ({value: tag.toLowerCase(), label: tag.toLowerCase()})) : []);
            setUploadInfo(prev => ({ ...prev, ownAvatar: avatar }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createModalShow]);


    const handleCustomerCreation = async () => {
        const {firstname, lastname, workphone, emailaddress, organisation, ccode} = modalInputs;
        if (!firstname || !lastname || !workphone || !emailaddress) {
            NotificationManager.error("Fill up the required fields", 'Error');
        } else {
            setCreatingCust(true);

            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', 'i5bn3icr');
                data.append('cloud_name', 'alphacx-co');
                axios
                    .post(`https://api.cloudinary.com/v1_1/alphacx-co/image/upload`, data)
                    .then(async res => {
                        const addRes = await addCustomer({firstName: firstname, lastName: lastname, email: emailaddress, phoneNumber: workphone, organisation, tags: selectedTags.map(tag => tag.value), avatar: res.data?.url });
                        if (addRes.status === "success") {
                            NotificationManager.success(res?.message, 'Success');
                            setCreateModalShow(false);
                            setModalInputs({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: '', ccode: '+234'});
                            setUploadInfo({
                                blob: null,
                                msg: 'Upload logo for customer profile.',
                                error: false,
                                image: null,
                                ownAvatar: ''
                            });
                            getPaginatedCustomers(10, 1);
                            setCreatingCust(false);
                        } else {
                            setCreatingCust(false);
                            NotificationManager.error('An error occured', 'Error');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        NotificationManager.error("Photo could not be uploaded", "Error");
                        setCreatingCust(false);
                    });
            } else {
                const res = await addCustomer({firstName: firstname, lastName: lastname, email: emailaddress, phoneNumber: workphone, organisation, tags: selectedTags.map(tag => tag.value)});
                if (res.status === "success") {
                    NotificationManager.success(res?.message, 'Success');
                    setCreateModalShow(false);
                    setModalInputs({firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: '', ccode: '+234'});
                    getPaginatedCustomers(10, 1);
                    setCreatingCust(false);
                } else {
                    setCreatingCust(false);
                    NotificationManager.error('An error occured', 'Error');
                }
            }
        }
    }

    const custEditSuccess = () => {
        NotificationManager.success('Customer updated successfully', 'Success');
        getPaginatedCustomers(10, 1);
        setEditingCust(false);
        setModalInputs(prev => ({...prev, firstname: '', lastname: '', workphone: '', emailaddress: '', organisation: '', ccode: "+234"}));
        setCreateModalShow(false);
    }
    
    const custEditFail = () => {
        NotificationManager.error('Oops, an error occured', 'Error');
        setEditingCust(false);
    }

    const handleCustomerEdit = () => {
        const {firstname, lastname, workphone, emailaddress, organisation, ccode} = modalInputs;
        if (!firstname || !lastname || !workphone || !emailaddress) {
            NotificationManager.error("Fill up the required fields", 'Error');
        } else {
            setEditingCust(true);
            
            
            if (uploadInfo.image) {
                const data = new FormData();
                data.append('file', uploadInfo.image);
                data.append('upload_preset', 'i5bn3icr');
                data.append('cloud_name', 'alphacx-co');
                axios
                    .post(`https://api.cloudinary.com/v1_1/alphacx-co/image/upload`, data)
                    .then(async res => {
                        const newCustomer = {firstName: firstname, lastName: lastname, email: emailaddress, phoneNumber: `${workphone}`, organisation, tags: selectedTags.map(tag => tag.value.toLowerCase()), avatar: res.data?.url};

                        updateCustomer(customerId, newCustomer, custEditSuccess, custEditFail);
                        
                    })
                    .catch(err => {
                        console.log(err);
                        NotificationManager.error("Photo could not be uploaded", "Error");
                        setCreatingCust(false);
                    });
                } else {

                    const newCustomer = {firstName: firstname, lastName: lastname, email: emailaddress, phoneNumber: `${workphone}`, organisation, tags: selectedTags.map(tag => tag.value.toLowerCase())};
                    updateCustomer(customerId, newCustomer, custEditSuccess, custEditFail);
                    
            }


        }
    }

    const handleModalHide = () => {
        setCreateModalShow(false);
        setCreatingCust(false);
        setEditingCust(false);
        setUploadInfo({
            blob: null,
            msg: 'Upload logo for customer profile.',
            error: false,
            image: null,
            ownAvatar: ''
        });
    }


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
        const newTags = [...tags.map(tag => tag.value), newTag];

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

const workphoneChange = e => {
    handleModalInput(e);

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
                    <p className="fs-5 mb-3">{!isEditing ? 'Create New' : 'Edit'} Customer</p>
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
                                <label htmlFor="workphone" className="form-label">Work Phone</label>
                                <div className="input-group mb-3 workphone-group">
                                    <div className="input-group-prepend workphone-dd-wrapper">
                                    <span><img src={`https://www.countryflags.io/${countrycodes.find(x => x.dial_code === modalInputs.ccode)?.code || ''}/flat/64.png`} alt="" /></span><select className="d-inline mt-0" name="ccode" id="ccode" value={modalInputs.ccode} onChange={handleModalInput}>
                                            {countrycodes.sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1))).map(cc => <option value={cc.dial_code}>{cc.dial_code}</option>)}
                                        </select>
                                        {/* <span className="workphone-dropdown">lite</span>
                                        <ul>
                                            {countrycodes.sort((a, b) => Number(a.dial_code.slice(1)) - Number(b.dial_code.slice(1))).map(cc => <li>
                                                <span><img src={`https://www.countryflags.io/be/flat/64.png`} alt="" /></span> {cc.dial_code}</li>)}
                                        </ul> */}
                                    </div>
                                    <input type="tel" className="form-control" name="workphone" id="workphone" value={modalInputs.workphone} aria-label="work phone" aria-describedby="workphone" onChange={handleModalInput}/>
                                </div>
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

                        <p
                            className="btn mt-3 mb-2 p-0 text-start"
                            role="button"
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                marginBottom: 0,
                                color: "#006298!important",
                            }}

                            onClick={() => setShowAddOption(x => !x)}
                            >
                            Additional Options <span><DowncaretIcon /></span>
                        </p>
                        

                        {showAddOption && <div className="row g-3 pt-3">

                            <div className="col-12 mt-1">
                                <label htmlFor="organisation" className="form-label">Organisation (optional)</label>
                                <input
                                    type="text"
                                    name="organisation"
                                    id="organisation"
                                    className="form-control"
                                    value={modalInputs.organisation}
                                    onChange={handleModalInput}/>
                            </div>

                            <div className="col-12 mt-3 tags-select-wrapper">
                                <label htmlFor="title" className="form-label">Tags</label>
                                <RSelect className="rselectfield"
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
                                        item = item.toLowerCase();
                                        return {value: item,label: item}
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <div className="d-flex mb-4 mt-3">
                                    <div
                                        id="uploadPersonalPhotoInputImgPreview"
                                        style={{
                                        width: "6rem",
                                        height: "6rem"
                                    }}
                                        className="
                                            border border-1
                                            rounded-3
                                            me-5
                                            d-flex
                                            justify-content-center
                                            align-items-center
                                            ">
                                        <div
                                            style={{
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                            className="ms-0 d-flex justify-content-between align-items-center">
                                            {(uploadInfo.blob || uploadInfo.ownAvatar) ? (<img
                                                        className="avatarImage"
                                                        src={uploadInfo.ownAvatar ? uploadInfo.ownAvatar : uploadInfo.blob}
                                                        alt=""
                                                        onLoad={() => uploadInfo.blob && URL.revokeObjectURL(uploadInfo.blob)}
                                                        style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%'
                                                    }}/>)
                                                    : <img
                                                        src={ImageDefault}
                                                        alt=""
                                                        style={{
                                                        paddingLeft: '2.1rem'
                                                    }}
                                                        className="pe-none"/>}
                                                
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="uploadPersonalPhotoInput"
                                            className="btn btn-sm bg-at-blue-light px-4 py-1 mb-2 mt-1"
                                            onClick={() => document.getElementById("accountLogo").click()}>
                                            Upload Photo
                                        </label>
                                        <input type="file" name="accountLogo" id="accountLogo" onChange={handleImgSelect}/>
                                        <p className="mb-0 text-at-red">
                                            <small id="uploadPersonalPhotoInputError"></small>
                                        </p>
                                        <p className="uploadInfoWrapper">
                                            <small id="uploadPersonalPhotoInputInfo" className={`${uploadInfo.error && 'text-danger'}`}>
                                                {uploadInfo.msg}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>}

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

export default connect(mapStateToProps, {getPaginatedCustomers, updateCustomer, createTags})(CreateCustomerModal);