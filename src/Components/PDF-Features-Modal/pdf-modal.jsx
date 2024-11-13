import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import Genie from "../../assets/accounts-section/Genie.png";
import Image from "react-bootstrap/Image";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { updateOrInsertwordLookup } from "../../Helpers/statsApiService";
import ModalBtn from "./modal-btns/modal-btn";
import AddPdf from "./Add-Pdf/add-pdf";
import LanguageBtns from "./Select-Language-Btn/language-btns";
import SelectDictionary from "./Select-Dictionary/select-dictionary";
import SelectLanguage from "./select-Language/select-language";
import EnglishAudio from "./English-Audio/english-audio";

const PdfFeaturesModal = (props) => {
  const {
    zoomIn,
    zoomOut,
    toggleTwoPageView,
    toggleFullScreen,
    twoPageView,
    setUserPdfUrl,
    setIsFullScreenOpenBefore,
    wordCheckModal,
    isFullScreenOpenBefore,
    setWordCheckModal,
    currentPageText,
    setCurrentPageText,
    pageNumber,
  } = props;

  const [selectedButton, setSelectedButton] = useState("");
  const [transaltionResultText, setTransaltionResultText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isModalBtnsClick, setIsModalBtnsClick] = useState(false);
  const [dictionaryResultText, setDictionaryResultText] = useState("");
  const userLanguage = "english";

  const languageCodeMap = {
    english: "en",
    french: "fr",
    chinese: "zh-CN",
    germany: "de",
    hindi: "hi",
    urdu: "ur",
  };

  useEffect(() => {
    if (props?.selectedText) {
      setSearchInput(props?.selectedText?.toString().trim());
    }
  }, [props?.selectedText]);

  const handleSearchButton = () => {
    if (!searchInput) {
      toast.error("Search Box is empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    searchDetail();
  };
  const searchDetail = () => {
    setIsLoading(true);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
      .then(function (response) {
        let text = "";
        response?.data[0]?.meanings[0].definitions?.map((def) => {
          text = text + def?.definition + "\n ";
          return 0;
        });

        updateOrInsertwordLookup(
          localStorage.getItem("id"),
          localStorage.profileId,
          props?.selectedBookId,
          searchInput,
          1,
          response?.data[0]?.meanings[0].definitions[0].definition
        );
        setDictionaryResultText(text);
        setIsLoading(false);
      })
      .catch(function (error) {
        setDictionaryResultText(
          error?.response?.data?.title
            ? error?.response?.data?.title
            : "Definition Not Found"
        );
        setIsLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchButton();
    }
  };

  return (
    <div>
      <Modal className="parent-modal-dashboard" show={wordCheckModal} size="sm">
        <Modal.Body className="word-check-modal-body">
          <div className="modal-body-main-container">
            <div
              className="cancel-btn-wrap"
              onClick={() => {
                setWordCheckModal(false);
                if (isFullScreenOpenBefore) {
                  toggleFullScreen();
                  setIsFullScreenOpenBefore(false);
                }
              }}
            >
              <RxCrossCircled className="cancel-btn" />
            </div>
            <div className=" word-check-genie-container">
              <div className="animated-image">
                <Image
                  src={Genie}
                  fluid
                  className="blurred-shadow word-check-genie"
                />
              </div>
            </div>
            <ModalBtn
              isModalBtnsClick={isModalBtnsClick}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              isFullScreenOpenBefore={isFullScreenOpenBefore}
              setIsFullScreenOpenBefore={setIsFullScreenOpenBefore}
              toggleFullScreen={toggleFullScreen}
              setWordCheckModal={setWordCheckModal}
              toggleTwoPageView={toggleTwoPageView}
              twoPageView={twoPageView}
              setTransaltionResultText={setTransaltionResultText}
              setIsModalBtnsClick={setIsModalBtnsClick}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
            />
            <AddPdf
              isModalBtnsClick={isModalBtnsClick}
              selectedButton={selectedButton}
              setUserPdfUrl={setUserPdfUrl}
              setIsModalBtnsClick={setIsModalBtnsClick}
            />
            <LanguageBtns
              setIsModalBtnsClick={setIsModalBtnsClick}
              isModalBtnsClick={isModalBtnsClick}
              selectedButton={selectedButton}
              transaltionResultText={transaltionResultText}
              userLanguage={userLanguage}
              handleSearchButton={handleSearchButton}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleKeyDown={handleKeyDown}
              languageCodeMap={languageCodeMap}
              setDictionaryResultText={setDictionaryResultText}
              setIsLoading={setIsLoading}
              setTransaltionResultText={setTransaltionResultText}
            />
            <SelectDictionary
              isModalBtnsClick={isModalBtnsClick}
              selectedButton={selectedButton}
              userLanguage={userLanguage}
              handleSearchButton={handleSearchButton}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleKeyDown={handleKeyDown}
              dictionaryResultText={dictionaryResultText}
              setIsModalBtnsClick={setIsModalBtnsClick}
              setDictionaryResultText={setDictionaryResultText}
              isLoading={isLoading}
            />
            <SelectLanguage
              isModalBtnsClick={isModalBtnsClick}
              selectedButton={selectedButton}
              transaltionResultText={transaltionResultText}
              searchInput={searchInput}
              isLoading={isLoading}
              setIsModalBtnsClick={setIsModalBtnsClick}
              setSearchInput={setSearchInput}
              setDictionaryResultText={setDictionaryResultText}
            />
            <EnglishAudio
              selectedButton={selectedButton}
              isModalBtnsClick={isModalBtnsClick}
              currentPageText={currentPageText}
              setIsModalBtnsClick={setIsModalBtnsClick}
              setCurrentPageText={setCurrentPageText}
              pageNumber={pageNumber}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PdfFeaturesModal;
