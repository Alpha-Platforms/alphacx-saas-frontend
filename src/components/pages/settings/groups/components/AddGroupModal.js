import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import { httpPostMain } from "../../../../../helpers/httpMethods";
import {connect} from 'react-redux';
import {getGroups, updateGroup} from '../../../../../reduxstore/actions/groupActions';
import RSelect from 'react-select';
import "../../../../../styles/ModalCustomStyle.css";

const RSelectStyles = {
  // menu: (provided, state) => ({
  //   ...provided,
  //   width: state.selectProps.width,
  //   borderBottom: '1px dotted green',
  //   color: state.selectProps.menuColor,
  //   padding: 20,
  // }),

  control: (_, { selectProps: { width }}) => ({
    width: width
  })
}


const AddGroupModal = ({
  addGroupModalShow,
  setAddGroupModalShow,
  isEditing,
  categories,
  groups,
  groupId,
  getGroups,
  updateGroup
}) => {
  //create user modal
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    categoryIds: []
  });

  const [RSCategories, setRSCategories] = useState([])
  const [RSCategoriesSelected, setRSCategoriesSelected] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryIds") {
      setNewTeam({ ...newTeam, [name]: [value] });
    } else {
      setNewTeam({ ...newTeam, [name]: value });
    }
    
  };

  const loadRSCategoryOptions = () => {
    const mappedTeams = categories.map(item => {
        return {label: item.name, value: item.id}            
    })
    setRSCategories(mappedTeams)
  }

  const handleModalRSInput = (values, {name}) => {

    //WHEN FEMI'S UPDATE TO SELECT MULTI IS DONE
    // const selectedTeams = values.map(item => item.value)
    // setRSCategoriesSelected(prev => ({
    //     ...prev,
    //     [name]: selectedTeams
    // }));

    // FOR NOW
    const {value} = values;
    setNewTeam({ ...newTeam, [name]: [value] });
  }

  // add new team
  const submitNewTeam = async () => {

    // console.clear()
    // console.log(newTeam)
    // return null

    const {name, description, categoryIds} = newTeam;

    if (!name || categoryIds.length === 0) {
      return NotificationManager.error('All fields are required', 'Opps!');
    }

    setCreating(true);
    const res = await httpPostMain("groups", newTeam);
    setCreating(false);
    if (res.status === "success" || res.status === "Success") {
      setAddGroupModalShow(false);
      getGroups();
      NotificationManager.success('Team created successfully', "Success", 4000);
    } else {
      console.error(res);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // update a team
  const updateTeam = () => {
    const {name, description, categoryIds} = newTeam;
    if (!name || categoryIds.length === 0) {
      return NotificationManager.error('All fields are required', 'Opps!');
    }

    setEditing(true);
    updateGroup(groupId, newTeam, () => {
      NotificationManager.success('Team updated successfully', 'Success');
      setEditing(false);
      setAddGroupModalShow(false);
      getGroups();
    }, () => {
      NotificationManager.error('Something', 'Opps!');
      setEditing(false);
    });
  }

  const handleModalHide = () => {
    setAddGroupModalShow(false);
  }

  useEffect(() => {
    if (isEditing) {
      if (groupId) {
        const currentGroup = groups.find(x => x.id === groupId);
        if (currentGroup) {
          const {name, description, category_id} = currentGroup;
          // fill fields
          setNewTeam(prev => ({
            ...prev,
            name,
            description,
            categoryIds: category_id
          }));
        }
      }
    } else {
      // fill fields
      setNewTeam(prev => ({
        ...prev,
        name: '',
        description: '',
        categoryIds: []
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addGroupModalShow])

  return (
    <Modal
      // show={addGroupModalShow}
      // onHide={() => setAddGroupModalShow(false)}
      classNames={{
        overlay: 'acx-overlay',
        modal: 'acx-modal'
      }}
      open={addGroupModalShow}
      onClose={handleModalHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Body> */}
      <div className="saveTicketWrapModal p-4 pb-1 mb-0">
        <div className="col-12 pb-4">
          {/* <h6 className="fw-bold">Create A Team</h6> */}
          <p className="fs-5 mb-3">{isEditing ? 'Edit' : 'Create'} a Team</p>
          <form action="">
            <div className="col-12 mt-3">
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
              </div>

              <div className="col-12 mt-3">
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
              </div>

              <div className="col-12 mt-3">
                <label className="form-label mt-2" htmlFor="groupDesc">
                  Ticket Category
                </label>
                <RSelect className="rselectfield"
                  style={{ fontSize: "12px" }}
                  onMenuOpen={loadRSCategoryOptions}
                  isClearable={false}
                  isDisabled={false}
                  isLoading={false}
                  placeholder="Select categories"
                  name="categoryIds"
                  isMulti={false}
                  onChange={handleModalRSInput}
                  options={RSCategories}
                  // styles={RSelectStyles}
                  width="500"
              />
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn bg-at-blue-light px-4 mt-3"
                  disabled={editing || creating}
                  onClick={isEditing ? updateTeam : submitNewTeam}
                >
                  {(isEditing && editing) ? 'Editing...' : (isEditing && !editing) ? 'Edit' : (!isEditing & creating) ? 'Creating...' : 'Create'}
                </button>
              </div>
          </form>
        </div>
      {/* </Modal.Body> */}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.categories,
  groups: state.group.groups
})

export default connect(mapStateToProps, {getGroups, updateGroup})(AddGroupModal);
