import React, {useState} from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import "./ArticleCategories.scss";
import {useEffect} from "react";
import {httpGetMain, httpPatchMain, httpPostMain} from "../../../../../helpers/httpMethods";
import {NotificationManager} from "react-notifications";
import {Link} from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Dropdown } from "react-bootstrap";
import { TablePagination } from "@material-ui/core";
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import { ReactComponent as DotSvg } from "../../../../../assets/icons/dots.svg";
import { textCapitalize } from './../../../../../helper';
import { Tabs, Tab } from "react-bootstrap";


const ArticleCategories = () => {
const [tabKey, setTabKey] = useState("category-form");

    const [policyLoading,
        setPolicyLoading] = useState(false);
    const [categories,
        setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');

    const [newCategory,
        setNewCategory] = useState({
            name: '',
            description: ''
        });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    //   function that fetches all available categories    that can be added to an
    // article
    const fetchCategories = async() => {
        setPolicyLoading(true);
        const res = await httpGetMain("articles/categories");
        setPolicyLoading(false);
        if (res
            ?.status === "success") {
            let categories = res
                ?.data;
            setCategories(categories);
        } else {
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    };

    const addNewCategory = async () => {
        setPolicyLoading(true);
        const res = await httpPostMain("articles/categories", newCategory);
        setPolicyLoading(false);
        if (res
            ?.status === "success") {
            console.log(res);
        } else {
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }

    }

    const editCategory = async id => {
        setPolicyLoading(true);
        const res = await httpPatchMain(`articles/categories/${id}`, newCategory);
        setPolicyLoading(false);
        if (res
            ?.status === "success") {
                setNewCategory(prev => ({
                    ...prev,
                    name: '',
                    description: ''
                }));
                setIsEditing(false);
                setTabKey('category-table');
                fetchCategories();
        } else {
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Creating category');
        if (isEditing) {
            editCategory(editId);
        } else {
            addNewCategory();
        }
    }


function AlphacxMTPagination2(props) {
    const {
        ActionsComponent,
        onChangePage,
        onChangeRowsPerPage,
        ...tablePaginationProps
    } = props;
    
    return (
        <TablePagination
        {...tablePaginationProps}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
            const { onPageChange, ...actionsComponentProps } = subprops;
            return (
            <ActionsComponent
                {...actionsComponentProps}
                onChangePage={onPageChange}
            />
            );
        }}
        />
    );
    }

const tableTheme = createTheme({
    palette: {
        primary: {
        main: "rgba(0, 98, 152)",
        },
        secondary: {
        main: "rgba(0, 98, 152)",
        },
    },
    });


    const handleCatEdit = cat => {
        setIsEditing(true);
        setTabKey('category-form');
        setNewCategory(prev => ({
            ...prev,
            name: cat.name,
            description: cat.description
        }));
        setEditId(cat.id);
    }

    const handleEditCancel = () => {
        setIsEditing(false);
        setTabKey('category-table');
        setNewCategory(prev => ({
            ...prev,
            name: '',
            description: ''
        }));
    }

    return (
        <div className=" settings-email help-center-settings">
            {policyLoading && (
                <div className={`cust-table-loader ${policyLoading && "add-loader-opacity"}`}>
                    <ScaleLoader loading={policyLoading} color={"#006298"}/>
                </div>
            )}
            <div className="card card-body bg-white border-0 p-5 mt-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/> {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <Link to="/settings/knowledge-base">
                            <span className="text-custom">Help Center</span>
                        </Link>
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/>
                        <span>Article Categories</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Article Categories</h5>
                </div>

                <div className="mt-4">
                <ul className="nav nav-pills" id="fieldTabsSelector" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link px-0 me-5 ${
                        tabKey === "category-form" && "active"
                        } text-muted`}
                        id="pills-customer-tab"
                        type="button"
                        role="tab"
                        onClick={() => setTabKey("category-form")}
                        aria-controls="customer-field-view"
                        aria-selected="true"
                    >
                        Category Form
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link px-0 me-5 ${
                        tabKey === "category-table" && "active"
                        } text-muted`}
                        id="pills-ticket-tab"
                        onClick={() => setTabKey("category-table")}
                        type="button"
                        role="tab"
                        aria-controls="ticket-categoriese-view"
                        aria-selected="false"
                    >
                        Categories
                    </button>
                    </li>
                </ul>
                </div>

                <div id="fieldTabsWrapper">
                {/* Ticket History Tab */}
                <Tabs
                    id="fieldTabs"
                    activeKey={tabKey}
                    onSelect={(k) => setTabKey(k)}
                    className="mb-3 ticket-settings-tabs"
                >
                    <Tab eventKey="category-form" className="">
                        <div className="w-75">
                            <form className="tl-form" onSubmit={handleSubmit}>
                                <div>
                                    <div className="form-group mt-3 tl-col align-items-center">
                                        <label className="f-14 d-inline" htmlFor="form-description">
                                            Category:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            id="category"
                                            name="name"
                                            value={newCategory.name}
                                            onChange={handleChange}/>
                                    </div>

                                    <div className="form-group mt-4 tl-col">
                                        <label className="f-14 d-inline" htmlFor="form-description">
                                            Description:
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={newCategory.description}
                                            onChange={handleChange}
                                            className="form-control ct-description"></textarea>
                                    </div>
                                </div>
                                <div className="my-3 mt-4 text-end">
                                    {isEditing && <button type="button" onClick={handleEditCancel}
                                        className="btn btn-sm btn-outline px-3 border me-3">
                                        Cancel
                                    </button>}
                                    <button
                                        className="btn btn-sm bg-at-blue-light px-3"
                                        disabled={newCategory.name === "" || !newCategory.name}>
                                        {isEditing ? 'Save Changes' : 'Add New Category'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Tab>

                    {/* Categories table Tab */}
                    <Tab eventKey="category-table" className="">
                        <div className="pt-5">
                            <div id="alphacxMTable" className="pb-2 acx-group-table acx-user-table-2 fit-content">
                                {categories && (
                                    <MuiThemeProvider theme={tableTheme}>
                                    <MaterialTable
                                        title=""
                                        icons={tableIcons}
                                        columns={[
                                        {
                                            title: "Category",
                                            field: "category",
                                            render: rowData => (<span>{textCapitalize(rowData.category)}</span>)
                                        },
                                        {
                                            title: "Description",
                                            field: "description",
                                            width: "20%",
                                        },
                                        {
                                            title: "Action",
                                            field: "action",
                                            render: (rowData) => (
                                            <Dropdown
                                                id="cust-table-dropdown"
                                                className="ticket-status-dropdown"
                                            >
                                                <Dropdown.Toggle variant="transparent" size="sm">
                                                <span className="cust-table-dots">
                                                    <DotSvg />
                                                </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                <Dropdown.Item eventKey="1" onClick={() => handleCatEdit({name: rowData.category, description: rowData.description, id: rowData.id})}>
                                                    <Link to="#">
                                                    <span className="black-text">Edit</span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="2">
                                                    <span className="black-text">Delete</span>
                                                </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            ),
                                        },
                                        ]}
                                        data={categories.map(({ id, name, description}) => ({
                                        category: name,
                                        description,
                                        id
                                        }))}
                                        options={{
                                        search: true,
                                        selection: false,
                                        // exportButton: true,
                                        tableLayout: "auto",
                                        paging: true,
                                        pageSize: 10,
                                        rowStyle: {
                                            backgroundColor: "#fff",
                                        },
                                        headerStyle: {
                                            backgroundColor: "#f8f9fa",
                                        },
                                        }}
                                        components={
                                        {
                                            Pagination: AlphacxMTPagination2
                                        }
                                        }
                                    />
                                    </MuiThemeProvider>
                                )}
                                </div>
                        </div>
                    </Tab>

                </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ArticleCategories;
