import React, { useState, Fragment, useEffect, useRef } from 'react';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScaleLoader from 'react-spinners/ScaleLoader';
import { NotificationManager } from 'react-notifications';

import { useParams } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { httpPostMain } from '../../../helpers/httpMethods';
import CreateTicketModal from '../tickets/CreateTicketModal';
import { StarIconTicket } from '../../../assets/images/svgs';
import '../../../styles/Customer.css';
import httpOnpremGet from '../../../helpers/httpMethodsOnprem';

function CustomerDetails() {
    const override = css``;
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    const [creatingCustomer, setCreatingCustomer] = useState(false);
    const [customerId, setCustomerId] = useState({
        value: '',
        changed: false,
    });
    // create ticket modal
    const [createModalShow, setCreateModalShow] = useState(false);
    // @ts-ignore
    const { accountNumber, registerID } = useParams();
    const [sharedolderSpecimen, setSharedolderSpecimen] = useState(null);
    const [loadingSpecimen, setLoadingSpecimen] = useState(false);
    const [disableSpecimenBtn, setDisableSpecimenBtn] = useState(false);
    const elemRef = useRef();
    const [customerDetails, setCustomerDetails] = useState({
        FirstName: '',
        LastName: '',
        MiddleName: '',
        Email: '',
        Phone: '',
        AltPhone: '',
        Title: '',
        Sex: '',
        Address1: '',
        Address2: '',
        CityTown: '',
        ResidenceStateId: '',
        Symbol: '',
        BankAccountNumber: '',
        OldAccountNumber: '',
        BankBv: '',
        SortCode: '',
        OriginStateId: '',
        OccupationId: '',
        NoTax: '',
        HolderTypeId: '',
        NxKin: '',
        Tin: '',
        NIN: '',
    });

    const getCustomerDetails = async (accountNo, registerId) => {
        const res = await httpOnpremGet(`getHolderKYC?accountNumber=${accountNo}&registerID=${registerId}`);
        if (res.status === 200) {
            setCustomerDetails((prevState) => ({
                ...prevState,
                ...res.data[0],
            }));
            return setDetailsLoaded(true);
        }
        return NotificationManager.error('Could not retrieve user data...', 'Error', 4000);
    };

    // @ts-ignore
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getCustomerDetails(accountNumber, registerID);
        }
        // eslint-disable-next-line no-return-assign
        return () => (mounted = false);
    }, [accountNumber, registerID]);

    useEffect(() => {
        if (customerId.changed === true && customerId.value !== '') {
            setCreateModalShow(true);
        }
    }, [customerId]);

    const getCustomerNames = (...val) => {
        const valArr = val
            .filter((i) => i)
            .join(' ')
            .split(' ');
        const [FirstName, LastName] = valArr;
        return { FirstName, LastName };
    };

    // eslint-disable-next-line consistent-return
    const createTicket = async (accountNo, registerId, firstName, lastName) => {
        setCreatingCustomer(true);
        const { FirstName, LastName } = getCustomerNames(firstName, lastName);
        const data = {
            firstName: FirstName,
            lastName: LastName,
            email: `dummy.email${Math.random() * 2}@for.now`, // remove this after BE is taken care of
            customField: {
                accountNumber: accountNo,
                registerID: registerId,
            },
        };

        const res = await httpPostMain(`customer`, data);
        if (res?.status === 'success') {
            setCustomerId((pevState) => ({
                ...pevState,
                value: res?.data.id,
                changed: true,
            }));
            return setCreatingCustomer(false);
        }
        setCreatingCustomer(false);
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    const initialsFromString = (...val) => {
        const valArr = val
            .filter((i) => i)
            .join(' ')
            .split(' ');
        const firstStrCapitalized = valArr[0].toUpperCase().charAt(0);
        const secondStrCapitalized = valArr[1].toUpperCase().charAt(0);
        return `${firstStrCapitalized}${secondStrCapitalized}`;
    };

    // httpOnpremGet
    const getSharedolderSpecimen = async (accountNo, registerId) => {
        const res = await httpOnpremGet(`getHolderDoc?accountNumber=${accountNo}&registerID=${registerId}`);
        if (res.status === 200 && res.data[0].HolderDoc) {
            setSharedolderSpecimen(res.data);
        } else {
            NotificationManager.error(res.data[0].ErrorMessage, 'Error', 4000);
        }

        setLoadingSpecimen(false);
    };

    const showSpecimen = (e) => {
        e.preventDefault();
        setLoadingSpecimen(true);
        setDisableSpecimenBtn(true);
        getSharedolderSpecimen(accountNumber, registerID);
    };

    useEffect(() => {
        if (sharedolderSpecimen) {
            // @ts-ignore
            elemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [sharedolderSpecimen]);

    return (
        <>
            {!detailsLoaded ? (
                <div className="single-cust-loader">
                    <ScaleLoader loading color="#006298" />
                </div>
            ) : !customerDetails ? (
                <div>No Customer Found.</div>
            ) : (
                <div className="pb-4">
                    <div className="border">
                        <div className="bg-secondary pt-0 bg-white overflow-hidden">
                            <div className="px-5 py-3 d-flex justify-content-between">
                                <h5 className="text-dark">User Profile</h5>
                                <div>
                                    <Button
                                        size="sm"
                                        type="button"
                                        onClick={() =>
                                            createTicket(
                                                accountNumber,
                                                registerID,
                                                customerDetails?.FirstName,
                                                customerDetails?.LastName,
                                            )
                                        }
                                        className="border acx-btn-primary px-md-2 mx-md-2"
                                        disabled={creatingCustomer}
                                    >
                                        {creatingCustomer ? (
                                            <span>
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{' '}
                                                Processing...
                                            </span>
                                        ) : (
                                            <span>
                                                <StarIconTicket size={undefined} /> Create Ticket
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="">
                                <Container fluid className="px-5">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="text-muted acx-ls-30 acx-fs-12">CONTACT INFORMATION</h6>
                                    </div>
                                    {/* CONTACT INFORMATION< */}
                                    <Row className="mb-1">
                                        <Col md={8}>
                                            <Row className="justify-content-between mb-3">
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">First Name</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.FirstName || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">Last Name</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.LastName || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">Middle Name</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.MiddleName || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-between mb-3">
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">Title</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Title || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">Gender</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Sex === 'M'
                                                                ? 'Male'
                                                                : customerDetails?.Sex === 'F'
                                                                ? 'Female'
                                                                : ''}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0">
                                                        <small className="text-muted small mb-2">Birthday</small>
                                                        <h6 className="text-dark border-bottom">-</h6>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="justify-content-between mb-3">
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <div className="d-inline-flex flex-column flex-grow-0">
                                                            <small className="text-muted small mb-2">Phone</small>
                                                            <h6 className="text-dark border-bottom">
                                                                {customerDetails?.Phone || '-'}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <div className="d-inline-flex flex-column flex-grow-0">
                                                            <small className="text-muted small mb-2">Alt Phone</small>
                                                            <h6 className="text-dark border-bottom">
                                                                {customerDetails?.AltPhone}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <div className="d-inline-flex flex-column flex-grow-0">
                                                            <small className="text-muted small mb-2">Email</small>
                                                            <h6 className="text-dark border-bottom">
                                                                {customerDetails?.Email || '-'}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <div className="text-center">
                                                <div className="user-initials blue mx-auto d-flex justify-content-center align-items-center avatar avatar-xl rounded-3">
                                                    <h1 className="mb-0">
                                                        {initialsFromString(
                                                            customerDetails?.FirstName,
                                                            customerDetails?.LastName,
                                                            customerDetails?.MiddleName,
                                                        )}
                                                    </h1>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr className="mb-3" />
                                    <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">ADDRESS 1</h6>
                                    <Row className="mb-1">
                                        <Col md={8}>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Address</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Address1 || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Address 2</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Address2 || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">City/Town</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.CityTown || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">
                                                            Residence State Id
                                                        </small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.ResidenceStateId || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr className="mb-3" />
                                    <h6 className="text-muted mb-4 acx-ls-30 acx-fs-12">Account Details</h6>
                                    <Row className="mb-1">
                                        <Col md={8}>
                                            <Row className="justify-content-between mb-3">
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Symbol</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Symbol || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">
                                                            Residence State Id
                                                        </small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.ResidenceStateId || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">
                                                            Bank Account Number
                                                        </small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.BankAccountNumber || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Bank BVN</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.BankBv || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Sort Code</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.SortCode || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Origin State ID</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.OriginStateId || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Occupation ID</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.OccupationId || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                {/* <Col md={4}>
                                                <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                    <small className="text-muted small mb-2">No Tax</small>
                                                    <h6 className="text-dark border-bottom" >
                                                        {customerDetails?.NoTax || "-"}
                                                    </h6>
                                                </div>
                                            </Col> */}
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Holder Type Id</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.HolderTypeId || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Next of Kin</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.NxKin || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">Tin</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.Tin || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">NIN</small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.NIN || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className="d-inline-flex flex-column flex-grow-0 mb-3">
                                                        <small className="text-muted small mb-2">
                                                            Old Account Number
                                                        </small>
                                                        <h6 className="text-dark border-bottom">
                                                            {customerDetails?.OldAccountNumber || '-'}
                                                        </h6>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {sharedolderSpecimen && sharedolderSpecimen[0] ? (
                                        <div>
                                            <h6 className="acx-fs-12 acx-ls-30 fw-bold bg-at-blue-lighter p-2 mb-3">
                                                SIGNATURE
                                            </h6>
                                            <img
                                                ref={elemRef}
                                                src={`data:image/png;base64,${sharedolderSpecimen[0]?.HolderDoc}`}
                                                alt="Sharedolder Specimen"
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {sharedolderSpecimen && sharedolderSpecimen[1] ? (
                                        <div>
                                            <h6 className="acx-fs-12 acx-ls-30 fw-bold bg-at-blue-lighter p-2 mb-3">
                                                SPECIMENs
                                            </h6>
                                            <img
                                                ref={elemRef}
                                                src={`data:image/png;base64,${sharedolderSpecimen[1]?.HolderDoc}`}
                                                alt="Sharedolder Specimen"
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    <button
                                        type="button"
                                        className="d-flex btn acx-btn-primary btn-sm my-md-3 pt-1"
                                        disabled={disableSpecimenBtn}
                                        onClick={showSpecimen}
                                    >
                                        <span>Show Sharedolder Specimen</span>

                                        {loadingSpecimen && (
                                            <div className="ps-2">
                                                <ClipLoader
                                                    color="#ffffff"
                                                    loading={loadingSpecimen}
                                                    css={override}
                                                    size={20}
                                                />
                                            </div>
                                        )}
                                    </button>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CreateTicketModal
                createModalShow={createModalShow}
                setCreateModalShow={setCreateModalShow}
                customerId={customerId.value}
                customerDetails={{
                    FirstName: customerDetails?.FirstName ?? '',
                    LastName: customerDetails?.MiddleName ?? '',
                    MiddleName: customerDetails?.LastName ?? '',
                }}
                customer={{
                    firstname: customerDetails?.FirstName ?? '',
                    lastname: customerDetails?.MiddleName ?? '',
                    middlename: customerDetails?.LastName ?? '',
                }}
                fromSingleCustomer={undefined}
                isEditing
            />
        </>
    );
}

export default CustomerDetails;
