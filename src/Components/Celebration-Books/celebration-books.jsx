import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
const config = require("../../Helpers/config.json");

const CelebrationBooks = (props) => {
  const {
    arrowDisableLeft,
    handleScroll,
    getCategoryBg,
    categories,
    getCategoryName,
    getStoryBookLanguages,
    setSelectedBook,
    arrowDisableRight,
    celebration,
    setHoveredIndex2,
    hoveredIndex2,
    Bookdata,
  } = props;

  const [showRightArrowForCelebration, setShowRightArrowForCelebration] =
    useState(false);

  const celebrationRef = useRef(null);
  const elementRef4 = useRef();

  useEffect(() => {
    const containerWidth = celebrationRef?.current?.scrollWidth;
    const cardWidth = 336;
    const totalWidth = celebration?.length * cardWidth;
    setShowRightArrowForCelebration(totalWidth > containerWidth);
  }, [celebration]);

  return (
    <>
      <div className="continue-reading-container">
        <div className="reading-hd-container">
          <h3 className="continue-reading-hd">
            {celebration?.length ? "Celebration" : ""}
          </h3>
        </div>
        <div className="scroll-container" ref={celebrationRef}>
          {!arrowDisableLeft?.four && (
            <div
              className="arrow left-arrow"
              onClick={() =>
                handleScroll("four", elementRef4.current, 10, 250, -10)
              }
            >
              <FaChevronLeft />
            </div>
          )}

          <div className={`all-cards`} ref={elementRef4}>
            {celebration?.map((item, secondindex) => {
              return (
                <>
                  <div
                    className="card-container"
                    key={secondindex}
                    onMouseEnter={() => {
                      setHoveredIndex2(secondindex);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex2(null);
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
                    <p className="dashboard-img-hd">{/* {item?.title} */}</p>
                    {hoveredIndex2 === secondindex && (
                      <div
                        className={`highlighted-card-container`}
                        style={{
                          display: "block",
                          position: "absolute",
                          top:
                            hoveredIndex2 === 0
                              ? "-20px"
                              : hoveredIndex2 === Bookdata.length - 1
                              ? "-20px"
                              : "-20px",
                          left:
                            hoveredIndex2 === 0
                              ? "0px"
                              : hoveredIndex2 === Bookdata.length - 1
                              ? "-85px"
                              : "-20px",
                          zIndex: "+4",
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

          {!arrowDisableRight?.four && showRightArrowForCelebration && (
            <div
              className="arrow right-arrow"
              onClick={() =>
                handleScroll("four", elementRef4.current, 10, 250, 10)
              }
            >
              <FaChevronRight />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CelebrationBooks;
