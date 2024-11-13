import React from "react";
import "./style.css";

const ModalBtn = (props) => {
  const {
    isModalBtnsClick,
    setIsModalBtnsClick,
    selectedButton,
    setSelectedButton,
    setTransaltionResultText,
    zoomIn,
    zoomOut,
    isFullScreenOpenBefore,
    toggleFullScreen,
    setWordCheckModal,
    setIsFullScreenOpenBefore,
    toggleTwoPageView,
    twoPageView,
  } = props;
  
  return (
    <>
      {!isModalBtnsClick && (
        <div className="meaning-language-btn-wrap">
          <button
            className={`meaning-btn ${
              selectedButton === "dictionary" && "font-weight-bold"
            }`}
            onClick={() => {
              setSelectedButton("dictionary");
              setTransaltionResultText("");
              setIsModalBtnsClick(true);
            }}
          >
            Dictionary
          </button>
          <button
            className={`language-btn ${
              selectedButton === "language" && "font-weight-bold"
            }`}
            onClick={() => {
              setSelectedButton("language");
              setTransaltionResultText("");
              setIsModalBtnsClick(true);
            }}
          >
            Language
          </button>
          <button
            className={`language-btn ${
              selectedButton === "zoomIn" && "font-weight-bold"
            }`}
            onClick={() => {
              zoomIn();
              setSelectedButton("zoomIn");
            }}
          >
            Zoom In
          </button>
          <button
            className={`language-btn ${
              selectedButton === "zoomOut" && "font-weight-bold"
            } `}
            onClick={() => {
              zoomOut();
              setSelectedButton("zoomOut");
            }}
          >
            Zoom Out
          </button>
          <button
            className={`language-btn`}
            onClick={() => {
              if (!isFullScreenOpenBefore) {
                toggleFullScreen();
                setWordCheckModal(false);
                setSelectedButton("fullScreen");
              } else {
                setWordCheckModal(false);
                setSelectedButton("ExitFullScreen");
                setIsFullScreenOpenBefore(false);
              }
            }}
            style={{ fontSize: isFullScreenOpenBefore ? "15px" : "" }}
          >
            {isFullScreenOpenBefore ? "Exit Full Screen" : "Full Screen"}
          </button>
          <button
            className={`language-btn `}
            onClick={() => {
              if (!isFullScreenOpenBefore) {
                toggleTwoPageView();
                setWordCheckModal(false);
              } else {
                toggleTwoPageView();
                setWordCheckModal(false);
                toggleFullScreen();
              }
            }}
          >
            {twoPageView ? "1 Page View" : "2 Page View"}
          </button>
          <button
            className={`language-btn ${
              selectedButton === "AddPdf" && "font-weight-bold"
            }`}
            onClick={() => {
              setIsModalBtnsClick(true);
              setSelectedButton("AddPdf");
            }}
          >
            Add Pdf Url
          </button>
          <button
            className={`language-btn ${
              selectedButton === "EnglishAudio" && "font-weight-bold"
            }`}
            onClick={() => {
              setIsModalBtnsClick(true);
              setSelectedButton("EnglishAudio");
            }}
          >
            Audio
          </button>
        </div>
      )}
    </>
  );
};
export default ModalBtn;
