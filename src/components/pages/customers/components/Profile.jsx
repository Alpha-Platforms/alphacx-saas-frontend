/* eslint-disable */
// @ts-nocheck
import { useState, Fragment, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import RSelect from 'react-select/creatable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse';
import { css } from '@emotion/css';
import { getUserInitials } from '../../../../helper';
import {
    httpGetMain,
    httpPatchMain,
    /* httpPostMain,, */
} from '../../../../helpers/httpMethods';
import { updateCustomer } from '../../../../reduxstore/actions/customerActions';
import { countrycodes } from '../../../shared/countrycodes';
import { ExpandChat } from '../../../../assets/images/svgs';
import { multiIncludes, brandKit } from '../../../../helper';
import { accessControlFunctions } from '../../../../config/accessControlList';

function Profile({ currentCustomer, customerId, updateCustomer, user, ...props }) {
    const [errors, setErrors] = useState({});
    //
    const [editProfile, setEditProfile] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    //
    const [customFieldConfig, setCustomFieldConfig] = useState([]);
    //
    const [customFieldIsSet, setCustomFieldIsSet] = useState(false);
    const [mergedCustomUserFields, setMergedCustomUserFields] = useState([]);
    const [customFieldsGroup, setCustomFieldsGroup] = useState([]);

    // profile update info
    const [processing, setProcessing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        phone_number: '',
        avatar: '',
    });
    // avatar upload
    const [uploadInfo, setUploadInfo] = useState({
        blob: null,
        msg: 'Upload logo for customer profile.',
        error: false,
        image: null,
        ownAvatar: '',
    });

    // get custom field config
    useEffect(() => {
        getCustomFieldConfig();
    }, []);

    // group custom field when custom field config is set
    useEffect(() => {
        groupCustomFields();
    }, [mergedCustomUserFields]);

    // if customers is mounted
    useEffect(() => {
        // get
        const user_custom_fields = currentCustomer?.custom_fields || {};
        const merged_custom_user_fields = customFieldConfig.map((element) => {
            if (user_custom_fields.hasOwnProperty(element.id)) {
                return {
                    ...element,
                    value: user_custom_fields[element.id],
                };
            }
            return {
                ...element,
                value: '',
            };
        });
        setMergedCustomUserFields(merged_custom_user_fields);
    }, [currentCustomer, customFieldConfig]);

    // get custom field config
    const getCustomFieldConfig = async () => {
        const res = await httpGetMain(`custom-field?belongsTo=user`);
        if (res.status === 'success') {
            setCustomFieldConfig(res?.data);
        } else {
        }
    };

    // group custom field by field_section
    const groupCustomFields = () => {
        const groupedCustomFields = Object.entries(
            //
            mergedCustomUserFields.reduce(
                (
                    acc,
                    {
                        id,
                        field_name,
                        field_type,
                        field_section,
                        field_options,
                        required,
                        multiple_options,
                        belongs_to,
                        value,
                    },
                ) => {
                    // Group initialization
                    if (!acc[field_section]) {
                        acc[field_section] = [];
                    }
                    // Grouping
                    // only pushing the object in a field section
                    acc[field_section].push({
                        id,
                        field_name,
                        field_type,
                        field_section,
                        required,
                        multiple_options,
                        belongs_to,
                        field_options,
                        value,
                    });
                    return acc;
                },
                {},
            ),
        ).map(([section, fields]) => ({ section, fields }));
        //
        setCustomFieldIsSet(true);
        setCustomFieldsGroup([...groupedCustomFields]);
    };

    //
    const handleEditProfile = () => {
        // console.log(idObjectFromArray);
        setProfileData((prevState) => ({
            ...prevState,
            firstName: currentCustomer?.firstname,
            lastName: currentCustomer?.lastname,
            phone_number: currentCustomer.phoneNumber
                ? currentCustomer.phoneNumber
                : currentCustomer.phone_number
                ? currentCustomer.phone_number
                : '',
            avatar: currentCustomer?.avatar ? currentCustomer?.avatar : '',
        }));
        setEditProfile(!editProfile);
    };

    // handle profile inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // handle custom field input change
    const handleCustomFieldChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            customField: {
                ...prevState.customField,
                ...currentCustomer.custom_fields,
                [name]: value,
            },
        }));
    };

    // update profile function
    const updateProfile = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const form = event.target;
        const isValid = form.checkValidity(); // returns true or false
        const formData = new FormData(form);
        const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
            acc[key] = form.elements[key].validationMessage;
            return acc;
        }, {});
        setErrors(validationMessages);

        if (isValid) {
            // updateCustomer(customerId, profileData);            
            const res = await httpPatchMain(`customer/${customerId}`, profileData);
            if (res.status === 'success') {
                setEditProfile(false);
                setProcessing(false);
                return NotificationManager.success('Profile successfully updated', 'Success');
            }
            setProcessing(false);
            return NotificationManager.error(res.er.message, 'Error', 4000);
        }
        setProcessing(false);
        return NotificationManager.error('Please fill in all required fields', 'error', 4000);
    };

    const hasError = (field) => !!errors[field];
    const getError = (field) => errors[field];

    return (
        <Form
            className=""
            onSubmit={(event) => {
                updateProfile(event);
            }}
            noValidate
        >
            <Container fluid className="px-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="text-muted acx-ls-30 acx-fs-12">CONTACT INFORMATION</h6>
                    <div className="">
                        {multiIncludes(accessControlFunctions[user?.role], ['create_ticket']) && (
                            <Button
                                title="Toggle edit profile"
                                className={`acx-btn-icon acx-btn-icon-default  ${editProfile ? 'active' : ''}`}
                                onClick={handleEditProfile}
                            >
                                <i className="bi-pencil-square" />
                            </Button>
                        )}
                    </div>
                </div>
                {/* CONTACT INFORMATION< */}
                <Row className="mb-3">
                    <Col md={8}>
                        <Row className="justify-content-between mb-3">
                            <Col>
                                <Form.Group
                                    className={`d-inline-flex flex-column flex-grow-0 ${
                                        editProfile ? '' : 'border-bottom'
                                    } pb-2 form-group acx-form-group`}
                                >
                                    <Form.Label className="text-muted small mb-1">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        required
                                        className={`text-dark ${editProfile ? '' : 'py-0'}`}
                                        plaintext={!editProfile}
                                        readOnly={!editProfile}
                                        defaultValue={currentCustomer?.firstname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className={`d-inline-flex flex-column flex-grow-0 ${
                                        editProfile ? '' : 'border-bottom'
                                    } pb-2 form-group acx-form-group`}
                                >
                                    <Form.Label className="text-muted small mb-1">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        required
                                        className={`text-dark ${editProfile ? '' : 'py-0'}`}
                                        plaintext={!editProfile}
                                        readOnly={!editProfile}
                                        defaultValue={currentCustomer?.lastname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mb-3 border-bottom">
                            <Form.Group className="d-inline-flex flex-column flex-grow-0 pb-2 form-group acx-form-group">
                                <Form.Label className="text-muted small mb-1">Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phoneNumber"
                                    className={`text-dark ${editProfile ? '' : 'py-0'}`}
                                    plaintext={!editProfile}
                                    readOnly={!editProfile}
                                    required
                                    defaultValue={
                                        currentCustomer.phoneNumber
                                            ? currentCustomer.phoneNumber
                                            : currentCustomer.phone_number
                                            ? currentCustomer.phone_number
                                            : ''
                                    }
                                    onChange={handleChange}
                                />
                                <span className="text-danger d-block small">{getError('phoneNumber')}</span>
                            </Form.Group>
                        </div>
                        {customFieldIsSet ? (
                            customFieldsGroup.map((mergedCustomUserFields) => {
                                return (
                                    <Fragment key={mergedCustomUserFields.section}>
                                        <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">
                                            {mergedCustomUserFields.section != 'null' ||
                                            mergedCustomUserFields.section == null ||
                                            mergedCustomUserFields.section == undefined
                                                ? mergedCustomUserFields.section.toUpperCase()
                                                : 'OTHERS'}
                                        </h6>
                                        <Row className="mb-4 border-bottom">
                                            {mergedCustomUserFields.fields.map((data) => {
                                                if (data?.field_type == 'select') {
                                                    return (
                                                        <Col md={4} key={data.id}>
                                                            <Form.Group
                                                                className={`d-flex flex-column flex-grow-1 ${
                                                                    editProfile ? '' : 'border-bottom'
                                                                } pb-2 mb-3 form-group acx-form-group`}
                                                            >
                                                                <Form.Label className="text-muted small mb-1">
                                                                    {data?.field_name}{' '}
                                                                    {data?.required ? (
                                                                        <span className="text-danger">*</span>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </Form.Label>
                                                                <Form.Select
                                                                    name={data.id}
                                                                    className={`text-dark ${
                                                                        editProfile ? '' : 'ps-0 py-0 border-0 bg-white'
                                                                    } mb-1`}
                                                                    plaintext={`${!editProfile}`}
                                                                    readOnly={!editProfile}
                                                                    disabled={!editProfile}
                                                                    onChange={handleCustomFieldChange}
                                                                    required={data?.required}
                                                                    defaultValue={data?.value}
                                                                >
                                                                    <option value="" disabled />
                                                                    {data.field_options
                                                                        ? data.field_options
                                                                              .replace(/{|"|}/g, '')
                                                                              .split(',')
                                                                              .map((options) => {
                                                                                  return (
                                                                                      <option
                                                                                          key={options}
                                                                                          value={options}
                                                                                      >
                                                                                          {options}
                                                                                      </option>
                                                                                  );
                                                                              })
                                                                        : null}
                                                                </Form.Select>
                                                                <span className="text-danger d-block small">
                                                                    {getError(data?.id)}
                                                                </span>
                                                            </Form.Group>
                                                        </Col>
                                                    );
                                                }
                                                return (
                                                    <Col md={4} key={data.id}>
                                                        <Form.Group
                                                            className={`d-inline-flex flex-column flex-grow-0 ${
                                                                editProfile ? '' : 'border-bottom'
                                                            } pb-2 mb-3 form-group acx-form-group`}
                                                        >
                                                            <Form.Label className="text-muted small mb-1">
                                                                {data?.field_name}{' '}
                                                                {data?.required ? (
                                                                    <span className="text-danger">*</span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </Form.Label>
                                                            <Form.Control
                                                                name={data?.field_type === 'email'? 'email' : data?.id}
                                                                type={data?.field_type}
                                                                className={`text-dark ${
                                                                    editProfile ? '' : 'py-0'
                                                                } mb-1`}
                                                                plaintext={!editProfile}
                                                                readOnly={!editProfile}
                                                                defaultValue={data?.value || ''}
                                                                required={data?.required}
                                                                onChange={data?.field_type === 'email'? handleChange : handleCustomFieldChange}
                                                            />
                                                            <span className="text-danger d-block small">
                                                                {getError(data?.id)}
                                                            </span>
                                                        </Form.Group>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Fragment>
                                );
                            })
                        ) : (
                            <Col md={12}>
                                <div className="text-center" />
                            </Col>
                        )}
                    </Col>
                    <Col md={4}>
                        <div className="text-center">
                            {currentCustomer?.avatar ? (
                                <div className="avatar avatar-xxl d-flex justify-content-center overflow-hidden mx-auto rounded-3">
                                    <img
                                        src={currentCustomer.avatar}
                                        alt={`${currentCustomer.firstname} ${
                                            currentCustomer.lastname == 'default' ? '' : currentCustomer.lastname
                                        }`}
                                        width="200"
                                        height="auto"
                                    />
                                </div>
                            ) : (
                                <div className={`user-initials mx-auto d-flex justify-content-center align-items-center avatar avatar-xl rounded-3 ${css({ ...brandKit({ bgCol: 0 }) })}`}>
                                    <h1 className="">
                                        {getUserInitials(
                                            `${currentCustomer.firstname} ${
                                                currentCustomer.lastname == 'default' ? '' : currentCustomer.lastname
                                            }`,
                                        )}
                                    </h1>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <div className="py-3 text-end">
                    {editProfile ? (
                        <Button type="submit" disabled={processing} className="acx-btn-primary px-3">
                            {processing ? (
                                <span className="text-light d-flex justify-content-center align-items-center">
                                    <Spinner
                                        as="span"
                                        size="sm"
                                        animation="border"
                                        variant="light"
                                        aria-hidden="true"
                                        role="status"
                                    />
                                    <span className="ms-1"> Loading...</span>
                                </span>
                            ) : (
                                <span>Update Profile</span>
                            )}
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
            </Container>
        </Form>
    );
}

const mapStateToProps = (state, ownProps) => ({
    user: state.userAuth.user,
});
export default connect(mapStateToProps, { updateCustomer })(Profile);
