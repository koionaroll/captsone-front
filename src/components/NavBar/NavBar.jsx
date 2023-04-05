import React from "react";
import plus from "../../assets/icons/plus.svg";
import bulb from "../../assets/icons/bulb.svg";
import back from "../../assets/icons/back.svg";
import info from "../../assets/icons/info.svg";
// import edit from "../../assets/icons/edit.svg";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="navbar__container">
        <Link to="/">
          <img className="navbar__icon" src={back} />
        </Link>
        <div>
          <Link to="/create">
            <img className="navbar__icon" src={plus} />
          </Link>
          <Link to="/playtest">
            <img className="navbar__icon" src={bulb} />
          </Link>
        </div>
        <Link to="/credits">
          <img className="navbar__icon" src={info} />
        </Link>
      </div>
    </>
  );
}

export default NavBar;
