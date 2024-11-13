import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaBookReader } from "react-icons/fa";
const config = require("../../Helpers/config.json");

const ReadingProgress = (props) => {
  const {
    readingProgress,
    arrowDisableLeft,
    handleScroll,
    getCategoryBg,
    categories,
    getCategoryName,
    Bookdata,
    getStoryBookLanguages,
    setSelectedBook,
    arrowDisableRight,
  } = props;

  const [hoveredIndex0, setHoveredIndex0] = useState(null);
  const [hoverLeave, setHoverLeave] = useState(false);
  const [
    showRightArrowForReadingProgress,
    setShowRightArrowForReadingProgress,
  ] = useState(false);

  const readingProgressRef = useRef(null);
  const elementRefo = useRef();

  useEffect(() => {
    const containerWidth = readingProgressRef?.current?.scrollWidth;
    const cardWidth = 336;
    const totalWidth = readingProgress.length * cardWidth;
    setShowRightArrowForReadingProgress(totalWidth > containerWidth);
  }, [readingProgress]);

  return (
    <div>
      <div className="continue-reading-container">
        <div className="reading-hd-container">
          <h3 className="continue-reading-hd">Continue Reading</h3>
        </div>
        <div className="scroll-container" ref={readingProgressRef}>
          {!arrowDisableLeft?.initial && (
            <div
              className="arrow left-arrow"
              onClick={() =>
                handleScroll("initial", elementRefo.current, 10, 250, -10)
              }
            >
              <FaChevronLeft />
            </div>
          )}

          <div className={`all-cards`} ref={elementRefo}>
            {readingProgress?.map((item, index) => {
              return (
                <>
                  <div
                    className="card-container"
                    key={index}
                    onMouseEnter={() => {
                      setHoveredIndex0(index);
                      setHoverLeave(false);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex0(null);
                    }}
                  >
                    <div className="img-logo-container">
                      <p
                        className="img-logo"
                        style={{
                          background: getCategoryBg(
                            item?.category_id,
                            categories
                          ),
                        }}
                      >
                        {getCategoryName(item?.category_id, categories)}
                      </p>
                    </div>
                    <div className="book-cover">
                      <img
                        src={`${config["baseUrl"]}${item?.image}`}
                        alt=""
                        className="card-img"
                      />
                      <div className="book-spine"></div>
                    </div>
                    <ProgressBar
                      variant="warning"
                      now={item?.progress}
                      style={{ height: "8px", marginTop: "15px" }}
                    />
                    <p className="dashboard-img-hd">{/* {item?.title} */}</p>

                    {hoveredIndex0 === index && (
                      <div
                        className={`highlighted-card-container ${
                          hoverLeave === true ? "hover-leave" : ""
                        }`}
                        style={{
                          display: "block",
                          position: "absolute",
                          top:
                            hoveredIndex0 === 0
                              ? "-10px"
                              : hoveredIndex0 === Bookdata.length - 1
                              ? "-10px"
                              : "-10px",
                          left:
                            hoveredIndex0 === 0
                              ? "0px"
                              : hoveredIndex0 === Bookdata.length - 1
                              ? "-85px"
                              : "-30px",
                          zIndex: "+5",
                          transition: "all 0.1s ease-in-out",
                        }}
                        onClick={() => {
                          getStoryBookLanguages(item?.id);
                          setSelectedBook(item);
                        }}
                      >
                        <div className="img-logo-container">
                          <p
                            className="img-logo"
                            style={{
                              background: getCategoryBg(
                                item?.category_id,
                                categories
                              ),
                            }}
                          >
                            {getCategoryName(item?.category_id, categories)}
                          </p>
                        </div>
                        <div className="highlighted-book-cover">
                          <img
                            src={`${config["baseUrl"]}${item?.image}`}
                            alt=""
                            className="card-img"
                          />
                          <div className="book-spine"></div>
                        </div>
                        <div className="highlighted-book-content">
                          <div className="highlighted-icons">
                            <div className="highlighted-icons-flex-1">
                              <div
                                className="card-btn-icon-wrap"
                                onClick={() => {
                                  getStoryBookLanguages(item?.id);
                                  setSelectedBook(item);
                                }}
                              >
                                <div className="highlighted-icon">
                                  <FaBookReader
                                    style={{
                                      fontSize: "12px",
                                      color: "white",
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="card-read-now-btn">Read Now</p>
                                </div>
                              </div>
                            </div>
                            <div className="highlighted-icons-flex-2"></div>
                          </div>
                          <p className="highlighted-dashboard-img-hd">
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
          {!arrowDisableRight?.initial && showRightArrowForReadingProgress && (
            <div
              className="arrow right-arrow"
              onClick={() =>
                handleScroll("initial", elementRefo.current, 10, 250, 10)
              }
            >
              <FaChevronRight />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;
