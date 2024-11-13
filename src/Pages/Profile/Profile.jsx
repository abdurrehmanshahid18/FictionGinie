import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import BookStats from "../../Components/BookStats/index";
import axios from "axios";
import { toast } from "react-toastify";
import AddProfileimg1 from "../../assets/AddProfileImgs/A1.png";
import AddProfileimg2 from "../../assets/AddProfileImgs/A2.png";
import AddProfileimg3 from "../../assets/AddProfileImgs/A3.png";
import AddProfileimg4 from "../../assets/AddProfileImgs/A4.png";
import AddProfileimg5 from "../../assets/AddProfileImgs/A5.png";
import AddProfileimg6 from "../../assets/AddProfileImgs/A6.png";
import AddProfileimg7 from "../../assets/AddProfileImgs/A7.png";
import AddProfileimg8 from "../../assets/AddProfileImgs/A8.png";
import AddProfileimg9 from "../../assets/AddProfileImgs/A9.png";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectAvatarModal from "./Select-Avatar/select-avatar-modal";

const config = require("../../Helpers/config.json");
const Profile = () => {
  const [Profiledata, setProfiledata] = useState([]);
  const [ProfileImg, setProfileImg] = useState([
    `${config["baseUrl2Image"]}/resources/static/assets/uploads/profiles/${
      localStorage.getItem("image").split("/").pop().split(".")[0]
    }.png`,
  ]);
  const [Bookdata, setBookdata] = useState([]);
  const [data, setdata] = useState([]);
  const [activeMenu, setActiveMenu] = useState("BooksRead");
  const [bookReadStats, setbookReadStats] = useState(0);
  const [bookTranslationCheckedStats, setbookTranslationCheckedStats] =
    useState(0);
  const [bookLanguageReadStats, setbookLanguageReadStats] = useState(0);
  const [wordsLookUpStats, setwordsLookUpStats] = useState(0);
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [dob, setdob] = useState(new Date("2012/09/09"));
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("m");
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);
  const [openModalForImagePicker, setOpenModalForImagePicker] = useState(false);
  const [code, setCode] = useState("");

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

  const handleClose = () => {
    setOpenModalForImagePicker(false);
  };

  const handleProfileImageClick = (imgSrc) => {
    setSelectedProfileImg(imgSrc);
  };

  const selectedProfile = location.state?.profile || null;

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleSelect = (value) => {
    setGender(value);
    setOpen(false);
  };

  const fetchProfile = () => {
    fetch(
      `${config["baseUrl"]}/getprofilesbyid/${localStorage.getItem("id")}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "fetched") {
          let temp = [];
          temp = res?.data?.[0]?.image;
          setProfiledata(temp);
        }
      });
  };

  useEffect(() => {
    fetchProfile();
    setProfileImg(
      `${config["baseUrl2Image"]}/resources/static/assets/uploads/profiles/${
        localStorage.getItem("image").split("/").pop().split(".")[0]
      }.png`
    );
  }, []);

  useEffect(() => {
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
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${config["baseUrl"]}/getbooks`, {
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
          setBookdata([...temp]);
        }
      });
  }, []);

  const getcontinueReadData = localStorage.getItem("continueReadData");
  const continueReadData = JSON.parse(getcontinueReadData);
  const newData = localStorage.getItem("data");
  const profileID = JSON.parse(localStorage.getItem("profileId"));
  const formatData = JSON.parse(newData);

  const getBooksRead = () => {
    axios
      .get(
        `https://backend.stats.fictiongenie.com/api/stats/books/getbooksRead/?userId=${formatData?.uid}&profileId=${profileID}`
      )
      .then((res) => {
        const firstTotalBooksRead = res?.data?.data?.[0]?.totalBooksRead || 0;
        setbookReadStats(firstTotalBooksRead);
      })
      .catch((e) => console.log(e));
  };

  const getTranslationRead = () => {
    axios
      .get(
        `https://backend.stats.fictiongenie.com/api/stats/books/getBookTranslationChecked/?userId=${formatData?.uid}&profileId=${profileID}`
      )
      .then((res) => {
        const firstTotalBooksTranslationRead = res?.data?.data || 0;
        setbookTranslationCheckedStats(firstTotalBooksTranslationRead);
      })
      .catch((e) => console.log(e));
  };

  const getLanguagesRead = () => {
    axios
      .get(
        `https://backend.stats.fictiongenie.com/api/stats/books/getBooksLanguageRead/?userId=${formatData?.uid}&profileId=${profileID}`
      )
      .then((res) => {
        const firstTotalBooksLanguageRead = res?.data?.data || 0;
        setbookLanguageReadStats(firstTotalBooksLanguageRead);
      })
      .catch((e) => console.log(e));
  };

  const getVocabulary = () => {
    axios
      .get(
        `https://backend.stats.fictiongenie.com/api/stats/books/getwordsLookup/?userId=${formatData?.uid}&profileId=${profileID}`
      )
      .then((res) => {
        const firstTotalBooksVocablaryRead = res?.data?.data || 0;
        setwordsLookUpStats(firstTotalBooksVocablaryRead);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getBooksRead();
    getTranslationRead();
    getLanguagesRead();
    getVocabulary();
  }, []);

  const UpdateProfile = () => {
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
    fetch(`${config["baseUrl2"]}profile/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: formatData?.uid,
        name: name,
        profile_id: profileID,
        dob: dob,
        gender: gender,
        categories: "1",
        image: selectedProfileImg,
        code: code === "" ? null : code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Profile has been updated successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getProfile();
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
        setOpenModalForImagePicker(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  const getProfile = (item) => {
    fetch(
      `${config["baseUrl2"]}profile/getProfile?profile_id=${
        selectedProfile?.profile_id ? selectedProfile?.profile_id : profileID
      }&uid=${selectedProfile?.uid ? selectedProfile?.uid : formatData?.uid}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setGender(res?.profile?.gender);
        setname(res?.profile?.name);
        setdob(res?.profile?.dob);
        setCode(
          res?.profile?.code === "Not Available" ? null : res?.profile?.code
        );
        localStorage.setItem("image", res?.profile?.image);
        setProfileImg(
          `${
            config["baseUrl2Image"]
          }/resources/static/assets/uploads/profiles/${
            res?.profile?.image?.split("/").pop().split(".")[0]
          }.png`
        );
      });
  };

  useEffect(() => {
    getProfile();
  }, [selectedProfile]);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div id="sidebar-bg">
        <Header />
        <div id="content-sidebar-pro">
          <div id="content-sidebar-info">
            <img src={ProfileImg} alt="User" />
            <div id="profile-sidebar-name">
              <h5>{localStorage.getItem("name")}</h5>
            </div>
            <div id="profile-sidebar-gradient" />
          </div>
          <div className="content-sidebar-section">
            <h3 className="content-sidebar-sub-header">Categories</h3>
            <ul id="profile-favorite-genres">
              {data.length > 0
                ? data.map((data) => {
                    return (
                      <img
                        src={`${config["baseUrl"]}${data.image}`}
                        style={{ height: "40px", width: "40px" }}
                        className="me-3"
                        alt="User"
                      />
                    );
                  })
                : "no Category Found"}
              <li></li>
            </ul>
            <div className="clearfix" />
          </div>
        </div>
        <main id="col-main-with-sidebar">
          <div className="dashboard-container">
            <ul className="dashboard-sub-menu">
              <li className={activeMenu === "" ? "current" : ""}>
                <a onClick={() => handleMenuClick("Stats")}></a>
              </li>
            </ul>
            <div className="leads-main-wrap">
              <div className="leads-sub-wrap mb-5">
                <div className="account-settings-form  ">
                  <div className="update-profile-head">
                    <div>
                      <h5 className="stats-of-profile">Profile Information</h5>
                      <p className="small-paragraph-spacing mb-0">
                        By letting us know your name, we can make our support
                        experience much more personal.
                      </p>
                    </div>
                  </div>
                  <div className="row gap-sm-row">
                    <div className="col-sm">
                      <div className="form-group">
                        <label htmlFor="first-name" className="col-form-label">
                          Your name 👋:
                        </label>
                        <input
                          onChange={(e) => setname(e.target.value)}
                          defaultValue={name}
                          type="text"
                          className="form-control"
                          id="first-name"
                          placeholder="Full name"
                        />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-group">
                        <label htmlFor="first-name" className="col-form-label">
                          Date of Birth
                        </label>
                        <br />
                        <DatePicker
                          selected={new Date(dob)}
                          onChange={(date) => setdob(date)}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          placeholderText="Select Date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gap-sm-row ">
                    <div className="col-sm">
                      <div className="form-group w-100">
                        <label htmlFor="first-name" className="col-form-label">
                          Select Gender:
                        </label>
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
                            className=" form-control"
                            id="select-gender"
                          />
                          {open && (
                            <div
                              className="form-control"
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
                    </div>
                    <div className="col-sm">
                      <div className="form-group w-100">
                        <label htmlFor="first-name" className="col-form-label">
                          Profile Code:
                        </label>
                        <input
                          onChange={(e) => setCode(e.target.value)}
                          defaultValue={code}
                          value={code}
                          type="password"
                          className="form-control"
                          id="first-name"
                          placeholder="Code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gap-sm-row ">
                    <div className="col-sm">
                      <button
                        onClick={() => setOpenModalForImagePicker(true)}
                        className="btn btn-green-pro mt-3 mt-sm-4"
                      >
                        Select Avatar and Save
                      </button>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                </div>
              </div>
              <div className="leads-sub-conatiner"></div>
            </div>
            <div className="leads-responcive-sub-wrap">
              <div className="leads-sub-wrap mb-5">
                <div className="account-settings-form  ">
                  <div className="update-profile-head">
                    <div>
                      <h5 className="stats-of-profile">Profile Information</h5>
                      <p className="small-paragraph-spacing mb-0">
                        By letting us know your name, we can make our support
                        experience much more personal.
                      </p>
                    </div>
                  </div>
                  <div className="row gap-sm-row">
                    <div className="col-sm">
                      <div className="form-group">
                        <label htmlFor="first-name" className="col-form-label">
                          Your name 👋:
                        </label>
                        <input
                          onChange={(e) => setname(e.target.value)}
                          defaultValue={name}
                          type="text"
                          className="form-control"
                          id="first-name"
                          placeholder="Full name"
                        />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-group">
                        <label htmlFor="first-name" className="col-form-label">
                          Date of Birth
                        </label>
                        <DatePicker
                          selected={new Date(dob)}
                          onChange={(date) => setdob(date)}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                          showYearDropdown
                          showMonthDropdown
                          dropdownMode="select"
                          placeholderText="Select Date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gap-sm-row ">
                    <div className="col-sm">
                      <div className="form-group">
                        <label htmlFor="first-name" className="col-form-label">
                          Select Gender:
                        </label>
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
                            className=" form-control"
                            id="select-gender"
                          />
                          {open && (
                            <div
                              className="form-control"
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
                    </div>
                    <div className="col-sm">
                      <div className="form-group w-100">
                        <label htmlFor="first-name" className="col-form-label">
                          Profile Code:
                        </label>
                        <input
                          onChange={(e) => setCode(e.target.value)}
                          defaultValue={code}
                          type="password"
                          className="form-control"
                          id="first-name"
                          placeholder="Code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gap-sm-row ">
                    <div className="col-sm">
                      <button
                        onClick={() => setOpenModalForImagePicker(true)}
                        className="btn btn-green-pro mt-3 mt-sm-4"
                      >
                        Select Avatar and Save
                      </button>
                    </div>
                    <div className="col-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            <SelectAvatarModal
              openModalForImagePicker={openModalForImagePicker}
              handleClose={handleClose}
              profileImages={profileImages}
              selectedProfileImg={selectedProfileImg}
              handleProfileImageClick={handleProfileImageClick}
              setOpenModalForImagePicker={setOpenModalForImagePicker}
              UpdateProfile={UpdateProfile}
            />
            <BookStats
              bookLanguageReadStats={bookLanguageReadStats}
              bookReadStats={bookReadStats}
              bookTranslationCheckedStats={bookTranslationCheckedStats}
              wordsLookUpStats={wordsLookUpStats}
              continueReadData={continueReadData}
              allBookData={Bookdata}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
