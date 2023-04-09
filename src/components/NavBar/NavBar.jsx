import React from "react";
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import {ReactComponent as Bulb} from "../../assets/icons/bulb.svg";
import {ReactComponent as Back} from "../../assets/icons/back.svg";
import {ReactComponent as Info} from "../../assets/icons/info.svg";
// import edit from "../../assets/icons/edit.svg";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="navbar__container">
        <Link to="/">
          <Back className="navbar__icon" />
        </Link>
        <div>
          <Link to="/create">
            <Plus className="navbar__icon"/>
          </Link>
          {/* <Link to="/playtest">
            <Bulb className="navbar__icon"/>
          </Link> */}
        </div>
        <Link to="/credits">
          <Info className="navbar__icon"/>
        </Link>
      </div>
    </>
  );
}

export default NavBar;
