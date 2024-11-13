import React, { useState } from "react";
import "./style.css";
import { MdHome } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const DashboardMenu = (props) => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const admin = localStorage.getItem("enableUserCode")
    ? JSON.parse(localStorage.getItem("enableUserCode"))
    : "";

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    if (menu === "book") {
      navigation("/profile");
    } else if (menu === "settings") {
      navigation("/account");
    }
  };

  const checkAdmin = () => {
    if (admin === true) {
      props?.setShowModal(true);
    } else {
      navigation("/account");
    }
  };
  return (
    <div className="dashboard-menu-container">
      <div
        className={`dashboard-menu-container-sub ${
          isMenuOpen ? "menu-open" : ""
        }`}
      >
        <p
          id="menu-hover"
          onClick={() => handleMenuClick("home")}
          className={selectedMenu === "home" ? "seletced-menu" : ""}
        >
          <MdHome color="white" style={{ fontSize: "40px" }} />
        </p>
        <p
          id="menu-hover"
          onClick={() => handleMenuClick("book")}
          className={selectedMenu === "book" ? "seletced-menu" : ""}
        >
          <CgProfile color="white" style={{ fontSize: "40px" }} />
        </p>
        <p
          id="menu-hover"
          onClick={() => checkAdmin()}
          className={selectedMenu === "settings" ? "seletced-menu" : ""}
        >
          <IoMdSettings color="white" style={{ fontSize: "40px" }} />
        </p>
      </div>
      <div
        className={`menu-icon-container menu-icon-white  ${
          isMenuOpen ? "menu-icon-container-open" : ""
        }`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
};

export default DashboardMenu;
