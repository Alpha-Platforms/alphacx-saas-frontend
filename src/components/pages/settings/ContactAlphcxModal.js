import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";
import { httpPostMain } from "../../../helpers/httpMethods";
// import "../../../../../styles/ModalCustomStyle.css";



const ContactAlphcxModal = ({
  contactSupportModalShow,
  setContactSupportModalShow,
  isEditing
}) => {
  //create user modal
  const [creating, setCreating] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    message: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };


  const handleModalHide = () => {
    setContactSupportModalShow(false);
  }


  // submit form - contact support
  const sendMessage = async () => {
    const {subject, message} = newMessage;

    if (!subject || !message) {
      return NotificationManager.error('All fields are required', 'Validation Error');
    }

    setCreating(true);
    // const res = await httpPostMain("", newMessage);

    // FOR TEST ONLY
    let res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({status: "success"})
      }, 2000);
    })
    console.log(newMessage)
    
    setCreating(false);

    if (res.status === "success" || res.status === "Success") {
      // setNewMessage({subject: "", message: ""});
      setContactSupportModalShow(false)
      NotificationManager.success('Message sent successfully', "Success", 4000);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };


  return (
    <Modal
      // show={contactSupportModalShow}
      // onHide={() => setContactSupportModalShow(false)}
      classNames={{
        overlay: 'acx-overlay',
        modal: 'acx-modal'
      }}
      open={contactSupportModalShow}
      onClose={handleModalHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Body> */}
      <div className="saveTicketWrapModal p-4 pb-1 mb-0">
        <div className="col-12 pb-4">
          {/* <h6 className="fw-bold">Create A Team</h6> */}
          <p className="fs-5 mb-3">Contact AlphaCX Support</p>
          <form action="">
            <div className="col-12 mt-3">
              <label className="form-label" htmlFor="groupName">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="form-control mb-2"
                name="subject"
                value={newMessage.subject || ""}
                onChange={handleChange}
              />
              </div>

              <div className="col-12 mt-3">

                <label className="form-label" htmlFor="groupDesc">
                  Message
                </label>

                <textarea
                  id="groupDesc"
                  className="form-control"
                  name="message"
                  value={newMessage.message || ""}
                  onChange={handleChange}
                ></textarea>
              </div>


              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn bg-at-blue-light px-4 mt-3"
                  disabled={creating}
                  onClick={sendMessage}
                >
                  {(creating) ? 'Sending...' : 'Send'}
                </button>
              </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};


export default ContactAlphcxModal;