import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Book from "../../../assets/book.png";
const config = require("../../../Helpers/config.json");

const BookReadStatsModal = (props) => {
  const { setOpenModalForBookReads, openModalForBooksReads, continueReadData } =
    props;

  return (
    <>
      <Modal
        show={openModalForBooksReads}
        onClick={() => setOpenModalForBookReads(false)}
      >
        <Modal.Header closeButton={true} className="modal-container">
          <h4 className="modal-hd">Books Read</h4>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <p>
            <b>Your child🌟read below books 📚</b>
          </p>
          <div className="book-listing">
            <table className="profile-books-read-wrap stats-table-container">
              <tbody>
                {continueReadData?.map((book, index) => (
                  <tr key={index} className="profile-book-img-text-wrap">
                    <td className="td-style">
                      <div
                        className={`img-container profile-book-img-container fade-in`}
                      >
                        <div className="dashboard-img-book-cover dashboard-img-book-cover-responsive profile-book-img">
                          <img
                            src={`${config["baseUrl"]}${book?.image}` || Book}
                            alt={book.title}
                            className="bookImage"
                          />
                          <div className="book-spine"></div>
                        </div>
                      </div>
                    </td>
                    <td className="td-style">
                      <div className="content-wrap me-5">
                        <span className="title">{book.title}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="profile-books-read-responsive">
              <tbody>
                {continueReadData?.map((book, index) => (
                  <div>
                    <tr key={index} className="profile-book-img-text-wrap">
                      <td>
                        <div
                          className={` img-container profile-book-img-container fade-in`}
                        >
                          <div className="dashboard-img-book-cover dashboard-img-book-cover-responsive profile-book-img">
                            <img
                              src={`${config["baseUrl"]}${book?.image}` || Book}
                              alt={book.title}
                              className="bookImage"
                            />
                            <div className="book-spine"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="content-wrap">
                          <span className="title">{book.title}</span>
                        </div>
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-container">
          <button
            onClick={() => setOpenModalForBookReads(false)}
            className="btn btn-white-pro mt-3 mt-sm-4"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookReadStatsModal;
