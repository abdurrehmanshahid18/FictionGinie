import React, { useState, useEffect } from "react";
import language from "../../assets/stats/language.png";
import translatecheck from "../../assets/stats/translatecheck.png";
import vocabCheck from "../../assets/stats/vocabCheck.png";
import "./style.css";
import BookReadStats from "./book-Read-Stats/book-read-stats";
import VocabularyCheck from "./vocabuary-Check/vocabulary-check";
import TranslationCheck from "./Translation-Check/translation-check";
import LanguagesRead from "./Languages-Read/languages-read";
const BookStats = (props) => {
  const {
    bookLanguageReadStats,
    bookReadStats,
    bookTranslationCheckedStats,
    wordsLookUpStats,
    continueReadData,
    allBookData,
  } = props;

  const [openModalForBooksReads, setOpenModalForBookReads] = useState(false);
  const [openModalForTranslation, setOpenModalForTranslation] = useState(false);
  const [openModalForVocabulary, setOpenModalForVocabulary] = useState(false);
  const [translationData, setTranslationData] = useState("");
  const [openModalForLanguagesRead, setOpenModalForLanguagesRead] =
    useState(false);

  const [animatedStats, setAnimatedStats] = useState({
    booksRead: 0,
    vocabularyCheck: 0,
    translationCheck: 0,
    languagesRead: 0,
    readingSpeed: 0,
    wordsRead: 0,
    booksListened: 0,
    genreRead: 0,
    questionsAsked: 0,
  });

  useEffect(() => {
    let matchingTransaltion;
    if (
      bookTranslationCheckedStats?.sentenceDetails?.length > 0 &&
      allBookData?.length > 0
    ) {
      matchingTransaltion = bookTranslationCheckedStats?.sentenceDetails?.map(
        (obj1) => {
          const matchingBook = allBookData.find(
            (obj2) => obj1.book_id === obj2.id
          );
          return { ...obj1, title: matchingBook ? matchingBook?.title : null };
        }
      );
      setTranslationData(matchingTransaltion);
    }
  }, [bookTranslationCheckedStats, allBookData]);
  
  useEffect(() => {
    const finalStats = {
      booksRead: bookReadStats || 0,
      vocabularyCheck: wordsLookUpStats?.wordDetails?.length || 0,
      translationCheck:
        bookTranslationCheckedStats?.sentenceDetails?.length || 0,
      languagesRead: bookLanguageReadStats?.languageDetails?.length || 0,
      readingSpeed: 43,
      wordsRead: 100,
      booksListened: 27,
      genreRead: 5,
      questionsAsked: 49,
    };

    const interval = setInterval(() => {
      setAnimatedStats((prevStats) => {
        const updatedStats = {};
        for (const stat in prevStats) {
          updatedStats[stat] = prevStats[stat] + 1;
          if (updatedStats[stat] >= finalStats[stat]) {
            updatedStats[stat] = finalStats[stat];
          }
        }
        return updatedStats;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [props]);

  const handleValueCheck = (type) => {
    if (type === "translationCheck") {
      if (bookTranslationCheckedStats?.sentenceDetails?.length) {
        setOpenModalForTranslation(true);
      }
    }
    if (type === "vocabularyCheck") {
      if (wordsLookUpStats?.wordDetails?.length) {
        setOpenModalForVocabulary(true);
      }
    }
    if (type === "languageReadCheck") {
      if (bookLanguageReadStats?.languageDetails?.length) {
        setOpenModalForLanguagesRead(true);
      }
    }
  };

  return (
    <div>
      <h4 className="Stats-heading stats-of-profile">Profile Stats</h4>
      Dive into delightful Profile Stats for a fun glimpse into your child's
      adventures! 📊 ✨
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <BookReadStats
          setOpenModalForBookReads={setOpenModalForBookReads}
          openModalForBooksReads={openModalForBooksReads}
          continueReadData={continueReadData}
          animatedStats={animatedStats}
        />
        <VocabularyCheck
          handleValueCheck={handleValueCheck}
          animatedStats={animatedStats}
          openModalForVocabulary={openModalForVocabulary}
          setOpenModalForVocabulary={setOpenModalForVocabulary}
          wordsLookUpStats={wordsLookUpStats}
          vocabCheck={vocabCheck}
        />
        <TranslationCheck
          handleValueCheck={handleValueCheck}
          translatecheck={translatecheck}
          animatedStats={animatedStats}
          openModalForTranslation={openModalForTranslation}
          setOpenModalForTranslation={setOpenModalForTranslation}
          translationData={translationData}
        />
        <LanguagesRead
          handleValueCheck={handleValueCheck}
          language={language}
          animatedStats={animatedStats}
          openModalForLanguagesRead={openModalForLanguagesRead}
          setOpenModalForLanguagesRead={setOpenModalForLanguagesRead}
          bookLanguageReadStats={bookLanguageReadStats}
        />
      </div>
    </div>
  );
};

export default BookStats;
