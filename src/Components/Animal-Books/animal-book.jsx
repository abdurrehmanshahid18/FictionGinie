import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
const config = require("../../Helpers/config.json");

const AnimalBooks = (props) => {
  const {
    arrowDisableLeft,
    handleScroll,
    getCategoryBg,
    categories,
    getCategoryName,
    getStoryBookLanguages,
    setSelectedBook,
    arrowDisableRight,
    animal,
  } = props;

  const [showRightArrowForAnimal, setShowRightArrowForAnimal] = useState(false);
  const [hoveredIndex3, setHoveredIndex3] = useState(null);

  const animalRef = useRef(null);
  const elementRef3 = useRef();

  useEffect(() => {
    const containerWidth = animalRef?.current?.scrollWidth;
    const cardWidth = 336;
    const totalWidth = animal?.length * cardWidth;
    setShowRightArrowForAnimal(totalWidth > containerWidth);
  }, [animal]);

  return (
    <>
      <div className="continue-reading-container">
        <div className="reading-hd-container">
          <h3 className="continue-reading-hd">
            {animal?.length ? "Animal" : ""}
          </h3>
        </div>
        <div className="scroll-container" ref={animalRef}>
          {!arrowDisableLeft?.third && (
            <div
              className="arrow left-arrow"
              onClick={() =>
                handleScroll("third", elementRef3.current, 10, 250, -10)
              }
            >
              <FaChevronLeft />
            </div>
          )}

          <div className={`all-cards`} ref={elementRef3}>
            {animal?.map((item, secondindex) => {
              return (
                <>
                  <div
                    className="card-container"
                    key={secondindex}
                    onMouseEnter={() => {
                      setHoveredIndex3(secondindex);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex3(null);
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
                    {hoveredIndex3 === secondindex && (
                      <div
                        className={`highlighted-card-container `}
                        style={{
                          display: "block",
                          position: "absolute",
                          top:
                            hoveredIndex3 === 0
                              ? "-20px"
                              : hoveredIndex3 === animal.length - 1
                              ? "-20px"
                              : "-20px",
                          left:
                            hoveredIndex3 === 0
                              ? "0px"
                              : hoveredIndex3 === animal.length - 1
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
          {!arrowDisableRight?.third && showRightArrowForAnimal && (
            <div
              className="arrow right-arrow"
              onClick={() =>
                handleScroll("third", elementRef3.current, 10, 250, 10)
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

export default AnimalBooks;
