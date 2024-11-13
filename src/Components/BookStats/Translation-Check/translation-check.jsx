import React from "react";
import TranslationCheckModal from "./translation-check-modal";

const TranslationCheck = (props) => {
  const {
    handleValueCheck,
    translatecheck,
    animatedStats,
    openModalForTranslation,
    setOpenModalForTranslation,
    translationData,
  } = props;

  return (
    <>
      <div
        className="statBlock"
        onClick={() => handleValueCheck("translationCheck")}
      >
        <div className="icon">
          <img src={translatecheck} className="iconStyle" />
        </div>
        <div className="statName">
          <span className="subName">Translation</span>
          <span>Check</span>
        </div>
        <p className="statValue">{animatedStats?.translationCheck}</p>
      </div>
      <TranslationCheckModal
        openModalForTranslation={openModalForTranslation}
        translationData={translationData}
        setOpenModalForTranslation={setOpenModalForTranslation}
      />
    </>
  );
};

export default TranslationCheck;
