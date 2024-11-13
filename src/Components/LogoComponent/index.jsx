import React from "react";
import FictionGenieLogo from "../../assets/logo/logo-Icon.png";
import "./style.css";

const Logo = ({ color, padding, width, aifontsize, fontsize }) => {
  return (
    <div>
      <div className="logo-hd-wrap" style={{ paddingLeft: padding }}>
        <img
          style={{ width: width }}
          src={FictionGenieLogo}
          alt=""
          className="header-logo"
        />
        <div className="hd-wrap">
          <p className="logo-text" style={{ color: color, fontSize: fontsize }}>
            FictionGenie
          </p>
          <p
            className="ai-powered-hd"
            style={{ color: color, fontSize: aifontsize }}
          >
            AI Powered Stories For Kids
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
