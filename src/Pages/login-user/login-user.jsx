import React, { useState } from "react";
import "./login-user.css";
import Image from "react-bootstrap/Image";
import Navbar from "../../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import Genie from "../../assets/accounts-section/Genie.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Helpers/firebase.config";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ReactGA from "react-ga4";
import { toast } from "react-toastify";
import donut_light from "../../assets/accounts-section/Donut-light.png";
import donut_dark from "../../assets/accounts-section/Donut-light-big.png";
const config = require("../../Helpers/config.json");

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = () => {
    const newErrors = {};
    if (email === "") {
      newErrors.email = "Required*";
    }
    if (password === "") {
      newErrors.password = "Required*";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(true);
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
                localStorage.setItem("email", email);
                localStorage.setItem("data", JSON.stringify(data));
                localStorage.setItem("token", data?.token);
                fetch(
                  `${config["baseUrl2"]}profile/listProfiles?userId=${data?.uid}`,
                  {
                    method: "GET",
                    headers: { "content-type": "application/json" },
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.success === true) {
                      if (res?.profiles.length > 0) {
                        setLoading(false);
                        window.location.reload(true);
                        window.location = "/";
                      } else {
                        setLoading(false);
                        window.location = "/add-profile";
                      }
                    } else {
                      setLoading(false);
                    }
                  });
              } else {
                setLoading(false);
                if (data.message == "Email not verified") {
                  toast.success("Please Verify Your Email.", {
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
                console.error("Login Failed:", data.message);
              }
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error:", error);
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.error("Firebase Authentication Error:", error);
        toast.error("Authentication failed. Please check your credentials.");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      gaEventTracker("login");
      login();
    }
  };

  const gaEventTracker = () => {
    ReactGA.event({
      action: "login-action",
      category: "login-category",
      label: "login-label",
      value: 1,
    });
  };

  return (
    <div className="login-main-container auth-container">
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
          <div className="login-form form">
            <div className="login-heading">
              <h2>Login</h2>
            </div>
            <div className="custom-login-form custom-form">
              {errors.email && <div className="error">{errors.email}</div>}
              <input
                className="form-control crediantal-fields"
                type="email"
                style={errors.email && { border: "2px solid red" }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <div className="password-btn-wrap">
                <input
                  id="passwordInput"
                  className={`form-control password-crediantal`}
                  type={showPassword ? "text" : "password"}
                  style={errors.password && { border: "2px solid red" }}
                  placeholder="Password (6 characters)"
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
                <span className="redirect">
                  <NavLink to="/forgot-password">Forgot Password?</NavLink>
                </span>
              </p>
            </div>
            <div className="subline-wrap">
              <p className="subline">
                Don't have an account?{" "}
                <span className="redirect">
                  <NavLink to="/signup">Create here!</NavLink>
                </span>
              </p>
            </div>
            <div className="Btn-wrap">
              <button
                className="Btn"
                onClick={() => {
                  gaEventTracker("login");
                  login();
                }}
              >
                Login
              </button>
            </div>
          </div>
          <div className="login-image Image">
            <div className="animated-image">
              <Image src={Genie} fluid className="blurred-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
