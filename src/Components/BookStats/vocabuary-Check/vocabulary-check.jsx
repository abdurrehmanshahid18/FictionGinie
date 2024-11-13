import React from "react";
import VocabularyCheckModal from "./vocabulary-check-modal";

const VocabularyCheck = (props) => {
  const {
    handleValueCheck,
    animatedStats,
    openModalForVocabulary,
    setOpenModalForVocabulary,
    wordsLookUpStats,
    vocabCheck,
  } = props;

  return (
    <div>
      <div
        className="statBlock"
        onClick={() => handleValueCheck("vocabularyCheck")}
      >
        <div className="icon">
          <img src={vocabCheck} className="iconStyle" />
        </div>
        <div className="statName">
          <span className="subName">Vocabulary</span>
          <span>Check</span>
        </div>
        <p className="statValue">{animatedStats.vocabularyCheck}</p>
      </div>
      <VocabularyCheckModal
        openModalForVocabulary={openModalForVocabulary}
        setOpenModalForVocabulary={setOpenModalForVocabulary}
        wordsLookUpStats={wordsLookUpStats}
      />
    </div>
  );
};

export default VocabularyCheck;
