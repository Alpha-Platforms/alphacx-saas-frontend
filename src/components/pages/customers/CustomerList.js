import {useState, useEffect} from 'react';
import {ReactComponent as UploadSvg} from '../../../assets/svgicons/Upload.svg';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../styles/Customer.css'
import {getCustomers, getPaginatedCustomers} from '../../../reduxstore/actions/customerActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import tableIcons from '../../../assets/materialicons/tableIcons';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import {ReactComponent as ProfileSvg} from '../../../assets/svgicons/Profile.svg';
import CreateCustomerModal from './CreateCustomerModal';
import {exportTable, getUserInitials} from '../../../helper';
import {Dropdown} from 'react-bootstrap';
import {ReactComponent as DotSvg} from '../../../assets/icons/dots.svg';
import SaveAlt from '@material-ui/icons/SaveAlt';
    

const CustomerList = ({isCustomersLoaded, customers, getCustomers, meta, getPaginatedCustomers}) => {
    const [createModalShow,
        setCreateModalShow] = useState(false);
    const [uploadModalShow,
        setUploadModalShow] = useState(false);
    const [custLoading,
        setCustLoading] = useState(false);
    const [changingRow, setChangingRow] = useState(false);
    const [customerId, setCustomerId] = useState('');
    let selectedRows = [];

        useEffect(() => {
            setCustLoading(!isCustomersLoaded);
            if (isCustomersLoaded) {
                setChangingRow(false);
            }
        }, [isCustomersLoaded]);

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

        function handleEditClick () {

            setCustomerId(this.customerId);
            setCreateModalShow(true);

        }

        
        const AlphacxMTPagination = props => {
            const {
                ActionsComponent,
                onChangePage,
                onChangeRowsPerPage,
                ...tablePaginationProps
            } = props;
            
            return (
            <TablePagination
                {...tablePaginationProps}
                rowsPerPageOptions={[10, 20, 30]}
                rowsPerPage={meta?.itemsPerPage || 10}
                count={Number(meta?.totalItems || 20)}
                page={(meta?.currentPage || 1) - 1}
                onPageChange={onChangePage}
                // when the number of rows per page changes
                onRowsPerPageChange={event => {
                            setChangingRow(true);
                            getPaginatedCustomers(event.target.value, 1);
                            }}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                        {...actionsComponentProps}
                        onChangePage={(event, newPage) => {
                            // fetch tickets with new current page
                            getPaginatedCustomers(meta.itemsPerPage, newPage + 1);
                            }}
                        onRowsPerPageChange={event => {
                            // fetch tickets with new rows per page
                            getPaginatedCustomers(event.target.value, meta.currentPage);
                        }}
                        />
                    );
                    }}
            />
        )}

        const tableColumns = [
            {
                title: 'Customer',
                field: 'contact',
                render: ({contact}) => (<div className="d-flex user-initials-sm">
                    <div
                        className={`user-initials ${contact.theme
                        ? contact.theme
                        : themes[Math.floor(Math.random() * 4)]}`}>{contact.avatar ? <img src={contact.avatar} className="cust-avatar" alt="" /> : getUserInitials(`${contact.firstname} ${contact.lastname}`)}</div>
                    <div className="ms-2 mt-1">
                        <Link to={`/customers/${contact.id}`} style={{ textTransform: 'capitalize' }}>{`${contact.firstname} ${contact.lastname}`}</Link>
                    </div>
                </div>)
            }, {
                title: 'Organisation',
                field: 'organisation'
            }, {
                title: 'Email Address',
                field: 'emailAddress'
            }, {
                title: 'Work Phone',
                field: 'workphone'
            }, {
                title: 'Tags',
                field: 'tags',
                width: '40%',
                // render: ({rowData}) => (<div className={"table-tags"}><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1 my-1">High Value</span><span className="badge rounded-pill acx-bg-blue-light-30 px-3 py-2 me-1 my-1">Billing</span><span className="badge rounded-pill acx-bg-red-30 px-3 py-2 me-1 my-1">Pharmaceuticals</span><span className="badge rounded-pill acx-bg-green-30 px-3 py-2 me-1 my-1">Active</span><span className="badge rounded-pill text-muted border px-2 py-1 my-1">+2</span></div>),
                render: (rowData) => (<div className={"table-tags"}>{ rowData.tags.length > 0 && rowData.tags.map((tag, idx) => {
                    console.log("tagsss: ", rowData.tags);
                    if (idx === 0) {
                        return <span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1 my-1">{tag}</span>;
                    } else if (idx === 1) {
                        return <span className="badge rounded-pill acx-bg-blue-light-30 px-3 py-2 me-1 my-1">{tag}</span>;
                    } else if (idx === 2) {
                        return <span className="badge rounded-pill acx-bg-red-30 px-3 py-2 me-1 my-1">{tag}</span>;
                    } else if (idx === 3) {
                        return <span className="badge rounded-pill acx-bg-green-30 px-3 py-2 me-1 my-1">{tag}</span>;
                    } else {
                        return '';
                    }
                }) }
                {rowData.tags.length > 4 && <span className="badge rounded-pill text-muted border px-2 py-1 my-1">+{rowData.tags.slice(4).length}</span>}</div>)
            }, {
                title: '',
                field: 'action',
                render: rowData => (<Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                                            <Dropdown.Toggle variant="transparent" size="sm">
                                                <span className="cust-table-dots"><DotSvg/></span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="1" onClick={handleEditClick.bind({customerId: rowData.contact.id})}><span className="black-text">Edit</span></Dropdown.Item>
                                                <Dropdown.Item eventKey="2"><span className="black-text">Delete</span></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>)
            }
        ];

        

        

        const handleCSVExport = () => {
            if (customers) {
                const data = selectedRows.length !== 0 ? selectedRows : customers.map(({firstname,
                    lastname,
                    title,
                    company,
                    email,
                    phone_number,
                    theme,
                    id,
                    avatar,
                    tags}) => ({
                    title: title ? title :`Mr.`,
                    contact: {firstname, lastname, theme, id, avatar},
                    organisation: company ? company : 'Gillete',
                    emailAddress: email,
                    workphone: phone_number,
                    tags: tags.join(' ')
                }));
                exportTable(tableColumns, data, 'csv', 'CustomerExport');
            }

        }

        const handlePDFExport = () => {
            if (customers) {
                const data = selectedRows.length !== 0 ? selectedRows : customers.map(({firstname,
                    lastname,
                    title,
                    company,
                    email,
                    phone_number,
                    theme,
                    id,
                    tags}) => ({
                    title: title ? title :`Mr.`,
                    contact: {firstname, lastname, theme, id},
                    organisation: company ? company : 'Gillete',
                    emailAddress: email,
                    workphone: phone_number,
                    tags: tags.join(' ')
                }));
                exportTable(tableColumns, data, 'pdf', 'CustomerExport');
            }
        }

        const handleSelectionChange = (rows) => {
            selectedRows = rows;
        }


        return (
            <div>
                {custLoading && <div className="cust-table-loader"><ScaleLoader loading={custLoading} color={"#006298"}/></div>}

                <div className="ticket-table-wrapper">

                    <div style={{ background: '#fefdfd' }}
                        className="d-flex justify-content-between flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 position-relative">

                        <div className="btn-toolbar mb-md-0 cust-table-btns-wrapper" style={{ zIndex: 2 }}>

                            <Dropdown id="cust-export-dropdown">
                                <Dropdown.Toggle id="export-dropdown" className="reset-btn-outline btn ticket-export-btn">
                                    <SaveAlt />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={handlePDFExport}>As PDF</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={handleCSVExport}>As CSV</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </div>

                    <div id="alphacxMTable" className="pb-5 acx-ticket-cust-table acx-cust-table fit-content" style={{ zIndex: 1 }}>
                    {(customers && !changingRow) && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {tableColumns}
                            data = {customers.map(({firstname,
                                lastname,
                                title,
                                company,
                                email,
                                phone_number,
                                theme,
                                id,
                                avatar,
                                tags}) => ({
                                title: title ? title :`Mr.`,
                                contact: {firstname, lastname, theme, id, avatar},
                                organisation: company ? company : '',
                                emailAddress: email,
                                workphone: phone_number,
                                tags: tags || []
                            }))
                            }
                            options = {{
                                search: true,
                                selection: true,
                                exportButton: false,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: (isCustomersLoaded && meta?.itemsPerPage) ? meta?.itemsPerPage : 10,
                                headerStyle: {
                                    backgroundColor: '#fefdfd'
                                },
                                exportFileName: 'Customers'
                                // filtering: true
                            }}
                            components={{ 
                                Pagination: AlphacxMTPagination
                            }}
                            localization={{ 
                                body: {
                                    emptyDataSourceMessage: 'No customers to display'
                                }
                             }}
                             actions={[
                            // {
                            //     position: "toolbarOnSelect",
                            //     icon: SaveAlt,
                            //     tooltip: "Export the selected rows!",
                            //     onClick: (e, rowData) => {
                            //         const fileName = "TestDate_Table";
                            //         const builder = new CsvBuilder(
                            //             fileName + ".csv"
                            //         );
                            //         builder
                            //             .setColumns(
                            //                 tableColumns.map(
                            //                     columnDef => columnDef.title
                            //                 )
                            //             )
                            //             .addRows(
                            //                 rowData.map(rowData =>
                            //                     tableColumns.map(
                            //                         columnDef => {
                            //                             console.log(columnDef, rowData);
                            //                             switch (columnDef.field) {
                            //                                 case 'contact':
                            //                                     return `${wordCapitalize(rowData.contact.firstname)} ${wordCapitalize(rowData.contact.lastname)}`
                            //                                 default:
                            //                                     return rowData[columnDef.field]
                            //                             }
                            //                             }
                            //                     )
                            //                 )
                            //             )
                            //             .exportFile();
                            //     },
                            // },
                        ]}
                        onSelectionChange={handleSelectionChange}
                        />
                    </MuiThemeProvider>}
                </div>
                </div>

               <CreateCustomerModal createModalShow={createModalShow} setCreateModalShow={setCreateModalShow} setChangingRow={setChangingRow} isEditing={true} customerId={customerId} />

                {/* Upload csv modal */}
                <Modal
                    show={uploadModalShow}
                    onHide={() => setUploadModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className="col-12 p-3">
                            <h5 className="mb-3">Import Customer</h5>
                            <form className="needs-validation" noValidate>
                                <div className="row g-3">

                                    <div className="col-12">
                                        <input type="file" className="" id="file-picker"/>
                                        <label
                                            htmlFor="file-picker"
                                            className="form-label w-100 file-picker text-at-blue border-0 py-4">
                                            <UploadSvg/>
                                            <h5>Upload a file</h5>
                                            <p className="text-muted">or drag and drop your CSV file here</p>
                                        </label>

                                    </div>

                                </div>

                                <button className="btn btn-sm bg-at-blue mt-1 mt-sm-3 float-end " type="submit">Save Changes</button>

                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

    const mapStateToProps = (state, ownProps) => ({customers: state.customer.customers, isCustomersLoaded: state.customer.isCustomersLoaded, meta: state.customer.meta})

    export default connect(mapStateToProps, {getCustomers, getPaginatedCustomers})(CustomerList);