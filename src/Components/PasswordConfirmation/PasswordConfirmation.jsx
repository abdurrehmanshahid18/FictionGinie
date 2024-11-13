import React, { useState } from "react";
import "../PasswordConfirmation/PasswordConfirmation.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Helpers/firebase.config";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const config = require("../../Helpers/config.json");
function PasswordConfirmation({ showModal, setShowModal, route }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForget, setisForget] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailOTP, setEmailOTP] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const usercode = localStorage.getItem("userCode");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      authentication();
    }
  };

  const authentication = () => {
    if (!password) {
      toast.error("Please enter passowrd!", {
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
    if (usercode === password) {
      navigate(route);
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

  const hitEmailForForget = () => {
    setLoading(true);
    fetch(`${config["baseUrl2"]}auth/forgotUserCode`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setisForget(true);
      });
  };

  const reset = () => {
    setLoading(true);
    if (!newPassword || !confirmPassword) {
      setLoading(false);
      toast.warning("Password field is empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword !== confirmPassword) {
      setLoading(false);
      toast.warning("Password does't match!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (newPassword === confirmPassword) {
      fetch(`${config["baseUrl2"]}auth/resetUserCode`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          token: emailOTP,
          newPassword: newPassword,
        }),
      })
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          localStorage.setItem("userCode", newPassword);
          navigate(route);
        });
    }
  };
  
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        animation={false}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          {!isForget ? (
            <Modal.Title>Enter Master Key!</Modal.Title>
          ) : (
            <>
              <Modal.Title>Reset Master Key</Modal.Title>
            </>
          )}
        </Modal.Header>
        <Modal.Body className="Modal">
          {!isForget ? (
            <div className="main-div">
              <h6 className="headings">
                Looks like you've set up a Master Key for your Account page!{" "}
              </h6>
              <div className="password-container">
                <h6 className="headings">Please enter Master Key. 🗝️ </h6>
                <input
                  className="password-field"
                  type="password"
                  value={password}
                  placeholder="Master Key"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(event) => handleKeyPress(event)}
                />
              </div>
              <div className="forgot-link-wrap">
                <NavLink
                  className="forgot-link"
                  onClick={() => {
                    hitEmailForForget();
                  }}
                >
                  Forgot Master Key ? Reset Here
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              <div className="reset-password-wrap">
                <div className="reset-input-wrap">
                  <p className="input-names">OTP</p>
                  <input
                    className="reset-password-input"
                    type="password"
                    value={emailOTP}
                    placeholder="Enter your Otp Code"
                    onChange={(e) => {
                      setEmailOTP(e.target.value);
                    }}
                  />
                </div>
                <div className="reset-input-wrap">
                  <p className="input-names">Enter New Master Key 🗝️</p>
                  <input
                    className="reset-password-input"
                    type="password"
                    value={newPassword}
                    placeholder="New Master Key"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="reset-input-wrap">
                  <p className="input-names">Confirm Master Key 🗝️</p>
                  <input
                    className="reset-password-input"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Master Key"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isForget ? (
            <div className="button-wrap">
              <button
                className="btn btn-cancel me-2 mt-0"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-continue mt-0"
                onClick={() => {
                  authentication();
                }}
                disabled={!password}
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <div className="button-wrap">
                <button
                  className={`btn btn-cancel me-2 mt-0`}
                  onClick={() => {
                    setisForget(false);
                  }}
                >
                  Back
                </button>
                <button
                  className={`btn btn-continue mt-0 ${
                    !emailOTP || !newPassword || !confirmPassword
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => {
                    reset();
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PasswordConfirmation;
