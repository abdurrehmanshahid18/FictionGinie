import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

const SelectAvatarModal = (props) => {
  const {
    openModalForImagePicker,
    handleClose,
    profileImages,
    selectedProfileImg,
    handleProfileImageClick,
    setOpenModalForImagePicker,
    UpdateProfile,
  } = props;
  return (
    <div>
      <Modal show={openModalForImagePicker} onHide={handleClose} size="md">
        <Modal.Header className="modal-profile extra" closeButton={true}>
          <div>
            <h4 className="mb-0">Select Avatar</h4>
          </div>
        </Modal.Header>
        <Modal.Body className="modal-profile">
          <div className="update-profile-image">
            <div className="top3-img-wrap-update">
              {profileImages?.map((imgSrc, index) => (
                <div
                  key={index}
                  className={`add-profile-img-wrap ${
                    selectedProfileImg === imgSrc ? "selected" : ""
                  }`}
                  onClick={() => handleProfileImageClick(imgSrc)}
                >
                  <img
                    className="add-profile-img"
                    src={imgSrc}
                    alt={`Profile ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-profile">
          <button
            onClick={() => setOpenModalForImagePicker(false)}
            className="btn btn-white-pro mt-3 mt-sm-4"
          >
            Cancel
          </button>

          <button
            onClick={() => UpdateProfile()}
            className="btn btn-green-pro mt-3 mt-sm-4"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectAvatarModal;
