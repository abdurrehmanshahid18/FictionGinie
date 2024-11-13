import React from "react";
import { Modal } from "react-bootstrap";

const AccountSecModal = (props) => {
  const {
    codeModal,
    setCodeModal,
    setCodeInput,
    handleKeyPress,
    handleModalContinue,
    item,
  } = props;
  
  return (
    <>
      <Modal show={codeModal} onHide={() => setCodeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hello, friend! 🤗</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="input-names">
              <br />
              🧞‍♂️ Genie wants to know your profile code? ✨🔐
            </p>
            <input
              className="reset-password-input"
              type="password"
              placeholder="Enter your profile code here"
              onChange={(e) => {
                setCodeInput(e.target.value);
              }}
              onKeyDown={(event) => handleKeyPress(event, item)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              className="btn btn-cancel me-2 mt-0"
              onClick={() => {
                setCodeModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-continue mt-0"
              onClick={() => {
                handleModalContinue(item);
              }}
            >
              Continue
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountSecModal;
