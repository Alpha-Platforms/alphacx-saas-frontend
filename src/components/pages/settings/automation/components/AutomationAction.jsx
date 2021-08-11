import React, { useState, useEffect } from "react";
import EditorBox from "../../../../reusables/EditorBox";
import DeleteIcon from "../../../../../assets/icons/Delete.svg";
import AddIcon from "../../../../../assets/icons/add.svg";

const AutomationAction = ({
  newPolicy,
  setNewPolicy,
  availablePlaceholders,
  agreement,
  index,
}) => {
  const [message, setMessage] = useState(agreement.body || "");
  const [placeholder, setPlaceholder] = useState("");

  const addAction = () => {
    setNewPolicy({
      ...newPolicy,
      reminder: {
        ...newPolicy.reminder,
        agreements: [...newPolicy.reminder.agreements, {}],
      },
    });
  };

  const deleteAction = () => {
    let agreements = newPolicy.reminder.agreements;
    console.log(agreements);
    if (agreements.length === 1) {
      return;
    }
    agreements.splice(index - 1, 1);
    console.log("splice", agreements);
    // setNewPolicy({
    //   ...newPolicy,
    //   reminder: {
    //     ...newPolicy.reminder,
    //     agreements,
    //   },
    // });
  };

  const insertPlaceholder = (i) => {
    const shortCode = `{{${availablePlaceholders[i]}}}`;

    setMessage(message + " " + shortCode + " ");
    setPlaceholder(" " + shortCode + " ");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let agreements = newPolicy.reminder.agreements;
    agreements[index] = { ...agreements[index], [name]: value };
    setNewPolicy({ ...newPolicy, agreements });
    console.clear();
    console.log(agreements);
    // console.log(message);,
  };
  useEffect(() => {
    let agreements = newPolicy.reminder.agreements;
    agreements[index] = { ...agreements[index], body: message };
    setNewPolicy({ ...newPolicy, agreements });
    console.clear();
    console.log(message);
    console.log(agreements);
  }, [message]);
  return (
    <div className="card my-4 f-12">
      <div className="card-body border-0 p-3 automation-action">
        <div className="d-flex  flex-column assign">
          <label for="assign" className="mb-n1 me-4">
            Send
          </label>
          <br />
          <select
            className="form-select form-select-sm"
            id="assign"
            name="action"
            value={agreement?.action || ""}
            onChange={handleChange}
          >
            <option value="">Select action</option>
            <option value="email">Email</option>
            <option>Customer Care Group</option>
            <option>Customer Care Group3</option>
            <option>Customer Care Group4</option>
          </select>
        </div>
        <div className="customer-form-first mt-3 py-4 pr-5 d-flex align-items-center">
          <select
            className="form-select form-select-sm me-3"
            id="day2"
            name="day"
            value={agreement?.day}
            onChange={handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <label for="day" className="mb-n1 me-4">
            Days
          </label>

          <select
            className="form-select form-select-sm me-3"
            id="hour"
            name="hour"
            value={agreement?.hour}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <label for="hour" className="mb-n1 me-4">
            Hours
          </label>

          <select
            className="form-select form-select-sm me-3"
            id="mins"
            name="min"
            value={agreement?.min}
            onChange={handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <label for="minute" className="mb-n1 me-4">
            Minutes
          </label>
          <label
            className="mb-n1"
            style={{
              minWidth: 120,

              fontSize: 16,
            }}
          >
            before due date
          </label>
        </div>
        <div className="form-group mt-3 mb-5">
          <label for="slaName" className="f-14 mb-1">
            Subject
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="slaName"
            name="subject"
            value={agreement?.subject || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3 mb-5">
          <label className="f-14 mb-1">Available Placeholders</label>
          <div className="available-placeholders">
            {availablePlaceholders.map((item, i) => (
              <p key={i} onClick={() => insertPlaceholder(i)}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="form-group mt-3">
          <label className="f-14 mb-1">Message</label>

          <EditorBox
            initialText={agreement}
            text={message || ""}
            // textParent={newPolicy}
            textFormat={"plain"}
            updateText={setMessage}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
          />
        </div>
      </div>
      <div className="card-footer bg-light" id="customer-choice">
        <a className="addNewResolution" onClick={addAction}>
          <img src={AddIcon} alt="" className="img-fluid me-1 mt-n5 " /> Add New
          Action
        </a>
        <a className="delete-resolution mx-4" onClick={deleteAction}>
          <img src={DeleteIcon} alt="" className="img-fluid me-1 mt-n5 " />{" "}
          Delete Action
        </a>
      </div>
    </div>
  );
};

export default AutomationAction;
