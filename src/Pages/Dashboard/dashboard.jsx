import React, { useEffect, useState } from "react";
import Book1Img from "../../assets/dashboard/book3.jpg";
import DashboardNavbar from "../../Components/DashboardNavbar/DashbaordNavbar";
import donut_dark from "../../assets/dashboard/donut.png";
import donut_dark_bottom from "../../assets/dashboard/Donut-light-big.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardMenu from "../../Components/MenuBar/dashboardMenu";
import { updateOrInsertBookLanguageStats } from "../../Helpers/statsApiService";
import { toast } from "react-toastify";
import PasswordConfirmation from "../../Components/PasswordConfirmation/PasswordConfirmation";
import DashboardLangModal from "../../Components/Dashoard-Lang-Modal/dashboard-lang-modal";
import ReadingProgress from "../../Components/Reading-Progress-Books/reading-progress";
import GirlPower from "../../Components/Girl-Power-Books/girl-power";
import BoyPower from "../../Components/Boy-Power-Books/boy-power";
import AnimalBooks from "../../Components/Animal-Books/animal-book";
import CelebrationBooks from "../../Components/Celebration-Books/celebration-books";
import "./style.css";
const config = require("../../Helpers/config.json");

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [data, setdata] = useState([]);
  const [Bookdata, setBookdata] = useState([]);
  const [showLangOption, setShowLangOption] = useState(false);
  const [possiblelanguages, setPossiblelanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [discription, setDiscription] = useState("");
  const [hoveredIndex2, setHoveredIndex2] = useState(null);
  const [readingBook, setReadingBook] = useState([]);
  const [readingProgress, setReadingProgress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [girlPower, setGirlPower] = useState([]);
  const [boyPower, setBoyPower] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [celebration, setCelebration] = useState([]);

  const setDesktopViewport = () => {
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    viewportMetaTag.content = "width=1024";
  };

  useEffect(() => {
    setDesktopViewport();
    return () => {
      const viewportMetaTag = document.querySelector('meta[name="viewport"]');
      viewportMetaTag.content = "width=device-width, initial-scale=1.0";
    };
  }, []);

  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    fetch(`${config["baseUrl"]}/getcategories`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "fetched") {
          let temp = [];
          temp = res.data;
          setdata([...temp]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

  const newData = localStorage.getItem("data");
  const profileID = localStorage.getItem("profileId");
  const formatData = JSON.parse(newData);

  useEffect(() => {
    axios
      .get(
        `https://backend.stats.fictiongenie.com/api/stats/books/getBookReadingProgress/?userId=${formatData?.uid}&profileId=${profileID}`
      )
      .then((res) => {
        if (res && res.data && res.data.data) {
          setReadingBook(res.data.data);
        } else {
          console.error("Invalid response format:", res);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${config["baseUrl"]}/getbooks`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "fetched") {
          const matchingBooks = res.data.filter((book) => {
            const bookIds = readingBook?.map((item) => item?.book_id) || [];
            return bookIds.includes(book?.id);
          });
          const updatedMatchingBooks = matchingBooks.map((book) => {
            const matchingBook = readingBook.find(
              (item) => item?.book_id === book?.id
            );
            return {
              ...book,
              progress: matchingBook?.progress_percentage || 0,
            };
          });
          const nonMatchingBooks = res.data.filter((book) => {
            const bookIds = readingBook?.map((item) => item?.book_id) || [];
            return !bookIds.includes(book?.id);
          });
          const girlPower = res.data?.filter(
            (object) => object?.category_id === "35"
          );
          const boyPower = res.data?.filter(
            (object) => object?.category_id === "36"
          );
          const animal = res.data?.filter(
            (object) => object?.category_id === "31"
          );
          const Celebration = res.data?.filter(
            (object) => object?.category_id === "30"
          );
          localStorage.setItem(
            "continueReadData",
            JSON.stringify(updatedMatchingBooks)
          );
          setReadingProgress([...updatedMatchingBooks]);
          setBookdata([...nonMatchingBooks.slice(0, 9)]);
          setGirlPower(girlPower);
          setBoyPower(boyPower);
          setAnimal(animal);
          setCelebration(Celebration);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [readingBook]);

  const getStoryBookLanguages = async (id) => {
    axios
      .get(`${config["baseUrl"]}/getBookLanguages/${id}`)
      .then(({ data }) => {
        if (!!data.data.length) {
          setPossiblelanguages(data?.data);
          setShowLangOption(true);
        } else {
          toast.success("Story is coming soon.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigateToBook = (lang) => {
    navigate(`/book-detail?lang=${lang}`, {
      state: { SelectedBook: selectedBook },
    });
    updateOrInsertBookLanguageStats(
      localStorage.getItem("id"),
      localStorage.profileId,
      selectedBook.id,
      1,
      lang
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Bookdata.length);

        setFadeClass("fade-in");
      }, 100);
    }, 10000);

    return () => clearInterval(interval);
  }, [Bookdata]);

  useEffect(() => {
    const id = Bookdata[currentIndex];
    if (id?.id) {
      axios
        .get(`${config["baseUrl"]}/getbookscontent/${id?.id}`)
        .then(({ data: res }) => {
          if (res.message === "fetched") {
            const story = res?.data[0];
            const parser = new DOMParser();
            const doc = parser.parseFromString(story?.content, "text/html");
            const paragraphs = Array.from(doc.querySelectorAll("p")).map(
              (p) => p.textContent
            );
            const newPara = paragraphs.join("\n\n");
            const atIndex = newPara?.indexOf("@");
            const dataBeforeAt =
              atIndex !== -1
                ? newPara.substring(0, atIndex)
                : "Rise and shine, little explorer! As we greet this bright new day, I wonder, what exciting book shall we choose for today's incredible journey? Will it be a story of dazzling dragons, laughing animals, or maybe a space adventure? Let's pick and zoom off into a world of wonder and giggles!";
            setDiscription(dataBeforeAt);
          }
        });
    }
  }, [Bookdata, currentIndex]);

  const [arrowDisableLeft, setArrowDisableLeft] = useState({
    initial: true,
    first: true,
    second: true,
    third: true,
    four: true,
  });

  const [arrowDisableRight, setArrowDisableRight] = useState({
    initial: false,
    first: false,
    second: false,
    third: false,
    four: false,
  });

  const handleScroll = (category, element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);

      const isScrollAtEnd =
        element.scrollLeft + element.clientWidth >= element.scrollWidth;

      if (scrollAmount >= distance || isScrollAtEnd) {
        clearInterval(slideTimer);
      }

      setArrowDisableF(element.scrollLeft === 0, isScrollAtEnd, category);
    }, speed);
  };

  const setArrowDisableF = (isLeftDisabled, isRightDisabled, category) => {
    if (category === "initial") {
      setArrowDisableLeft((prevState) => ({
        ...prevState,
        initial: isLeftDisabled,
      }));
      setArrowDisableRight((prevState) => ({
        ...prevState,
        initial: isRightDisabled,
      }));
    } else if (category === "first") {
      setArrowDisableLeft((prevState) => ({
        ...prevState,
        first: isLeftDisabled,
      }));
      setArrowDisableRight((prevState) => ({
        ...prevState,
        first: isRightDisabled,
      }));
    } else if (category === "second") {
      setArrowDisableLeft((prevState) => ({
        ...prevState,
        second: isLeftDisabled,
      }));
      setArrowDisableRight((prevState) => ({
        ...prevState,
        second: isRightDisabled,
      }));
    } else if (category === "third") {
      setArrowDisableLeft((prevState) => ({
        ...prevState,
        third: isLeftDisabled,
      }));
      setArrowDisableRight((prevState) => ({
        ...prevState,
        third: isRightDisabled,
      }));
    } else if (category === "four") {
      setArrowDisableLeft((prevState) => ({
        ...prevState,
        four: isLeftDisabled,
      }));
      setArrowDisableRight((prevState) => ({
        ...prevState,
        four: isRightDisabled,
      }));
    }
  };

  const categories = [
    { id: 19, catName: "Fairy Tales", bg: "red" },
    { id: 29, catName: "Adventure", bg: "blue" },
    { id: 30, catName: "Celebrations", bg: "green" },
    { id: 31, catName: "Animals", bg: "red" },
    { id: 32, catName: "Science Discovery", bg: "blue" },
    { id: 33, catName: "Kindness", bg: "green" },
    { id: 34, catName: "Environment", bg: "red" },
    { id: 35, catName: "Girl Power", bg: "#f35a75" },
    { id: 36, catName: "Boy Power", bg: "#00cbff" },
  ];

  const getCategoryName = (categoryId, categories) => {
    const id = Number(categoryId);
    const matchedCategory = categories.find((category) => category.id === id);
    return matchedCategory ? matchedCategory.catName : "Unknown Category";
  };

  const getCategoryBg = (categoryId, categories) => {
    const id = Number(categoryId);
    const matchedCategory = categories.find((category) => category.id === id);
    return matchedCategory ? matchedCategory.bg : "red";
  };

  return (
    <div className="new-dashboard-wrapper">
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div className="dashbaord-donut-container">
        <img src={donut_dark} className="dashbaord-donut" />
      </div>
      <DashboardNavbar setShowModal={setShowModal} />
      <img src={donut_dark_bottom} className="dashbaord-donut-bottom" />
      <div className="content-wrrapers">
        <DashboardMenu setShowModal={setShowModal} />
        <div className="sub-content-wrrapers">
          <div className="cards-text-container">
            <div className="text-img-container">
              <div className="text-button-container">
                <div className="happy-hd-container">
                  <h1 className="happy-reading-hd">Happy Reading,</h1>
                  <h1 className="user-name">{localStorage.getItem("name")}</h1>
                </div>
                <div className="happy-text-container">
                  <p className="happy-text">{discription}</p>
                </div>
                <div
                  className="read-now-btn-container"
                  onClick={() => {
                    getStoryBookLanguages(Bookdata[currentIndex]?.id);
                    setSelectedBook(Bookdata[currentIndex]);
                  }}
                >
                  <button className="read-now-btn">Read Now</button>
                </div>
              </div>
              <div className={`img-container ${fadeClass}`}>
                <div className="dashboard-img-book-cover dashboard-img-book-cover-responsive">
                  <img
                    className="dashboard-img main-dashboard-img-responsive"
                    src={
                      Bookdata[currentIndex]?.image
                        ? `${config["baseUrl"]}${Bookdata[currentIndex]?.image}`
                        : Book1Img
                    }
                    alt=""
                  />
                  <div className="book-spine"></div>
                </div>

                <p className="dashboard-img-hd">
                  {Bookdata[currentIndex]?.title || ""}
                </p>
              </div>
              <div className="happy-text-container-responsive">
                <p className="happy-text-responsive">
                  Reading books is a enriching activity where individuals engage
                  with written content to gain knowledge, entertainment, and
                  insights. It fosters literacy, critical thinking, and
                  imagination, providing a means to explore diverse ideas,
                  perspectives, and experiences. Whether for education or
                  leisure, reading contributes to personal growth and enjoyment.
                </p>
              </div>
              <div className="read-now-btn-container-responsive">
                <button
                  className="read-now-btn-responsive"
                  onClick={() => {
                    getStoryBookLanguages(Bookdata[currentIndex]?.id);
                    setSelectedBook(Bookdata[currentIndex]);
                  }}
                >
                  Read Now
                </button>
              </div>
            </div>
            <div className="card-main-wraps">
              {readingProgress?.length ? (
                <ReadingProgress
                  readingProgress={readingProgress}
                  arrowDisableLeft={arrowDisableLeft}
                  handleScroll={handleScroll}
                  getCategoryBg={getCategoryBg}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  Bookdata={Bookdata}
                  getStoryBookLanguages={getStoryBookLanguages}
                  setSelectedBook={setSelectedBook}
                  arrowDisableRight={arrowDisableRight}
                />
              ) : (
                <></>
              )}
              {girlPower?.length ? (
                <GirlPower
                  arrowDisableLeft={arrowDisableLeft}
                  handleScroll={handleScroll}
                  getCategoryBg={getCategoryBg}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  getStoryBookLanguages={getStoryBookLanguages}
                  setSelectedBook={setSelectedBook}
                  arrowDisableRight={arrowDisableRight}
                  girlPower={girlPower}
                />
              ) : (
                <></>
              )}
              {boyPower?.length ? (
                <BoyPower
                  arrowDisableLeft={arrowDisableLeft}
                  handleScroll={handleScroll}
                  getCategoryBg={getCategoryBg}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  getStoryBookLanguages={getStoryBookLanguages}
                  setSelectedBook={setSelectedBook}
                  arrowDisableRight={arrowDisableRight}
                  boyPower={boyPower}
                  setHoveredIndex2={setHoveredIndex2}
                  hoveredIndex2={hoveredIndex2}
                />
              ) : (
                <></>
              )}
              {animal?.length ? (
                <AnimalBooks
                  arrowDisableLeft={arrowDisableLeft}
                  handleScroll={handleScroll}
                  getCategoryBg={getCategoryBg}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  getStoryBookLanguages={getStoryBookLanguages}
                  setSelectedBook={setSelectedBook}
                  arrowDisableRight={arrowDisableRight}
                  animal={animal}
                />
              ) : (
                <></>
              )}
              {celebration?.length ? (
                <CelebrationBooks
                  arrowDisableLeft={arrowDisableLeft}
                  handleScroll={handleScroll}
                  getCategoryBg={getCategoryBg}
                  categories={categories}
                  getCategoryName={getCategoryName}
                  getStoryBookLanguages={getStoryBookLanguages}
                  setSelectedBook={setSelectedBook}
                  arrowDisableRight={arrowDisableRight}
                  celebration={celebration}
                  setHoveredIndex2={setHoveredIndex2}
                  hoveredIndex2={hoveredIndex2}
                  Bookdata={Bookdata}
                />
              ) : (
                <></>
              )}

              {!(
                readingProgress?.length ||
                girlPower?.length ||
                boyPower?.length ||
                animal?.length ||
                celebration?.length
              ) ? (
                <p className="no-data-hd">No Books Found!</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        <DashboardLangModal
          showLangOption={showLangOption}
          setShowLangOption={setShowLangOption}
          possiblelanguages={possiblelanguages}
          navigateToBook={navigateToBook}
        />
      }
      {
        <PasswordConfirmation
          showModal={showModal}
          setShowModal={setShowModal}
          route={"/account"}
        />
      }
    </div>
  );
};

export default Dashboard;
