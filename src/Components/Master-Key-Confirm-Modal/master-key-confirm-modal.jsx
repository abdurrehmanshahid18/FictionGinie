import React from "react";
import { Modal } from "react-bootstrap";

const MasterKeyConfirmModal = (props) => {
  const {
    showConfirmationModal,
    handleCloseConfirmationModal,
    enableUserCodeFunction,
    setShowConfirmationModal,
  } = props;

  return (
    <>
      <Modal
        show={showConfirmationModal}
        onHide={() => handleCloseConfirmationModal()}
        size="md"
        centered
      >
        <Modal.Body className="Modal">
          <div className="main-div">
            <h6 className="headings">
              Are You Sure You Want to remove account password!
            </h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="button-wrap">
            <button
              className="btn btn-cancel me-2 mt-0"
              onClick={() => {
                handleCloseConfirmationModal();
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-continue mt-0"
              onClick={() => {
                enableUserCodeFunction(false);
                setShowConfirmationModal(false);
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

export default MasterKeyConfirmModal;
