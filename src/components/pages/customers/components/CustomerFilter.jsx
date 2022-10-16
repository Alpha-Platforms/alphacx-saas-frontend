// @ts-nocheck
import React, { Fragment, useState } from 'react';
// import {custStorageKey} from '../CustomerSearch';

function CustomerFilter({ showUpdate, setShowUpdate, cust, setCust, setExtraColumns, custData, setIsFiltering }) {
    const [filterInput, setFilterInput] = useState({
        FullName: '',
        Email: '',
        ResidenceStateId: '',
        BankBv: '',
        HolderTypeId: '',
        OccupationId: '',
        BankAccountNumber: '',
        SortCode: '',
        OriginStateId: '',
        NIN: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilterInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCustFilter = () => {
        // const custLocalData = JSON.parse(window.localStorage.getItem(custStorageKey));

        const customers = custData?.data || [];

        if (custData) {
            const filteredCust = customers
                .filter((cust) => {
                    if (filterInput.ResidenceStateId.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.ResidenceStateId?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.BankBv.trim()) {
                        return cust.BankBv?.toString()?.toLowerCase()?.includes(filterInput.BankBv?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.HolderTypeId.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.HolderTypeId?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.OccupationId.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.OccupationId?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.BankAccountNumber.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.BankAccountNumber?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.SortCode.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.SortCode?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.OriginStateId.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.OriginStateId?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.NIN.trim()) {
                        return cust.ResidenceStateId?.toString()
                            ?.toLowerCase()
                            ?.includes(filterInput.NIN?.toLowerCase());
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.FullName.trim()) {
                        return `${cust.FirstName?.toString()?.toLowerCase()} ${cust.LastName?.toString()?.toLowerCase()}`?.includes(
                            filterInput.FullName?.toLowerCase(),
                        );
                    }
                    return true;
                })
                .filter((cust) => {
                    if (filterInput.Email.trim()) {
                        return cust.Email?.toString()?.toLowerCase()?.includes(filterInput.Email?.toLowerCase());
                    }
                    return true;
                });

            // extra columns
            const columns = Object.keys(filterInput)
                .filter((x) => x !== 'BankBv' && x !== 'FullName' && x !== 'Email' && filterInput[x].trim() !== '')
                .map((key) => {
                    switch (key) {
                        case 'ResidenceStateId':
                            return { title: 'Residence State Id', field: key };
                        case 'HolderTypeId':
                            return { title: 'Residence State Id', field: key };
                        case 'OccupationId':
                            return { title: 'Occupation Id', field: key };
                        case 'BankAccountNumber':
                            return { title: 'Bank Account Number', field: key };
                        case 'SortCode':
                            return { title: 'Sort Code', field: key };
                        case 'OriginStateId':
                            return { title: 'Origin State Id', field: key };
                        case 'NIN':
                            return { title: 'NIN', field: key };
                        default:
                            return key;
                    }
                });

            setExtraColumns(columns);

            setCust((prev) => {
                return { ...prev, data: filteredCust, meta: { loadCustomer: true } };
            });

            const {
                FullName,
                Email,
                ResidenceStateId,
                BankBv,
                HolderTypeId,
                OccupationId,
                BankAccountNumber,
                SortCode,
                OriginStateId,
                NIN,
            } = filterInput;

            if (
                !FullName &&
                !Email &&
                !ResidenceStateId &&
                !BankBv &&
                !HolderTypeId &&
                !OccupationId &&
                !BankAccountNumber &&
                !SortCode &&
                !OriginStateId &&
                !NIN
            ) {
                setIsFiltering(false);
            } else {
                setIsFiltering(true);
            }

            setShowUpdate(false);
        }
    };

    return (
        <>
            {/* Profile Update OffCanvas */}
            <div className={showUpdate ? 'update-backdrop' : ''} onClick={() => setShowUpdate(false)} />
            <div
                className="offcanvas offcanvas-end show"
                tabIndex={-1}
                id="uploadSidebar"
                aria-labelledby="offcanvasRightLabel"
                style={{
                    visibility: `${showUpdate ? 'visible' : 'hidden'}`,
                }}
            >
                <div className="offcanvas-header mx-2 mt-0">
                    <h5 id="offcanvasRightLabel" className="mt-1">
                        Filter Customers
                    </h5>
                    <div className="d-flex justify-content-center align-items-center update-close-wrap">
                        <button
                            type="button"
                            className="btn-close text-reset p-0 m-0 h-100 w-100"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => setShowUpdate(false)}
                        >
                            x
                        </button>
                    </div>
                </div>
                <div className="offcanvas-body filter-flyout-body pt-0">
                    <form className="px-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="FullName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="FullName"
                                value={filterInput.FullName}
                                name="FullName"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="Email"
                                value={filterInput.Email}
                                name="Email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ResidenceStateId" className="form-label">
                                Residence State Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ResidenceStateId"
                                value={filterInput.ResidenceStateId}
                                name="ResidenceStateId"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BankBv" className="form-label">
                                Bank BVN
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="BankBv"
                                name="BankBv"
                                value={filterInput.BankBv}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="HolderTypeId" className="form-label">
                                Holder Type Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="HolderTypeId"
                                name="HolderTypeId"
                                value={filterInput.HolderTypeId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="OccupationId" className="form-label">
                                Occupation Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="OccupationId"
                                name="OccupationId"
                                value={filterInput.OccupationId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BankAccountNumber" className="form-label">
                                Account Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="BankAccountNumber"
                                name="BankAccountNumber"
                                value={filterInput.BankAccountNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SortCode" className="form-label">
                                Sort Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="SortCode"
                                name="SortCode"
                                value={filterInput.SortCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="OriginStateId" className="form-label">
                                Origin State Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="OriginStateId"
                                name="OriginStateId"
                                value={filterInput.OriginStateId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="NIN" className="form-label">
                                NIN
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="NIN"
                                name="NIN"
                                value={filterInput.NIN}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn bg-at-blue-light rounded-0 d-block w-100 mt-4  hover-op-8"
                            onClick={handleCustFilter}
                        >
                            Filter
                        </button>
                    </form>
                </div>
            </div>
            {/* <!-- end of profile update canvas --> */}
        </>
    );
}

export default CustomerFilter;
