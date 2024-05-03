import React, { useEffect, useState, useRef } from "react";
import "./Modal.css";
import logo from "../../Images/West.png";

const LoadingModal = ({ show, container }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (container) {
      const styles = {
        height: `${container.offsetHeight}px`,
        width: `${container.offsetWidth}px`,
        top: `${container.offsetTop}px`,
        left: `${container.offsetLeft}px`,
      };
      setDimensions(styles);
    }
  }, [container]);

  return (
    <div
      ref={containerRef}
      className="loading-modal"
      style={{
        ...dimensions,
        display: show ? "flex" : "none",
      }}
    >
      <div className="lmodal-content">
        <img className="fade-image" src={logo} alt="Fading in and out" />
        <h3>Loading data</h3>
      </div>
    </div>
  );
};

export default LoadingModal;
