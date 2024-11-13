import React, { useState } from "react";

const AddPdf = (props) => {
  const {
    isModalBtnsClick,
    setIsModalBtnsClick,
    selectedButton,
    setUserPdfUrl,
  } = props;

  const [getPdfUrl, setGetPdfUrl] = useState("");
  const handleChangePdf = () => {
    setUserPdfUrl(getPdfUrl);
  };

  return (
    <>
      {isModalBtnsClick && selectedButton === "AddPdf" && (
        <div className="modal-content-wrap">
          <div className="pdf-url-container">
            <div className="pdf-url-wrap">
              <h5 className="modal-content-hd">Enter Url:</h5>
              <input
                type="url"
                className="pdf-url-input"
                placeholder="Enter Pdf Url"
                value={getPdfUrl}
                onChange={(e) => {
                  setGetPdfUrl(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                className="language-btn change-pdf-btn"
                variant="primary"
                onClick={handleChangePdf}
              >
                Change Pdf
              </button>
            </div>
          </div>
          <div className="back-link-wrap">
            <h5
              onClick={() => {
                setIsModalBtnsClick(false);
              }}
              className="back-link"
            >
              Back!
            </h5>
          </div>
        </div>
      )}
    </>
  );
};
export default AddPdf;
