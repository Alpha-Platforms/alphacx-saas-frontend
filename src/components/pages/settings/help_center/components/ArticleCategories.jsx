// @ts-nocheck
import React, {useState} from "react";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import "./ArticleCategories.scss";
import {useEffect} from "react";
import {httpGetMain, httpPatchMain, httpPostMain} from "../../../../../helpers/httpMethods";
import {NotificationManager} from "react-notifications";
import {Link} from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Tabs, Tab } from "react-bootstrap";
import ArticleCatTable from './ArticleCatTable';


const ArticleCategories = () => {
const [tabKey, setTabKey] = useState("category-table");

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
            if (!categories || categories?.length === 0) {
                setTabKey("category-form");
            } 
            setCategories(categories);
        } else {
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    };

    const createGeneralFolder = async (categoryId, categoryName) => {
        const newFolder = {
            name: `general-${categoryName}`,
            categoryId,
            description: "general folder"
          }
        const res = await httpPostMain("articles/folders", newFolder);
        setPolicyLoading(false);
        if (res?.status === "success") {
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

    const addNewCategory = async () => {
        setPolicyLoading(true);
        const res = await httpPostMain("articles/categories", newCategory);
        if (res
            ?.status === "success") {
                createGeneralFolder(res?.data?.id, res?.data?.name);
        } else {
            setPolicyLoading(false);
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
        if (isEditing) {
            editCategory(editId);
        } else {
            addNewCategory();
        }
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
                            <span className="text-custom">Knowledge Base</span>
                        </Link>
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/>
                        <span>Article Categories</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Article Categories</h5>
                </div>

                <div className="mt-0">
                <ul className="nav nav-pills" id="fieldTabsSelector" role="tablist">
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
                        {isEditing ? 'Edit Category' : 'New Category'}
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
                            <ArticleCatTable setIsEditing={setIsEditing} setTabKey={setTabKey} setNewCategory={setNewCategory} setEditId={setEditId} categories={categories} />
                        </div>
                    </Tab>

                </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ArticleCategories;
