import React, { useState } from "react";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
// import edit from "../../assets/icons/edit.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import github from "../../assets/icons/github.svg";
import gmail from "../../assets/icons/gmail.svg";
import mtgaI from "../../assets/icons/mtga.png";
import linkedin from "../../assets/icons/linkedin.svg";
import "./NavBar.scss";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mtga, setMtga] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleMtga = () => {
    setMtga(!mtga);
  };

  return (
    <>
      <div className="navbar__container">
        <Link to="/" className="bg">
          <Back className="navbar__icon" />
        </Link>
        <div></div>
        <Info className="navbar__icon bg" onClick={toggleModal} />
      </div>
      <div>
        {isOpen && (
          <div className="modal-overlay">
            <span className="modal-close" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-content">
              <p>Website developed by: Khoi Tran</p>
              <p>API: https://scryfall.com/docs/api</p>
              <p>Tech Stack: ReactJs, ExpressJs </p>
              <div className="modal-content-icon-container">
                <a href="https://github.com/koionaroll">
                  <img className="modal-content-icon" src={github} alt="" />
                </a>
                <a href="mailto: tranvankhoi2002@gmail.com">
                  <img className="modal-content-icon" src={gmail} alt="" />
                </a>
                <a href="https://www.linkedin.com/in/tranvankhoi/">
                  <img className="modal-content-icon" src={linkedin} alt="" />
                </a>
                <img
                  className="modal-content-icon1"
                  src={mtgaI}
                  alt=""
                  onClick={toggleMtga}
                />
              </div>
              <p className={mtga ? "mtga" : "mtga-hide"}>
                MTGA profile: koionaroll#67211{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
