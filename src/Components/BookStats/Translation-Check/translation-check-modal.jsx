import React from "react";
import { Modal } from "react-bootstrap";

const TranslationCheckModal = (props) => {
  const {
    openModalForTranslation,
    translationData,
    setOpenModalForTranslation,
  } = props;

  return (
    <>
      <Modal
        size="md"
        show={openModalForTranslation}
        onClick={() => setOpenModalForTranslation(false)}
      >
        <Modal.Header closeButton={true} className="modal-container extra">
          <h4 className="modal-hd">Translation Stats</h4>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <p>
            <b>Your child 🌟 unlocked below words in different languages!🌎</b>
          </p>
          <table className="stats-table-container">
            <thead>
              <tr>
                <th className="td-style">Book</th>
                <th className="td-style">Word</th>
                <th className="td-style">Translated Language</th>
              </tr>
            </thead>
            <tbody>
              {translationData &&
                translationData?.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td className="td-style">{row?.title}</td>
                      <td className="td-style">{row?.sentence}</td>
                      <td className="td-style">
                        {row?.language === "en"
                          ? "English"
                          : row?.language === "fr"
                          ? "French"
                          : row?.language === "de"
                          ? "German"
                          : row?.language === "ur"
                          ? "Urdu"
                          : row?.language === "zh-CN"
                          ? "Chineese"
                          : row?.language === "hi"
                          ? "Hindi"
                          : row?.language}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="modal-container">
          <button
            onClick={() => setOpenModalForTranslation(false)}
            className="btn btn-white-pro mt-3 mt-sm-4"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TranslationCheckModal;
