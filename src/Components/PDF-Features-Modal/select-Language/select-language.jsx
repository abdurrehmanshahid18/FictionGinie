import React from "react";

const SelectLanguage = (props) => {
  const {
    isModalBtnsClick,
    selectedButton,
    transaltionResultText,
    searchInput,
    isLoading,
    setIsModalBtnsClick,
    setSearchInput,
    setDictionaryResultText,
  } = props;

  return (
    <>
      {isModalBtnsClick &&
        selectedButton === "language" &&
        transaltionResultText && (
          <>
            <div className="modal-content-wrap">
              <div className="change-language-wrap">
                <p className="dictionary-text">
                  <span
                    style={{
                      fontWeight: "900",
                      textTransform: "capitalize",
                    }}
                  >
                    {searchInput ? <q>{searchInput}</q> : ""}
                  </span>
                  <br />
                  {isLoading ? (
                    <div className="loader-wrap">
                      <div className="loader translation" />
                    </div>
                  ) : (
                    transaltionResultText
                  )}
                </p>
              </div>
              <div className="back-link-wrap">
                <h5
                  onClick={() => {
                    setIsModalBtnsClick(false);
                    setSearchInput(null);
                    setDictionaryResultText(null);
                  }}
                  className="back-link"
                >
                  Back!
                </h5>
              </div>
            </div>
          </>
        )}
    </>
  );
};
export default SelectLanguage;
