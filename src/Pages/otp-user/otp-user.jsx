import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Genie from "../../assets/accounts-section/Genie.png";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
import { toast } from "react-toastify";
import "./otp-user.css";

const OtpUser = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();

  const verifyOtp = () => {
    navigate("/reset-password", { state: { email, otp } });
  };
  const isButtonDisabled = !otp;

  const handleKeyDown = (e) => {
    if (otp === "") {
      toast.error("please enter your code");
    } else if (e.key === "Enter") {
      e.preventDefault();
      verifyOtp();
    }
  };

  return (
    <div className="otp-main-container auth-container">
      <img src={donut_light} className="auth-light-donut" />
      <img src={donut_dark} className="auth-dark-donut" />
      <Navbar />
      <div className="main-wrap">
        <div className="sub-wrap">
          <div className="otp-form form">
            <div className="otp-heading form-hd">
              <h2>OTP</h2>
            </div>
            <div className="custom-otp-form custom-form">
              <div className="subline-wrap">
                <p className="subline">Please enter OTP code</p>
              </div>
              <input
                className="form-control crediantal-fields"
                type="text"
                placeholder="Otp Code"
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
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
              <button
                className="Btn"
                onClick={verifyOtp}
                disabled={isButtonDisabled}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="otp-image Image">
            <div className="animated-image">
              <Image src={Genie} fluid className="blurred-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpUser;
