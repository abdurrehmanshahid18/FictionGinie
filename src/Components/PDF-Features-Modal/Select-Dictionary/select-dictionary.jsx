import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const SelectDictionary = (props) => {
  const {
    isModalBtnsClick,
    selectedButton,
    userLanguage,
    handleSearchButton,
    searchInput,
    setSearchInput,
    handleKeyDown,
    dictionaryResultText,
    setIsModalBtnsClick,
    setDictionaryResultText,
    isLoading,
  } = props;

  return (
    <>
      {isModalBtnsClick && selectedButton === "dictionary" && (
        <>
          {userLanguage === "english" ? (
            <div className="modal-content-wrap">
              <div className="search-bar-wrap">
                <div className="search-icon-wrap">
                  <BiSearchAlt
                    className="search-icon"
                    onClick={handleSearchButton}
                  />
                </div>
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Enter Word"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value?.toString().trim());
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <h5 className="modal-content-hd">Dictionary:</h5>
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
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {dictionaryResultText}
                  </span>
                )}
              </p>
              <div className="back-link-wrap">
                <h5
                  onClick={() => {
                    setIsModalBtnsClick(false);
                    setDictionaryResultText(null);
                    setSearchInput(null);
                  }}
                  className="back-link"
                >
                  Back!
                </h5>
              </div>
            </div>
          ) : (
            <span
              style={{
                fontWeight: "600",
                color: "black",
                marginTop: "50px",
              }}
            >
              Feature is comming soon!
            </span>
          )}
        </>
      )}
    </>
  );
};
export default SelectDictionary;
