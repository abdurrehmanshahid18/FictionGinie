import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { updateOrInsertBookTranslationChecked } from "../../../Helpers/statsApiService";
const config = require("../../../Helpers/config.json");

const LanguageBtns = (props) => {
  const {
    isModalBtnsClick,
    selectedButton,
    transaltionResultText,
    userLanguage,
    handleSearchButton,
    searchInput,
    setSearchInput,
    handleKeyDown,
    languageCodeMap,
    setIsModalBtnsClick,
    setDictionaryResultText,
    setIsLoading,
    setTransaltionResultText,
  } = props;

  const handleTranslateButtonCLick = (languageCode) => {
    setIsLoading(true);
    setTransaltionResultText("...");
    axios
      .post(`${config["baseUrl3"]}/translate`, {
        text: searchInput,
        dest: languageCode,
      })
      .then(function (response) {
        setTransaltionResultText(response.data.translated_text);
        setIsLoading(false);
        updateOrInsertBookTranslationChecked(
          localStorage.getItem("id") || "",
          localStorage.getItem("profileId"),
          props?.bookData.id,
          1,
          languageCode,
          searchInput,
          response.data.translated_text
        );
      })
      .catch(function (error) {
        console.log(error);
        setTransaltionResultText("No translation available");
        setIsLoading(false);
      });
  };

  return (
    <>
      {isModalBtnsClick &&
        selectedButton === "language" &&
        !transaltionResultText && (
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
                <h5 className="modal-content-hd">Languages :</h5>
                <div className="languages-btn-container">
                  <div>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.english);
                      }}
                    >
                      English
                    </button>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.germany);
                      }}
                    >
                      German
                    </button>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.urdu);
                      }}
                    >
                      Urdu
                    </button>
                  </div>
                  <div>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.chinese);
                      }}
                    >
                      Chineese
                    </button>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.french);
                      }}
                    >
                      French
                    </button>
                    <button
                      className="all-languages-btn"
                      onClick={() => {
                        handleTranslateButtonCLick(languageCodeMap?.hindi);
                      }}
                    >
                      Hindi
                    </button>
                  </div>
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
export default LanguageBtns;
