import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
const config = require("../../Helpers/config.json");

const GirlPower = (props) => {
  const {
    arrowDisableLeft,
    handleScroll,
    getCategoryBg,
    categories,
    getCategoryName,
    getStoryBookLanguages,
    setSelectedBook,
    arrowDisableRight,
    girlPower,
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showRightArrowForGirlPowerData, setShowRightArrowForGirlPowerData] =
    useState(false);

  const girlPowerRef = useRef(null);
  const elementRef = useRef();

  useEffect(() => {
    const containerWidth = girlPowerRef?.current?.scrollWidth;
    const cardWidth = 336;
    const totalWidth = girlPower?.length * cardWidth;
    setShowRightArrowForGirlPowerData(totalWidth > containerWidth);
  }, [girlPower]);

  return (
    <>
      <div className="continue-reading-container">
        <div className="reading-hd-container">
          <h3 className="continue-reading-hd">
            {girlPower?.length ? "Girl Power" : ""}
          </h3>
        </div>
        <div className="scroll-container" ref={girlPowerRef}>
          {!arrowDisableLeft?.first && (
            <div
              className="arrow left-arrow"
              onClick={() =>
                handleScroll("first", elementRef.current, 10, 250, -10)
              }
            >
              <FaChevronLeft />
            </div>
          )}

          <div className={`all-cards`} ref={elementRef}>
            {girlPower?.map((item, index) => {
              return (
                <>
                  <div
                    className="card-container"
                    key={index}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
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

                    {hoveredIndex === index && (
                      <div
                        className={`highlighted-card-container `}
                        style={{
                          display: "block",
                          position: "absolute",
                          top:
                            hoveredIndex === 0
                              ? "-10px"
                              : hoveredIndex === girlPower.length - 1
                              ? "-10px"
                              : "-10px",
                          left:
                            hoveredIndex === 0
                              ? "0px"
                              : hoveredIndex === girlPower.length - 1
                              ? "-85px"
                              : "-30px",
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
          {!arrowDisableRight?.first && showRightArrowForGirlPowerData && (
            <div
              className="arrow right-arrow"
              onClick={() =>
                handleScroll("first", elementRef.current, 10, 250, 10)
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

export default GirlPower;
