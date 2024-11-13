import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
const config = require("../../Helpers/config.json");

const BoyPower = (props) => {
  const {
    arrowDisableLeft,
    handleScroll,
    getCategoryBg,
    categories,
    getCategoryName,
    getStoryBookLanguages,
    setSelectedBook,
    arrowDisableRight,
    boyPower,
    setHoveredIndex2,
    hoveredIndex2,
  } = props;

  const [showRightArrowForBoyPower, setShowRightArrowForBoyPower] =
    useState(false);

  const boyPowerRef = useRef(null);
  const elementRef2 = useRef();

  useEffect(() => {
    const containerWidth = boyPowerRef?.current?.scrollWidth;
    const cardWidth = 336;
    const totalWidth = boyPower.length * cardWidth;
    setShowRightArrowForBoyPower(totalWidth > containerWidth);
  }, [boyPower]);

  return (
    <>
      <div className="continue-reading-container">
        <div className="reading-hd-container">
          <h3 className="continue-reading-hd">
            {boyPower?.length ? "Boys Power" : ""}
          </h3>
        </div>
        <div className="scroll-container" ref={boyPowerRef}>
          {!arrowDisableLeft?.second && (
            <div
              className="arrow left-arrow"
              onClick={() =>
                handleScroll("second", elementRef2.current, 10, 250, -10)
              }
            >
              <FaChevronLeft />
            </div>
          )}

          <div className={`all-cards`} ref={elementRef2}>
            {boyPower?.map((item, secondindex) => {
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
                        className={`highlighted-card-container `}
                        style={{
                          display: "block",
                          position: "absolute",
                          top:
                            hoveredIndex2 === 0
                              ? "-20px"
                              : hoveredIndex2 === boyPower.length - 1
                              ? "-20px"
                              : "-20px",
                          left:
                            hoveredIndex2 === 0
                              ? "0px"
                              : hoveredIndex2 === boyPower.length - 1
                              ? "-85px"
                              : "-20px",
                          zIndex: "+2",
                          transition: "all 0.2s ease-in-out",
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
          {!arrowDisableRight?.second && showRightArrowForBoyPower && (
            <div
              className="arrow right-arrow"
              onClick={() =>
                handleScroll("second", elementRef2.current, 10, 250, 10)
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

export default BoyPower;
