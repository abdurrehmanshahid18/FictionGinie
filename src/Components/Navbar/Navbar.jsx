import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../LogoComponent";

const NavbarComponent = () => {
  return (
    <div className="navbar-section">
      <Navbar key={"lg"} expand={"lg"} className="nav-bars">
        <Container fluid className="navbar-wrapper">
          <Navbar.Brand href="#">
            {" "}
            <Logo />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
