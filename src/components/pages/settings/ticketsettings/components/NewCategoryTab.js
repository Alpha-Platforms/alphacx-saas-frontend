import {useState} from "react";
import {connect} from "react-redux";
import {httpPostMain} from "../../../../../helpers/httpMethods";
import {NotificationManager} from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";

const NewCategoryTab = ({categories, meta}) => {
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

    const submitNewCategory = async(e) => {
        e.preventDefault();
        setPolicyLoading(true);
        const res = await httpPostMain("categories", newCategory);
        setPolicyLoading(false);
        if (res
            ?.status === "success" || res
                ?.status === "Success") {
            setNewCategory({});
            NotificationManager.success(res.data.message, "Success", 4000);
        } else {
            console.error(res.er);
            return NotificationManager.error(res
                ?.er
                    ?.message, "Error", 4000);
        }
    };

    return (
        <div className="ticket-cat-tab">
            {policyLoading && (
                <div className={`cust-table-loader ${policyLoading && "add-loader-opacity"}`}>
                    <ScaleLoader loading={policyLoading} color={"#006298"}/>
                </div>
            )}
            <div className="w-75">
                <form className="tl-form" onSubmit={submitNewCategory}>
                    <div>
                        <div class="form-group mt-3 tl-col align-items-center">
                            <label class="f-14 d-inline" htmlFor="form-description">
                                Category:
                            </label>
                            <input
                                type="text"
                                class="form-control form-control"
                                id="category"
                                name="name"
                                value={newCategory.name || ""}
                                onChange={handleChange}/>
                        </div>
                        <div class="form-group mt-4 tl-col align-items-center">
                            <label class="f-14 d-inline" htmlFor="form-description">
                                Parent Category:
                            </label>
                            <select
                                name="parent-category"
                                id="parentCategory"
                                className="form-select"
                                aria-label="parent category">
                                <option selected></option>
                                <option value="cherry-picking">--</option>
                                <option value="efficient">--</option>
                            </select>
                        </div>
                        <div class="form-group mt-4 tl-col">
                            <label class="f-14 d-inline" htmlFor="form-description">
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

const mapStateToProps = (state, ownProps) => ({categories: state.category.categories, meta: state.category.meta});

export default connect(mapStateToProps, null)(NewCategoryTab);
