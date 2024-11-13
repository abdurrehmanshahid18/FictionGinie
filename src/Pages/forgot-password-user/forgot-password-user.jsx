import React, { useState } from "react";
import "./forgot-password-user.css";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "../../Components/Navbar/Navbar";
import Genie from "../../assets/accounts-section/Genie.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
import axios from "axios";

const config = require("../../Helpers/config.json");

const ForgotPasswordUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    setEmail(value);
    if (value === "") {
      setError("Please provide an Email");
    } else if (!emailRegex.test(value)) {
      setError("Incorrect Email address");
    } else {
      setError("");
    }
  };

  const forgot = () => {
    if (!error.length && email.length) {
      setLoading(true);
      axios
        .post(`${config["baseUrl2"]}auth/forgotPassword`, {
          email: email,
        })
        .then((res) => {
          if (res.data.success === true) {
            setLoading(false);
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
            navigate("/otp", { state: { email } });
          }
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      forgot();
    }
  };
  return (
    <div className="forgot-main-container auth-container">
      <img src={donut_light} className="auth-light-donut" />
      <img src={donut_dark} className="auth-dark-donut" />
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
      <Navbar />
      <div className="main-wrap">
        <div className="sub-wrap">
          <div className="forgot-form form">
            <div className="forgot-heading form-hd">
              <h2>Forgot Password</h2>
            </div>
            <div className="custom-forgot-form custom-form">
              <div className="subline-wrap">
                <p className="subline">Please enter your email address!</p>
              </div>
              <input
                className="form-control crediantal-fields"
                type="email"
                placeholder="Email"
                onChange={(e) => validateEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {error.length > 0 && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            <div className="subline-wrap">
              <p style={{ textAlign: "center" }} className="subline">
                Already have an account?{" "}
                <span className="redirect">
                  {" "}
                  <NavLink to="/signin">Login here!</NavLink>
                </span>{" "}
              </p>
            </div>
            <div className="Btn-wrap">
              <button className="Btn" onClick={forgot}>
                Send
              </button>
            </div>
          </div>
          <div className="forgot-image Image">
            <div className="animated-image">
              <Image src={Genie} fluid className="blurred-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordUser;
