import { useState } from "react";
import { Modal } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import { httpPostMain } from "../../../../../helpers/httpMethods";

const AddGroupModal = ({
  addGroupModalShow,
  setAddGroupModalShow,
  newTeam,
  setNewTeam,
  category,
  isEditing
}) => {
  //create user modal
  const [policyLoading, setPolicyLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };
  const submitNewTeam = async () => {
    setPolicyLoading(true);
    const res = await httpPostMain("groups", newTeam);
    setPolicyLoading(false);
    if (res.status === "success" || res.status === "Success") {
      console.log(res);
      setAddGroupModalShow(false);
    } else {
      console.error(res);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  return (
    <Modal
      show={addGroupModalShow}
      onHide={() => setAddGroupModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="col-12 p-3">
          {policyLoading && (
            <div
              className={`cust-table-loader ${
                policyLoading && "add-loader-opacity"
              }`}
            >
              <ScaleLoader loading={policyLoading} color={"#006298"} />
            </div>
          )}
          <h6 className="fw-bold">Create A Team</h6>
          <form action="">
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="groupName">
                Team Name
              </label>
              <input
                type="text"
                id="groupName"
                className="form-control mb-2"
                name="name"
                value={newTeam.name || ""}
                onChange={handleChange}
              />

              <label className="form-label" htmlFor="groupDesc">
                Team Description
              </label>
              {/* <input
                type="text"
                id="groupDesc"
                className="form-control"
                name="description"
                value={newTeam.description || ""}
                onChange={handleChange}
              /> */}

              <textarea
                id="groupDesc"
                className="form-control"
                name="description"
                value={newTeam.description || ""}
                onChange={handleChange}
              ></textarea>

              <label className="form-label mt-2" htmlFor="groupDesc">
                Ticket Category
              </label>
              <select
                className="form-select form-select-sm"
                id="assign"
                name="categoryId"
                value={newTeam.categoryId || ""}
                onChange={handleChange}
              >
                <option value="email">Select category</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm bg-at-blue px-4 mt-3"
                  onClick={submitNewTeam}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddGroupModal;
