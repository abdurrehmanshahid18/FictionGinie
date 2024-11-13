import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Genie from "../../assets/accounts-section/Genie.png";
import Image from "react-bootstrap/Image";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
import "./SignupUser.css";

const config = require("../../Helpers/config.json");

const SignupUser = () => {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const phoneNumberRegex =
    /^(?:\+1|\+\d{2})(?:\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^+0-9]/g, "");
    setNumber(formattedValue);
  };

  const signUp = () => {
    setLoading(true);
    const newErrors = {};
    if (name === "") {
      newErrors.name = "Required*";
    }
    if (email === "") {
      newErrors.email = "Required*";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password === "") {
      newErrors.password = "Required*";
    } else if (!passwordRegex.test(password.trim())) {
      newErrors.password = "Password should be more than 5 characters.";
    }
    if (number != "" && !phoneNumberRegex.test(number.trim())) {
      newErrors.number = "Please enter valid number";
    }

    if (Object.keys(newErrors).length === 0) {
      fetch(`${config["baseUrl2"]}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phoneNumber: number,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setLoading(false);
            navigate(`/`);
            toast.success("Success! Verification email sent.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            setLoading(false);
            toast.error("Registration failed: " + res.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
          toast.error("Registration failed. Please try again.");
        });
    } else {
      setLoading(false);
      setErrors(newErrors);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      signUp();
    }
  };
  
  return (
    <div className="auth-container">
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
          <div className="signup-form form">
            <div className="signup-heading form-hd">
              <h2>Sign Up</h2>
            </div>
            <div className="custom-signup-form custom-form">
              {errors.name && <div className="error">{errors?.name}</div>}
              <input
                className="form-control crediantal-fields"
                type="text"
                style={errors.name && { border: "2px solid red" }}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.email && <div className="error">{errors?.email}</div>}
              <input
                className="form-control crediantal-fields"
                type="email"
                style={errors.email && { border: "2px solid red" }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.number && <div className="error">{errors?.number}</div>}
              <input
                type="text"
                className="form-control crediantal-fields"
                placeholder="+11234567890 (Optional)"
                value={number}
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDown}
              />
              {errors.password && (
                <div className="error">{errors?.password}</div>
              )}
              <div className="password-btn-wrap">
                <input
                  id="passwordInput"
                  className={`form-control  password-crediantal`}
                  type={showPassword ? "text" : "password"}
                  style={errors.password && { border: "2px solid red" }}
                  placeholder="Password (6 Characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>
            <div className="subline-wrap">
              <p className="subline">
                Already have an account?{" "}
                <span className="redirect">
                  {" "}
                  <NavLink to="/signin">Login here!</NavLink>
                </span>{" "}
              </p>
            </div>
            <div className="Btn-wrap">
              <button className="Btn" onClick={() => signUp()}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="signup-image Image">
            <div className="animated-image">
              <Image src={Genie} fluid className="blurred-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;
