import React, { useEffect, useState } from "react";
import "./add-profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import AddProfileimg1 from "../../assets/AddProfileImgs/A1.png";
import AddProfileimg2 from "../../assets/AddProfileImgs/A2.png";
import AddProfileimg3 from "../../assets/AddProfileImgs/A3.png";
import AddProfileimg4 from "../../assets/AddProfileImgs/A4.png";
import AddProfileimg5 from "../../assets/AddProfileImgs/A5.png";
import AddProfileimg6 from "../../assets/AddProfileImgs/A6.png";
import AddProfileimg7 from "../../assets/AddProfileImgs/A7.png";
import AddProfileimg8 from "../../assets/AddProfileImgs/A8.png";
import AddProfileimg9 from "../../assets/AddProfileImgs/A9.png";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const config = require("../../Helpers/config.json");

const AddNewProfile = () => {
  const [name, setname] = useState("");
  const [dob, setdob] = useState();
  const [gender, setGender] = useState("m");
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);
  const [isNext, setIsNext] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (value) => {
    setGender(value);
    setOpen(false);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 1100px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1100px)");

    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addListener(handleScreenChange);
    return () => {
      mediaQuery.removeListener(handleScreenChange);
    };
  }, []);

  const newData = localStorage.getItem("data");
  const formatData = JSON.parse(newData);
  const profileImages = [
    AddProfileimg1,
    AddProfileimg2,
    AddProfileimg3,
    AddProfileimg4,
    AddProfileimg5,
    AddProfileimg6,
    AddProfileimg7,
    AddProfileimg8,
    AddProfileimg9,
  ];

  const addProfile = () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }

    if (!gender) {
      toast.error("Gender is required");
      return;
    }

    if (!dob) {
      toast.error("Date of Birth is required");
      return;
    }

    if (!selectedProfileImg) {
      toast.error("Profile image is required");
      return;
    }
    setLoading(true);
    fetch(`${config["baseUrl2"]}profile/createProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: formatData?.uid,
        name: name,
        dob: dob,
        gender: gender,
        categories: "1",
        image: selectedProfileImg,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Profile has been created successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload(true);
          window.location = "/";
        } else {
          setLoading(false);
          toast.error(data.message, {
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
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleProfileImageClick = (imgSrc) => {
    setSelectedProfileImg(imgSrc);
  };

  return (
    <div className="login-main-container auth-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <Navbar />
      <div className="main-wrap">
        <div className="sub-wrap">
          <div className="add-profile-form">
            {!isNext && (
              <>
                <div className="login-heading">
                  <h2>Add Child Profile</h2>
                </div>
                <div className="custom-add-profile-form">
                  <input
                    className="form-control crediantal-fields"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setname(e.target.value)}
                  />
                  <DatePicker
                    style={{ color: "black" }}
                    value={dob}
                    className="form-control crediantal-fields date-input"
                    showIcon
                    selected={dob}
                    onChange={(date) => setdob(date)}
                    dateFormat="dd/MM/yyyy"
                    defaultValue={dayjs("2012-01-01", "YYYY-MM-DD")}
                  />
                  <div
                    id="header-user-profile"
                    onClick={() => setOpen(!open)}
                    className={
                      open
                        ? "active add-profile-menu-wrap"
                        : "add-profile-menu-wrap"
                    }
                  >
                    <input
                      type="text"
                      maxLength={0}
                      placeholder="Gender"
                      value={gender === "m" ? "male" : "female"}
                      readOnly
                      className="form-control crediantal-fields"
                      id="select-gender"
                    />
                    {open && (
                      <div
                        className="add-profile-select-gender"
                        id="header-user-profile-menu"
                      >
                        <ul>
                          <li onClick={() => handleSelect("m")}>
                            <span className="icon-User" />
                            Male
                          </li>
                          <li onClick={() => handleSelect("f")}>
                            <span className="icon-Favorite-Window" />
                            Female
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {isNext && (
              <div className="add-profile-image-responsive">
                <div className="avatar-hd-wrap">
                  <h4 className="avatar-hd">Select Avatar</h4>
                </div>
                <div className="all-avartar-wrap">
                  {profileImages.slice(0, 3).map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`add-profile-img-wrap ${
                        selectedProfileImg === imgSrc ? "selected" : ""
                      }`}
                      onClick={() => handleProfileImageClick(imgSrc)}
                    >
                      <img
                        className="add-profile-img"
                        src={imgSrc}
                        alt={`Profile ${index + 1}`}
                      />
                    </div>
                  ))}
                  {profileImages.slice(3, 6).map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`add-profile-img-wrap ${
                        selectedProfileImg === imgSrc ? "selected" : ""
                      }`}
                      onClick={() => handleProfileImageClick(imgSrc)}
                    >
                      <img
                        className="add-profile-img"
                        src={imgSrc}
                        alt={`Profile ${index + 1}`}
                      />
                    </div>
                  ))}
                  {profileImages.slice(6, 9).map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`add-profile-img-wrap ${
                        selectedProfileImg === imgSrc ? "selected" : ""
                      }`}
                      onClick={() => handleProfileImageClick(imgSrc)}
                    >
                      <img
                        className="add-profile-img"
                        src={imgSrc}
                        alt={`Profile ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isSmallScreen && !isNext ? (
              <div className="Btn-wrap">
                <button
                  className="Btn"
                  disabled={!(name && gender && dob)}
                  onClick={() => setIsNext(true)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="Btn-wrap">
                <button className="Btn" onClick={addProfile}>
                  Add Profile
                </button>
              </div>
            )}
          </div>
          <div className="add-profile-image">
            <div className="avatar-hd-wrap">
              <h4 className="avatar-hd">Select Avatar</h4>
            </div>
            <div className="top3-img-wrap">
              {profileImages.slice(0, 3).map((imgSrc, index) => (
                <div
                  key={index}
                  className={`add-profile-img-wrap ${
                    selectedProfileImg === imgSrc ? "selected" : ""
                  }`}
                  onClick={() => handleProfileImageClick(imgSrc)}
                >
                  <img
                    className="add-profile-img"
                    src={imgSrc}
                    alt={`Profile ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="top3-img-wrap">
              {profileImages.slice(3, 6).map((imgSrc, index) => (
                <div
                  key={index}
                  className={`add-profile-img-wrap ${
                    selectedProfileImg === imgSrc ? "selected" : ""
                  }`}
                  onClick={() => handleProfileImageClick(imgSrc)}
                >
                  <img
                    className="add-profile-img"
                    src={imgSrc}
                    alt={`Profile ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="top3-img-wrap">
              {profileImages.slice(6, 9).map((imgSrc, index) => (
                <div
                  key={index}
                  className={`add-profile-img-wrap ${
                    selectedProfileImg === imgSrc ? "selected" : ""
                  }`}
                  onClick={() => handleProfileImageClick(imgSrc)}
                >
                  <img
                    className="add-profile-img"
                    src={imgSrc}
                    alt={`Profile ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProfile;
