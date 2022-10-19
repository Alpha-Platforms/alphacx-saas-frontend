/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import SaveAlt from '@material-ui/icons/SaveAlt';
import { NotificationManager } from 'react-notifications';
import RSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import searchIcon from '../../../assets/imgF/Search.png';
import { exportTable, getUserInitials } from '../../../helper';
import CreateCustomerModal from './CreateCustomerModal';
import Filter from '../../../assets/icons/Filter.svg';
import tableIcons from '../../../assets/materialicons/tableIcons';
import { getCustomers, getPaginatedCustomers } from '../../../reduxstore/actions/customerActions';
import { ReactComponent as UploadSvg } from '../../../assets/svgicons/Upload.svg';
import { httpGetMain } from '../../../helpers/httpMethods';
import httpOnpremGet from '../../../helpers/httpMethodsOnprem';
//
import '../../../styles/Customer.css';
import { StarIconTicket } from '../../../assets/images/svgs';
import CustomerFilter from './components/CustomerFilter';

export const custStorageKey = 'persist:fetched_customers';

function CustomerSearch({ isCustomersLoaded, customers, getCustomers, meta, getPaginatedCustomers, isUserAuthenticated}) {
    const [createModalShow, setCreateModalShow] = useState(false);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const [custLoading, setCustLoading] = useState(false);
    const [changingRow, setChangingRow] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);

    const [extraColumns, setExtraColumns] = useState([]);
    const [custData, setCustData] = useState([]);

    const [isFiltering, setIsFiltering] = useState(false);

    const [cust, setCust] = useState({
        data: [
            {
                CscsNumber: '',
                Phone: '',
                LastName: '',
                FirstName: '',
                MiddleName: '',
                Title: '',
                Sex: '',
                Address1: '',
                Address2: '',
                CityTown: '',
                AltPhone: '',
                Email: '',
                ResidenceStateId: '',
                AccountBirthDate: '',
                BankAccountNumber: '',
                BankBv: '',
                SortCode: '',
                OriginStateId: '',
                OccupationId: '',
                NoTax: '',
                Maiden: '',
                HolderTypeId: '',
                NxKin: '',
                Tin: '',
                NIN: '',
                OldAccountNumber: '',
                RegIdNum: '',
                BankName: '',
                TotalHolding: '',
                TotalHoldingBond: '',
                AccountNumber: '',
                RegisterId: '',
            },
        ],

        meta: {
            loadCustomer: false,
        },
    });

    let selectedRows = [];

    const [searchObject, setSearchObject] = useState({
        acrossReg: true,
        registerId: '', // arbitrary number
        searchParam: '',
        searchOption: 'N',
    });

    const [registers, setRegisters] = useState(() => [
        {
            RegisterId: '',
            CompanyName: '',
            CompanyDescription: '',
            Symbol: '',
        },
    ]);

    const [isRegistersLoaded, setIsRegistersLoaded] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [custLoaded, setCustLoaded] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [searchParams, setSearchParams] = useState([
        { label: 'Name', value: 'N' },
        { label: 'Account Number', value: 'A' },
        { label: 'BVN', value: 'B' },
        { label: 'CHN', value: 'C' },
        { label: 'Customer ID', value: 'O' },
        { label: 'Phone Number', value: 'P' },
        { label: 'Email', value: 'E' },
    ]);

    const [RSSearchParams, setRSSearchParams] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (searchObject.searchParam !== '') {
            setIsOptionSelected(true);
        }
    }, [searchObject]);

    useEffect(() => {
        if (registers[0]?.label === 'Across Registers') {
            setIsRegistersLoaded(true);
        }
    }, [registers]);

    const handleFilterCancel = () => {
        setCust((prev) => {
            return { ...prev, data: custData.data, meta: { loadCustomer: true } };
        });
        setIsFiltering(false);
        setExtraColumns([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchObject((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleButtonClick = (e) => {
        const { name, value } = e.target;
        setSearchObject((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleRSInputChange = ({ value }, { name }) => {
        setSearchObject((prev) => {
            return { ...prev, [name]: value, acrossReg: false };
        });
    };

    const getRegisters = async (stateUpdater) => {
        if (!isRegistersLoaded) {
            // new registrars params - searchOption = A
            const res = await httpOnpremGet('ixtracRegister?searchOption=A');

            // return console.log(res);

            if (res.status === 200) {
                const temp = res.data?.map((item) => {
                    return { value: item.RegisterId, label: `${item.CompanyName} (${item.Symbol})` };
                });

                // remove *s
                const cleanedUp = temp.filter((item) => item.label !== '*');

                const sortedRegs = cleanedUp.sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    if (a.label > b.label) {
                        return 1;
                    }
                    return 0;
                });

                stateUpdater((prev) => [{ value: false, label: 'Across Registers' }, ...sortedRegs]);
                setIsRegistersLoaded(true);
            } else {
                NotificationManager.error('Could not get Registers', 'Error', 4000);
            }
        }
    };

    const getHolderDetails = async (e) => {
        e.preventDefault();
        setCustLoading(true);

        const { registerId, searchOption, acrossReg, searchParam } = searchObject;

        let params = '';
        let endpoint = '';

        if (registerId) {
            params = `registerID=${registerId}&acrossReg=${false}&searchOption=${searchOption}&value=${searchParam}`;
            endpoint = 'getRandomHolderDetails';
        } else {
            params = `acrossReg=${true}&searchOption=${searchOption}&value=${searchParam}`;
            endpoint = 'getRandomHolderDetails';
        }

        // params = `searchOption=${searchOption}&value=${searchParam}`

        const res = await httpOnpremGet(`${endpoint}?${params}`);
        const data = res.data[0];

        if (res.status === 200 && !data.ErrorMessage) {
            res.data && setCustData({ searchTerm: searchObject.searchParam, data: res.data });

            setCustLoading(false);
            setCustLoaded(true);
            setCust((prev) => {
                // return {...prev, data: [{...prev.data, ...res.data}], meta: {loadCustomer: true}}
                return { ...prev, data: res.data, meta: { loadCustomer: true } };
            });
        }
        setCustLoading(false);
        return NotificationManager.error('Could not get Customer Details', 'Error', 4000);
    };

    const handleSelectionChange = (rows) => {
        selectedRows = rows;
    };

    const themes = ['red', 'blue', 'yellow', 'purple'];

    const tableTheme = createTheme({
        palette: {
            primary: {
                main: 'rgba(0, 98, 152)',
            },
            secondary: {
                main: 'rgba(0, 98, 152)',
            },
        },
    });

    const filterRegisters = (options, inputValue) => {
        return options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    };

    // checks if customer exist
    const checkCustomer = async (accountNumber, registerID) => {
        const res = await httpGetMain(
            `users?customValues=${accountNumber}_${registerID}&custom=accountNumber_registerID&search=${accountNumber}_${registerID}`,
        );
        if (res?.status === 'success') {
            history.push(`/customers/${res?.data?.users[0]?.id}`);
        } else {
            history.push(`/customer/${accountNumber}/${registerID}`);
        }
    };

    function AlphacxMTPagination2(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />
                    );
                }}
            />
        );
    }

    const tableColumns = [
        {
            title: 'Name',
            field: 'Name',
        },
        {
            title: 'Email Address',
            field: 'Email',
        },
        {
            title: 'Work Phone',
            field: 'Phone',
        },
        {
            title: 'BVN',
            field: 'BankBv',
        },
        {
            title: 'Register',
            field: 'CompanyName',
        },
        {
            title: 'Account No.',
            field: 'AccountNumber',
        },
        {
            title: 'Holdings',
            field: 'TotalHolding',
        },
        ...extraColumns,
        {
            title: '',
            field: '',
            width: '25%',
            render: ({ RegisterId, AccountNumber }) => (
                <div className="d-flex">
                    <Button
                        onClick={() => checkCustomer(AccountNumber, RegisterId)}
                        className="ms-2 btn btn-sm bg-at-blue-light"
                    >
                        Details
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <div className="mt-5 px-3">
            {custLoading && (
                <div className="cust-table-loader">
                    <ScaleLoader loading={custLoading} color="#006298" />
                </div>
            )}
            <div className="d-flex gap-3 m-2 position-relative">
                <div className="col-md-4 ps-0">
                    <RSelect
                        className="rselectfield"
                        style={{ fontSize: '12px' }}
                        name="registerId"
                        placeholder="Select Register"
                        onChange={handleRSInputChange}
                        isClearable={false}
                        isMulti={false}
                        onMenuOpen={() => getRegisters(setRegisters)}
                        options={registers}
                        defaultValue={{ label: 'Across Registers', value: true }}
                    />
                </div>

                {/* <div className="ps-0" style={{width: "275px"}}>
                            <AsyncSelect 
                                style={{ borderRadius: "3px" }}
                                loadOptions={registerOptions}
                                name="registerId"
                                placeholder="Search Register"
                                onChange={handleRSInputChange}
                            />
                        </div> */}

                {/* <DropDown /> */}
                <div className="" style={{ width: '150px' }}>
                    <RSelect
                        className="rselectfield"
                        name="searchOption"
                        placeholder="Search Parameter"
                        onChange={handleRSInputChange}
                        isClearable={false}
                        isMulti={false}
                        options={searchParams}
                        defaultValue={{ label: 'Name', value: 'Name' }}
                    />
                </div>

                <div className="" style={{ width: '250px' }}>
                    <input
                        placeholder="Enter Search Parameter"
                        type="text"
                        style={{
                            width: '100%',
                            borderRadius: 3,
                            border: 'solid 0.5px #ddd',
                            padding: '0.6rem 2rem',
                            backgroundImage: `url(${searchIcon})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '14px',
                            backgroundPosition: '10px 50%',
                        }}
                        name="searchParam"
                        value={searchObject.searchParam || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <button
                        type="button"
                        style={{ padding: '0.5rem 1.5rem', borderRadius: '3px' }}
                        className="btn bg-at-blue-light"
                        disabled={!isOptionSelected}
                        onClick={getHolderDetails}
                    >
                        Search
                    </button>
                </div>

                {cust.meta.loadCustomer && (
                    <div className={isFiltering ? 'd-flex ms-auto border-control' : 'd-flex ms-auto'}>
                        <button type="button" className="btn bg-at-blue-light" onClick={() => setShowUpdate(true)}>
                            <img src={Filter} alt="" />
                        </button>

                        {isFiltering && (
                            <button type="button" className="btn border" onClick={handleFilterCancel}>
                                Clear
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="ticket-table-wrapper mt-4">
                {custLoaded && !changingRow && (
                    <div
                        id="alphacxMTable"
                        className="pb-5 acx-ticket-cust-table acx-cust-table fit-content"
                        style={{ zIndex: 0 }}
                    >
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                title=""
                                icons={tableIcons}
                                columns={tableColumns}
                                data={cust.data.map(
                                    ({
                                        FirstName,
                                        LastName,
                                        Email,
                                        Phone,
                                        CompanyName,
                                        TotalHolding,
                                        TotalHoldingBond,
                                        RegisterId,
                                        AccountNumber,
                                        BankBv,
                                        Address1,
                                        Address2,
                                        ResidenceStateId,
                                        HolderTypeId,
                                        OccupationId,
                                        BankAccountNumber,
                                        SortCode,
                                        OriginStateId,
                                        NIN,
                                    }) => ({
                                        Name: `${FirstName || ''} ${LastName}`,
                                        Email,
                                        Phone,
                                        CompanyName,
                                        TotalHolding: Number(TotalHolding) + Number(TotalHoldingBond),
                                        RegisterId,
                                        AccountNumber,
                                        BankBv,
                                        Address: `${Address1} ${Address2}`,
                                        ResidenceStateId,
                                        HolderTypeId,
                                        OccupationId,
                                        BankAccountNumber,
                                        SortCode,
                                        OriginStateId,
                                        NIN,
                                    }),
                                )}
                                options={{
                                    search: false,
                                    selection: true,
                                    exportButton: false,
                                    tableLayout: 'auto',
                                    paging: true,
                                    pageSize: isCustomersLoaded && meta?.itemsPerPage ? meta?.itemsPerPage : 20,
                                    headerStyle: {
                                        backgroundColor: '#fefdfd',
                                    },
                                    exportFileName: 'Customers',
                                    // filtering: true
                                }}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: 'No customers to display',
                                    },
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination2,
                                }}
                                onSelectionChange={handleSelectionChange}
                            />
                        </MuiThemeProvider>
                    </div>
                )}
            </div>
            <CustomerFilter
                showUpdate={showUpdate}
                setShowUpdate={setShowUpdate}
                cust={cust}
                setCust={setCust}
                setExtraColumns={setExtraColumns}
                custData={custData}
                setIsFiltering={setIsFiltering}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    customers: state.customer.customers,
    isCustomersLoaded: state.customer.isCustomersLoaded,
    meta: state.customer.meta,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { getCustomers, getPaginatedCustomers })(CustomerSearch);
