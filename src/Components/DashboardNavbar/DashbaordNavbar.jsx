import React, { useState, useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import "react-resizable/css/styles.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../LogoComponent";
import { TfiMenu } from "react-icons/tfi";

const config = require("../../Helpers/config.json");

const DashboardNavbar = (props) => {
  const [open, setopen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const navigation = useNavigate();

  const admin = localStorage.getItem("enableUserCode")
    ? JSON.parse(localStorage.getItem("enableUserCode"))
    : "";

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [props?.profileUpdate]);

  const checkAdmin = () => {
    if (admin === true) {
      props?.setShowModal(true);
    } else {
      navigation("/account");
    }
  };

  return (
    <div className="dashboard-navbar-section">
      <Navbar key={"lg"} expand={"lg"} className="nav-bars">
        <Container fluid className="navbar-wrapper-dashboard">
          <div className="main-dashboard-container">
            <Logo />
            <div>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-lg`}
                className="color"
              >
                <TfiMenu style={{ color: "white" }} />
              </Navbar.Toggle>
              <Navbar.Offcanvas
                className="navbar-color"
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Navbar.Brand href="#">
                    <Logo />
                  </Navbar.Brand>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-lg`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end">
                    <div
                      id="header-user-profile"
                      onClick={() => setopen(!open)}
                      className={open === true ? "active" : ""}
                    >
                      <div
                        id="header-user-profile-click"
                        className="noselect"
                        style={{ padding: "0px" }}
                      >
                        <div className="user-profile-container">
                          {!profileImage ? (
                            <img
                              src={"https://placehold.co/400"}
                              alt="Account Image"
                            />
                          ) : (
                            <img
                              src={`${
                                config["baseUrl2Image"]
                              }/resources/static/assets/uploads/profiles/${
                                localStorage
                                  .getItem("image")
                                  .split("/")
                                  .pop()
                                  .split(".")[0]
                              }.png`}
                              alt="User"
                            />
                          )}
                          <p className="username">
                            {localStorage.getItem("name")}
                          </p>
                          <i
                            className="fas fa-angle-down"
                            style={{ color: "white" }}
                          />
                        </div>
                      </div>
                      <div
                        className="profile-menu-header"
                        id="header-user-profile-menu"
                      >
                        <ul>
                          <li>
                            <Link to="/dashboard" id="header-menu-data">
                              <span className="icon-Favorite-Window" />
                              Home
                            </Link>
                          </li>
                          <li onClick={() => checkAdmin()}>
                            <Link id="header-menu-data">
                              <span className="icon-User" />
                              Account
                            </Link>
                          </li>
                          <li>
                            <Link to="/profile" id="header-menu-data">
                              <span className="icon-Favorite-Window" />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/select-profile" id="header-menu-data">
                              <span className="icon-Favorite-Window" />
                              Switch Profile
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-profile-container-responsive">
                      {!profileImage ? (
                        <img
                          src={"https://placehold.co/400"}
                          alt="Account Image"
                        />
                      ) : (
                        <img
                          src={`${
                            config["baseUrl2Image"]
                          }/resources/static/assets/uploads/profiles/${
                            localStorage
                              .getItem("image")
                              .split("/")
                              .pop()
                              .split(".")[0]
                          }.png`}
                          alt="User"
                        />
                      )}
                      <p className="username">{localStorage.getItem("name")}</p>
                    </div>
                    <div className="responsive-navbar">
                      <li>
                        <Link
                          to="/dashboard"
                          className="responsive-navbar-link"
                        >
                          <span />
                          Home
                        </Link>
                      </li>
                      <li onClick={() => checkAdmin()}>
                        <Link className="responsive-navbar-link">
                          <span />
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile" className="responsive-navbar-link">
                          <span />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/select-profile"
                          className="responsive-navbar-link"
                        >
                          <span />
                          Switch Profile
                        </Link>
                      </li>
                    </div>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default DashboardNavbar;
