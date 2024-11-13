import React from "react";
import { Modal } from "react-bootstrap";

const VocabularyCheckModal = (props) => {
  const {
    openModalForVocabulary,
    setOpenModalForVocabulary,
    wordsLookUpStats,
  } = props;

  return (
    <>
      <Modal
        show={openModalForVocabulary}
        onClick={() => setOpenModalForVocabulary(false)}
      >
        <Modal.Header closeButton={true} className="modal-container extra">
          <h4 className="modal-hd">Vocabulary Stats</h4>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <p>
            <b>Your child 🌟 searched below words in dictionary 📚</b>
          </p>
          <table className="stats-table-container">
            <thead>
              <tr>
                <th className="td-style">Words</th>
              </tr>
            </thead>
            <tbody>
              {wordsLookUpStats?.wordDetails?.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="td-style">{row?.word}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="modal-container">
          <button
            onClick={() => setOpenModalForVocabulary(false)}
            className="btn btn-white-pro mt-3 mt-sm-4"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VocabularyCheckModal;
