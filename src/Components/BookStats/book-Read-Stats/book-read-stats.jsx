import React from "react";
import BookReadStatsModal from "./book-read-stats-modal";
import booksRead from "../../../assets/stats/booksRead.png";

const BookReadStats = (props) => {
  const {
    setOpenModalForBookReads,
    openModalForBooksReads,
    continueReadData,
    animatedStats,
  } = props;

  return (
    <div>
      <div className="statBlock" onClick={() => setOpenModalForBookReads(true)}>
        <div className="icon">
          <img src={booksRead} className="iconStyle" />
        </div>
        <div className="statName">
          <span className="subName">Books</span>
          <span>Read</span>
        </div>
        <p className="statValue">{animatedStats.booksRead}</p>
      </div>
      <BookReadStatsModal
        openModalForBooksReads={openModalForBooksReads}
        setOpenModalForBookReads={setOpenModalForBookReads}
        continueReadData={continueReadData}
      />
    </div>
  );
};

export default BookReadStats;
