import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {httpPostMain} from "../../../../../helpers/httpMethods";
import {NotificationManager} from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import {getCategories} from '../../../../../reduxstore/actions/categoryActions';
import {getSubCategories} from '../../../../../reduxstore/actions/subCategoryActions';

const NewCategoryTab = ({categories, meta, getCategories, getSubCategories, isCatLoading}) => {
    const [newCategory,
        setNewCategory] = useState({});
    const [policyLoading,
        setPolicyLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    // function to get the list of all ticket categories   const getTicketCategories
    // = async () => {     const res = await httpGetMain("categories");     if
    // (res?.status === "success") {       setCategories(res?.data?.categories);
    //   // getAgents();     } else {       return
    // NotificationManager.error(res?.er?.message, "Error", 4000);     }   };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCategory.categoryId && newCategory.categoryId !== "") {
            submitNewSubCategory();
        } else {
            submitNewCategory();
        }
    };

    //   function to create new category
    const submitNewCategory = async() => {
        setPolicyLoading(true);
        const body = {
            name: newCategory.name
        };
        const res = await httpPostMain("categories", body);
        setPolicyLoading(false);
        if (res
            ?.status === "success" || res
                ?.status === "Success") {
            setNewCategory({});
            NotificationManager.success(res.data.message, "Success", 4000);
            getCategories();
        } else {
            console.error(res.er);
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    };
    //   function to create new category
    const submitNewSubCategory = async() => {
        setPolicyLoading(true);
        const res = await httpPostMain("sub-categories", newCategory);
        setPolicyLoading(false);
        if (res
            ?.status === "success" || res
                ?.status === "Success") {
            setNewCategory({});
            NotificationManager.success(res.data.message, "Success", 4000);
            getCategories();
        } else {
            console.error(res.er);
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    };

    useEffect(() => {
        // getTicketCategories();
    }, []);

    return (
        <div className="ticket-cat-tab">
            {(policyLoading || isCatLoading) && (
                <div className={`cust-table-loader ${policyLoading && "add-loader-opacity"}`}>
                    <ScaleLoader loading={policyLoading} color={"#006298"}/>
                </div>
            )}
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
                                value={newCategory.name || ""}
                                onChange={handleChange}/>
                        </div>
                        {/* <div className="form-group mt-4 tl-col align-items-center">
                            <label className="f-14 d-inline" htmlFor="form-description">
                                Parent Category:
                            </label>
                            <select
                                name="parent-category"
                                id="parentCategory"
                                className="form-select"
                                aria-label="parent category"
                                name="categoryId"
                                value={newCategory.categoryId || ""}
                                onChange={handleChange}>
                                <option value="">Select parent category</option>
                                {categories.map((cat) => (
                                    <option value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div> */}
                        <div className="form-group mt-4 tl-col">
                            <label className="f-14 d-inline" htmlFor="form-description">
                                Description:
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control ct-description"></textarea>
                        </div>
                    </div>
                    <div className="my-3 mt-4 text-end">
                        <button
                            className="btn btn-sm bg-at-blue-light px-3"
                            disabled={newCategory.name === "" || !newCategory.name}>
                            Add New Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({categories: state.category.categories, meta: state.category.meta, isCatLoading: state.category.isCategoriesLoading});

export default connect(mapStateToProps, {getCategories, getSubCategories})(NewCategoryTab);