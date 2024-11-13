import React from "react";
import LanguagesReadModal from "./languages-read-modal";

const LanguagesRead = (props) => {
  const {
    handleValueCheck,
    language,
    animatedStats,
    openModalForLanguagesRead,
    setOpenModalForLanguagesRead,
    bookLanguageReadStats,
  } = props;

  return (
    <div>
      <div
        className="statBlock"
        onClick={() => handleValueCheck("languageReadCheck")}
      >
        <div className="icon">
          <img src={language} className="iconStyle" />
        </div>
        <div className="statName">
          <span className="subName">Languages</span>
          <span>Read</span>
        </div>
        <p className="statValue">{animatedStats.languagesRead}</p>
      </div>
      <LanguagesReadModal
        openModalForLanguagesRead={openModalForLanguagesRead}
        setOpenModalForLanguagesRead={setOpenModalForLanguagesRead}
        bookLanguageReadStats={bookLanguageReadStats}
      />
    </div>
  );
};

export default LanguagesRead;
