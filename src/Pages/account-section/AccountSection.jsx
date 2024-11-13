import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./accont-section.css";
import pageFlip from "../../sound/card-sounds4.wav";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordConfirmation from "../../Components/PasswordConfirmation/PasswordConfirmation";
import Logo from "../../Components/LogoComponent";
import { toast } from "react-toastify";
import AccountSecModal from "../../Components/Account-Section-Modal/account-sec-modal";
const config = require("../../Helpers/config.json");

const AccountSection = () => {
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [codeInput, setCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const admin = localStorage.getItem("enableUserCode")
    ? JSON.parse(localStorage.getItem("enableUserCode"))
    : "";

  const handleCardHover = (index) => {
    setHighlightedCard(index);
    const audio = new Audio(pageFlip);
    audio
      ?.play()
      .then(() => audio.play())
      .catch((error) => {
        console.error("Failed to play audio:", error);
      });
  };

  const handleCardLeave = () => {
    setHighlightedCard(null);
  };

  const responsive = {
    xdesktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 4,
      slidesToSlide: 4,
      minItems: 4,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1026 },
      items: 3,
      slidesToSlide: 3,
      minItems: 3,
    },
    tablet: {
      breakpoint: { max: 1026, min: 661 },
      items: 2,
      slidesToSlide: 2,
      minItems: 2,
    },
    mobile: {
      breakpoint: { max: 661, min: 0 },
      items: 1,
      slidesToSlide: 1,
      minItems: 1,
    },
  };

  const newData = localStorage.getItem("data");
  const formatData = JSON.parse(newData);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${config["baseUrl2"]}profile/listProfiles?userId=${formatData?.uid}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setData([...res?.profiles]);
          setImageUrl(`${config["baseUrl"]}${res?.profiles[0]?.image}`);
          setLoading(false);
        }
      });
  }, []);

  const getProfile = (item) => {
    setLoading(true);
    fetch(
      `${config["baseUrl2"]}profile/getProfile?profile_id=${item?.profile_id}&uid=${formatData?.uid}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          localStorage.setItem("token", res?.profile?.token);
          localStorage.setItem("name", res?.profile?.name);
          localStorage.setItem("id", res?.profile?.uid);
          localStorage.setItem("profile", res?.profile);
          localStorage.setItem("profileId", item?.profile_id);
          localStorage.setItem("image", res?.profile?.image);
          window.location.reload(true);
          window.location = "/dashboard";
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  function timeSince(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
      return parseInt(secondsPast) + " seconds ago";
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + " minutes ago";
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + " hours ago";
    }
    if (secondsPast > 86400) {
      const day = date.getDate();
      const month = date
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(" ", "");
      const year =
        date.getFullYear() === now.getFullYear()
          ? ""
          : " " + date.getFullYear();
      return day + " " + month + year;
    }
  }
  const checkAdmin = () => {
    if (admin === true) {
      setShowModal(true);
    } else {
      navigation("/add-profile");
    }
  };

  const handleCodeModal = (item) => {
    if (
      item?.code === "" ||
      item?.code === null ||
      item?.code === "Not Available"
    ) {
      setCodeModal(false);
      getProfile(item);
    } else if (item?.code) {
      setCodeModal(true);
    }
  };

  const handleKeyPress = (event, item) => {
    if (event.key === "Enter") {
      handleModalContinue(item);
    }
  };
  const handleModalContinue = (item) => {
    if (item.code === codeInput) {
      getProfile(item);
    } else {
      toast.error("Incorrect Password!", {
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
  };
  useEffect(() => {
    const authToken = localStorage.getItem("token");

    fetch(`${config["baseUrl2"]}auth/getUserInfo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ uid: formatData?.uid }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("userCode", res?.user?.user_code);
        localStorage.setItem(
          "enableUserCode",
          res?.user?.is_user_code == 1 || res?.user?.is_user_code ? true : false
        );
      });
  }, []);

  return (
    <div className="account-main-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div className="navbar-section">
        <Navbar key={"lg"} expand={"lg"} className="mb-3 nav-bars">
          <Container fluid className="navbar-wrapper">
            <Navbar.Brand href="#">
              {" "}
              <Logo width={"60px"} fontsize={"16px"} aifontsize={"12px"} />
            </Navbar.Brand>
            <Nav.Link
              className="link-opt"
              onClick={() => {
                localStorage.clear();
                window.location.reload(true);
                window.location.href = "/";
              }}
            >
              Logout
            </Nav.Link>
          </Container>
        </Navbar>
      </div>
      <div>
        <img src={donut_light} className="light-donut" />
      </div>
      <div>
        <img src={donut_dark} className="dark-donut" />
      </div>
      <div className="second-section">
        <p className="reading-text-today">Whose Reading Today?</p>
        <div className="accounts-wrapper">
          <div className="second-account-container">
            <Carousel
              keyBoardControl={true}
              arrows={true}
              showDots={false}
              customTransition="all .5"
              transitionDuration={500}
              responsive={responsive}
              containerclassName={`carousel-container account-carousel ${
                responsive?.xdesktop.minItems > data.length ? "empty-card" : ""
              }`}
            >
              {data.map((item, index) => {
                return (
                  <div
                    onClick={() => handleCodeModal(item)}
                    className={`account-card ${
                      highlightedCard === index ? "hightlighted-card" : ""
                    }`}
                    key={index}
                  >
                    {highlightedCard === index ? (
                      <div
                        className="hightlighted-content"
                        onMouseLeave={handleCardLeave}
                      >
                        <div className="highlight-account-image-container">
                          {item?.image ? (
                            <>
                              {index !== 0 ? (
                                <img
                                  src={`${
                                    config["baseUrl2Image"]
                                  }/resources/static/assets/uploads/profiles/${
                                    item?.image.split("/").pop().split(".")[0]
                                  }.png`}
                                  className="account-image"
                                />
                              ) : (
                                <img
                                  src={item.image}
                                  className="highlight-account-image account-image"
                                />
                              )}
                            </>
                          ) : (
                            <img
                              src={"https://placehold.co/400/png"}
                              alt="Account Image"
                              className="highlight-account-image"
                            />
                          )}
                        </div>
                        <h3 className="hightlight-text-head">
                          {data[highlightedCard].name}
                        </h3>
                        <p className="hightlight-text-card">
                          {data[highlightedCard].age
                            ? `${data[highlightedCard].age} year old`
                            : ""}
                        </p>
                        <p className="hightlight-text-card">
                          {" "}
                          {data[highlightedCard]?.user_last_login
                            ? `Last online  ${timeSince(
                                data[highlightedCard]?.profile_last_accessed
                              )}`
                            : ""}
                          {}
                        </p>
                        {
                          <AccountSecModal
                            codeModal={codeModal}
                            setCodeModal={setCodeModal}
                            setCodeInput={setCodeInput}
                            handleKeyPress={handleKeyPress}
                            handleModalContinue={handleModalContinue}
                            item={item}
                          />
                        }
                        <div className="btn-container-highlight">
                          <Button
                            variant="none"
                            className="hightight-btn"
                            onClick={() => handleCodeModal(item)}
                          >
                            Read Stories :)
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          onMouseEnter={() => handleCardHover(index)}
                          onMouseLeave={handleCardLeave}
                        >
                          {item?.image ? (
                            <>
                              {index !== 0 ? (
                                <img
                                  src={`${
                                    config["baseUrl2Image"]
                                  }/resources/static/assets/uploads/profiles/${
                                    item?.image.split("/").pop().split(".")[0]
                                  }.png`}
                                  className="account-image"
                                />
                              ) : (
                                <img
                                  src={item.image}
                                  className="account-image"
                                />
                              )}
                            </>
                          ) : (
                            <img
                              src={"https://placehold.co/400"}
                              alt="Account Image"
                              className="highlight-account-image"
                            />
                          )}
                        </div>
                        <h3 className="acoount-text">{item.name}</h3>
                      </>
                    )}
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="second-btn-container" onClick={() => checkAdmin()}>
        <NavLink variant="none" className="contact-btn add-another-child">
          add another child
        </NavLink>
      </div>
      {
        <PasswordConfirmation
          showModal={showModal}
          setShowModal={setShowModal}
          route={"/add-profile"}
        />
      }
    </div>
  );
};

export default AccountSection;
