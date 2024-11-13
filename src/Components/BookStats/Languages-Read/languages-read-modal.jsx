import React from "react";
import { Modal } from "react-bootstrap";

const LanguagesReadModal = (props) => {
  const {
    openModalForLanguagesRead,
    setOpenModalForLanguagesRead,
    bookLanguageReadStats,
  } = props;

  return (
    <div>
      <Modal
        show={openModalForLanguagesRead}
        onClick={() => setOpenModalForLanguagesRead(false)}
      >
        <Modal.Header closeButton={true} className="modal-container extra">
          <h4 className="modal-hd">Books Read in different Languages</h4>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <p>
            <b>Your child 🌟 unlocked below books in different languages!🌎</b>
          </p>
          <table className="stats-table-container">
            <thead>
              <tr>
                <th className="td-style">Language</th>
              </tr>
            </thead>
            <tbody>
              {bookLanguageReadStats?.languageDetails?.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="td-style">{row?.language}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="modal-container">
          <button
            onClick={() => setOpenModalForLanguagesRead(false)}
            className="btn btn-white-pro mt-3 mt-sm-4"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LanguagesReadModal;
