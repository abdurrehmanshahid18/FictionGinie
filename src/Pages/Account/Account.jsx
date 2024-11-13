import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { auth } from "../../Helpers/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import MasterKeyConfirmModal from "../../Components/Master-Key-Confirm-Modal/master-key-confirm-modal";

const config = require("../../Helpers/config.json");
const Account = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [CategoryId, setCategoryId] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [data, sedata] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [isForget, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enableAdminPasswordShow, setEnableAdminPasswordShow] = useState(false);
  const [shortName, setShortName] = useState("");
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

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
          sedata([...temp]);
        }
      });
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    fetch(`${config["baseUrl2"]}auth/getUserInfo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ uid: localStorage.getItem("id") }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success === true) {
          setName(res?.user?.name);
          setNumber(res?.user?.phone_number);
          setEmail(res?.user?.email);
          const nameArray = res?.user?.name?.split(" ");
          setShortName(nameArray);
          if (res?.user?.is_user_code == 1) {
            setEnableAdminPasswordShow(true);
          } else {
            setEnableAdminPasswordShow(false);
          }
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      `${config["baseUrl2"]}profile/listProfiles?userId=${localStorage.getItem(
        "id"
      )}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setAllProfiles(res?.profiles);
        }
      });
  }, []);

  const UpdateProfile = () => {
    setLoading(true);

    const data = {
      uid: localStorage.getItem("id"),
      name: name,
      phoneNumber: number,
      image: "/authentication/resources/static/assets/uploads/users/img.png",
    };

    axios
      .post(`${config["baseUrl2"]}auth/updateAccount`, data)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("name", name);
        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        setLoading(false);

        console.log("error", error);
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const enableUserCodeFunction = (isEnable = false) => {
    setLoading(true);
    const payload = {
      uid: localStorage.getItem("id"),
      enableUserCode: isEnable,
    };

    axios
      .post(`${config["baseUrl2"]}auth/enableUserCode`, payload)
      .then((res) => {
        if (isEnable === true) {
          localStorage.setItem("enableUserCode", true);
        } else {
          localStorage.setItem("enableUserCode", false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  function handleEnablePassword() {
    setLoading(true);
    if (adminPassword !== adminConfirmPassword) {
      toast.error("Confirm password does not match!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        const user = userCredential.user;
        user.getIdToken().then(function (idToken) {
          fetch(`${config["baseUrl2"]}auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: idToken }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const payload = {
                  uid: localStorage.getItem("id"),
                  userCode: adminPassword,
                };
                axios
                  .post(`${config["baseUrl2"]}auth/addUserCode`, payload)
                  .then((res) => {
                    setLoading(false);
                    localStorage.setItem("userCode", adminPassword);
                    toast.success("Master Key enabled sucessfully!", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    enableUserCodeFunction(true);
                  })
                  .catch((error) => {
                    setLoading(false);

                    console.log("error", error);
                    toast.error("somethig went wrong", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  });
              }
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Login Password is incorrect!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      });
  }

  const reset = () => {
    setLoading(false);
    if (!newPassword || !currentPassword) {
      toast.warning("Master Key field is empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword !== currentPassword) {
      setLoading(false);
      toast.warning("Master Keys doesn't match!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword === currentPassword) {
      fetch(`${config["baseUrl2"]}auth/resetPassword`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          token: currentPassword,
          newPassword: newPassword,
        }),
      })
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          if (res.message === "Master Key reset successfully") {
            toast.success("Master Key reset successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setIsForgot(false);
          } else {
            alert(res.message, "<< unsuccessful");
          }
        });
    }
  };

  const forgot = () => {
    if (email.length) {
      setLoading(true);
      axios
        .post(`${config["baseUrl2"]}auth/forgotPassword`, {
          email: email,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            toast.success("OTP has been sent to the Email", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsForgot(true);
          }
        })
        .catch((e) => {});
    }
  };
  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <div id="sidebar-bg">
        <Header />
        <main id="col-main">
          <div className="dashboard-container">
            <ul className="dashboard-sub-menu">
              <li className="current">
                <a href="dashboard-account.html">Account Settings</a>
              </li>
              <li className="d-none">
                <a href="dashboard-account-payment.html d-none">Payment Info</a>
              </li>
            </ul>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12  col-lg-3">
                  <div id="account-edit-photo">
                    <div className="user-name-icon-wrap-account">
                      <span className="user-name-icon-account">{`${shortName[0]?.charAt(
                        0
                      )} ${shortName[1]?.charAt(0)}`}</span>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="account-settings-form">
                    <h5>General Information</h5>
                    <p className="small-paragraph-spacing">
                      By letting us know your name, we can make our support
                      experience much more personal.
                    </p>
                    <div className="row">
                      <div className="col-sm">
                        <div className="form-group">
                          <label
                            htmlFor="first-name"
                            className="col-form-label"
                          >
                            Your name 👋:
                          </label>
                          <input
                            onChange={(e) => setName(e.target.value)}
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
                          <label htmlFor="last-name" className="col-form-label">
                            Got a phone? Optional, we will share stats! 📱🚀:
                          </label>
                          <input
                            onChange={(e) => setNumber(e.target.value)}
                            defaultValue={number}
                            type="text"
                            className="form-control"
                            id="last-name"
                            placeholder="Optional +14155551234"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h5>Account Information</h5>
                    <p className="small-paragraph-spacing">
                      Peek but don't tweak! This is your email address in its
                      natural habitat, not up for changes right now. 🌿👀
                    </p>
                    <div className="row">
                      <div className="col-sm">
                        <div className="form-group">
                          <label htmlFor="e-mail" className="col-form-label">
                            E-mail
                          </label>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                            id="e-mail"
                            defaultValue={email}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-sm ">
                        <div className="form-group">
                          <div>
                            <label
                              htmlFor="button-change"
                              className="col-form-label"
                            >
                              &nbsp; &nbsp;
                            </label>
                          </div>
                          <a href="#!" className="btn btn-form d-none">
                            Change E-mail
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => UpdateProfile()}
                      className="btn btn-green-pro mt-3"
                    >
                      Save Changes
                    </button>
                    <hr />
                    <h5>Change Password</h5>
                    <p className="small-paragraph-spacing ">
                      Password blues? 🤔 Time for a refresh! Click{" "}
                      <span className="chnge-passowrd-account" onClick={forgot}>
                        Reset Password!
                      </span>{" "}
                      and unleash a brand new secret spell! 🗝️✨
                    </p>
                    {isForget && (
                      <div className="row">
                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="current-password"
                              className="col-form-label"
                            >
                              OTP Code:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="current-password"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="new-password"
                              className="col-form-label"
                            >
                              New Password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="new-password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Minimum of 6 characters"
                            />
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="current-password"
                              className="col-form-label"
                            >
                              Confirm Password:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="Confirm New Password"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {isForget && (
                      <button
                        onClick={() => reset()}
                        className="btn btn-green-pro mt-3"
                      >
                        Change Password
                      </button>
                    )}
                    <hr />
                    <h5>Enable Master Key</h5>
                    <p className="small-paragraph-spacing ">
                      Enabling this Master Key 🗝️ will turn your account page
                      into a no-kid zone 🚫🧒, even if they know the login
                      password! 🔐✨{" "}
                      <span className="chnge-passowrd-account">
                        {" "}
                        <label className="switch">
                          <input
                            type="checkbox"
                            value={enableAdminPasswordShow}
                            checked={enableAdminPasswordShow}
                            onChange={() => {
                              setEnableAdminPasswordShow((preValue) => {
                                if (preValue === true) {
                                  handleShowConfirmationModal();
                                  return false;
                                }
                                return !preValue;
                              });
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </span>
                    </p>
                    {enableAdminPasswordShow && (
                      <div className="row">
                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="current-password"
                              className="col-form-label"
                            >
                              You Account Login Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="current-password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="new-password"
                              className="col-form-label"
                            >
                              Enter Master Key: 🗝️
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="new-password"
                              value={adminPassword}
                              onChange={(e) => setAdminPassword(e.target.value)}
                              placeholder="Enter Master Key"
                            />
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="form-group">
                            <label
                              htmlFor="current-password"
                              className="col-form-label"
                            >
                              Confirm Master Key: 🗝️
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-password"
                              value={adminConfirmPassword}
                              onChange={(e) =>
                                setAdminConfirmPassword(e.target.value)
                              }
                              placeholder="Confirm New Master Key"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {enableAdminPasswordShow && (
                      <button
                        onClick={() => {
                          handleEnablePassword();
                        }}
                        disabled={
                          !(password && adminPassword && adminConfirmPassword)
                        }
                        className="btn btn-green-pro mt-3"
                      >
                        Save Master Key 🗝️
                      </button>
                    )}
                    <hr />
                    <h5>Preferred Genres</h5>
                    <p className="small-paragraph-spacing">
                      Get ready to laugh, cry, and everything in between – your
                      content is crafted around these favorite genres!
                    </p>
                    <div className="registration-genres-step">
                      <ul className="registration-genres-choice">
                        {data.length > 0
                          ? data.map((data) => {
                              return (
                                <li
                                  onClick={(e) => {
                                    if (
                                      CategoryId.filter(
                                        (dataa) => dataa == data.id
                                      ).length > 0
                                    ) {
                                      const index = CategoryId.indexOf(data.id);
                                      if (index > -1) {
                                        CategoryId.splice(index, 1);
                                      }
                                      setCategoryId(CategoryId);
                                      document.getElementById(
                                        `i${data.id}`
                                      ).style.opacity = "0";
                                    } else {
                                      CategoryId.push(data.id);
                                      setCategoryId(CategoryId);
                                      document.getElementById(
                                        `i${data.id}`
                                      ).style.opacity = "1";
                                    }
                                  }}
                                >
                                  {
                                    <i
                                      className="fas fa-check-circle"
                                      id={`i${data.id}`}
                                    />
                                  }
                                  <img
                                    src={`${config["baseUrl"]}${data.image}`}
                                    alt={data.name}
                                  />
                                  <h6>{data.name}</h6>
                                </li>
                              );
                            })
                          : "no data"}
                      </ul>
                      <div className="clearfix" />
                    </div>
                    <hr />
                    <h5>All Profiles</h5>
                    <p className="small-paragraph-spacing">
                      All below profiles are part of your account family!
                    </p>
                    <div className="registration-genres-step">
                      <ul className="registration-genres-choice">
                        {allProfiles?.length > 0
                          ? allProfiles?.map((data) => {
                              return (
                                <li
                                  className="profile-img-wrap"
                                  onClick={() =>
                                    navigation("/profile", {
                                      state: { profile: data },
                                    })
                                  }
                                >
                                  {
                                    <i
                                      className="fas fa-check-circle"
                                      id={`i${data.id}`}
                                    />
                                  }
                                  {
                                    <img
                                      className="profile-img"
                                      src={`${
                                        config["baseUrl2Image"]
                                      }/resources/static/assets/uploads/profiles/${
                                        data.image
                                          .split("/")
                                          .pop()
                                          .split(".")[0]
                                      }.png`}
                                      alt={data.name}
                                    />
                                  }

                                  <h6 style={{ textTransform: "capitalize" }}>
                                    {data.name}
                                  </h6>
                                </li>
                              );
                            })
                          : "no data"}
                      </ul>
                      <div className="clearfix" />
                    </div>
                    <div className="clearfix" />
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {
          <MasterKeyConfirmModal
          showConfirmationModal={showConfirmationModal}
          handleCloseConfirmationModal={handleCloseConfirmationModal}
          enableUserCodeFunction={enableUserCodeFunction}
          setShowConfirmationModal={setShowConfirmationModal}
          />

        }
      </div>
    </>
  );
};

export default Account;
