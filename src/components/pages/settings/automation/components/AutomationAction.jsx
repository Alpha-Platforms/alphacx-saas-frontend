import React from "react";
import EditorBox from "../../../../reusables/EditorBox";

const AutomationAction = ({
  newPolicy,
  setNewPolicy,
  availablePlaceholders,
  agreement,
}) => {
  return (
    <div className="card-body border-0 p-3">
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
          value={agreement?.day}
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
        />
      </div>
      <div className="form-group mt-3 mb-5">
        <label className="f-14 mb-1">Available Placeholders</label>
        <div className="available-placeholders">
          {availablePlaceholders.map((item, i) => (
            <p
              key={i}
              className={newPolicy?.placeholder === item ? "selected" : ""}
              onClick={() =>
                setNewPolicy({
                  ...newPolicy,
                  placeholder: item,
                })
              }
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="form-group mt-3">
        <label className="f-14 mb-1">Message</label>

        <EditorBox
          initialText={agreement}
          text={agreement?.body || ""}
          textParent={newPolicy}
          updateText={setNewPolicy}
        />
      </div>
    </div>
  );
};

export default AutomationAction;
