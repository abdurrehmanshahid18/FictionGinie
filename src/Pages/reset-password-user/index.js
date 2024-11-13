import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Genie from "../../assets/accounts-section/Genie.png";
import { toast } from "react-toastify";
import "./index.css";

const config = require("../../Helpers/config.json");

const ResetPasswordUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const otp = location?.state?.otp;
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    if (!newPassword || !confirmPassword) {
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
      toast.warning("Password doesn't match!", {
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
      setLoading(true);
      fetch(`${config["baseUrl2"]}auth/resetPassword`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          token: otp,
          newPassword: newPassword,
        }),
      })
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          if (res.message === "Password reset successfully") {
            navigate("/");
          } else {
            setLoading(false);
            alert(res.message, "<< unsuccessful");
          }
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      reset();
    }
  };

  return (
    <div className="reset-main-container auth-container">
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
          <div className="reset-form form">
            <div className="reset-heading form-hd">
              <h2>Reset Password</h2>
            </div>
            <div className="custom-reset-form custom-form">
              <input
                className="form-control crediantal-fields"
                type="password"
                placeholder="New Password"
                onKeyDown={handleKeyDown}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                className="form-control crediantal-fields"
                type="password"
                placeholder="Confirm Password"
                onKeyDown={handleKeyDown}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <button className="Btn" onClick={reset}>
                Reset
              </button>{" "}
            </div>
          </div>
          <div className="reset-image Image">
            <div className="animated-image">
              <Image src={Genie} fluid className="blurred-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordUser;
