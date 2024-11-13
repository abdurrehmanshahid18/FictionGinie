import React from "react";

const ProgressBar = (props) => {
  const {
    value,
    maxValue,
    backgroundColor,
    progressBarColor,
    width,
    height,
    pageNumber,
    numPages,
  } = props;

  const progressPercentage = (value / maxValue) * 100;

  const containerStyles = {
    position: "relative",
    width: width || "100%",
    height: height || "25px",
    backgroundColor: backgroundColor || "#e0e0e0",
    overflow: "hidden",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
  };

  const progressBarStyles = {
    width: `${progressPercentage}%`,
    height: "100%",
    background: `linear-gradient(to right, ${progressBarColor.start}, ${progressBarColor.end})`,
  };

  const percentageStyles = {
    position: "absolute",
    top: "-1px",
    left: "50%",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={progressBarStyles}>
        <div style={percentageStyles}>{`Page ${pageNumber} of ${
          numPages || 1
        }`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
