import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordConfirmation from "../PasswordConfirmation/PasswordConfirmation";
import Logo from "../LogoComponent";
import "./style.css";
const config = require("../../Helpers/config.json");

const Header = () => {
  const [open, setopen] = useState(false);
  const [Profiledata, setProfiledata] = useState({});
  const [shortName, setShortName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();

  const admin = localStorage.getItem("enableUserCode")
    ? JSON.parse(localStorage.getItem("enableUserCode"))
    : "";

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
          setProfiledata(res?.user);
          const nameArray = res?.user?.name?.split(" ");
          setShortName(nameArray);
        }
      });
  }, []);

  const checkAdmin = () => {
    if (admin === true) {
      setShowModal(true);
    } else {
      navigation("/account");
    }
  };

  return (
    <>
      <header id="videohead-pro" className="sticky-header">
        <Link to="/dashboard">
          <Logo color={"purple"} padding={"30px"} />
        </Link>
        <div
          id="header-user-profile"
          onClick={() => setopen(!open)}
          className={open === true ? "active" : ""}
        >
          <div id="header-user-profile-click" className="noselect">
            <div className="user-name-icon-wrap">
              <span className="user-name-icon">{`${shortName[0]?.charAt(
                0
              )} ${shortName[1]?.charAt(0)}`}</span>
            </div>

            <div id="header-username">{Profiledata?.name}</div>
            <i className="fas fa-angle-down" />
          </div>
          <div id="header-user-profile-menu">
            <ul>
              <li>
                <Link to="/dashboard">
                  <span className="icon-User" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <span className="icon-Favorite-Window" />
                  Profile
                </Link>
              </li>
              <li onClick={() => checkAdmin()}>
                <Link>
                  <span className="icon-Favorite-Window" />
                  Account
                </Link>
              </li>
              <li>
                <Link to="/select-profile">
                  <span className="icon-Favorite-Window" />
                  Switch Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {
        <PasswordConfirmation
          showModal={showModal}
          setShowModal={setShowModal}
          route={"/account"}
        />
      }
    </>
  );
};
export default Header;
