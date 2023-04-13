import { React, useState } from "react";
import "./Card.scss";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Minus } from "../../assets/icons/minus.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

function Card({ element, handleDel, handleAddCard, handleSubCard }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="card1">
        <div className="card1__quantity">
          <p
            className={isClicked ? "card1__txt1" : "card1__txt"}
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            {element.quantity}x
          </p>
          <p
            className={isClicked ? "card1__txt1" : "card1__txt"}
            onClick={() => {
              setIsClicked(!isClicked);
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {element.name}
          </p>
        </div>
        <div
          className={isHover ? "card1__img__container" : "card1__img--hide"}
          style={{
            marginLeft: `${
              element.name.length < 10
                ? element.name.length
                : element.name.length * 0.7
            }rem`,
          }}
        >
          <img
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="card1__img"
            src={element.img}
          />
          <img
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={element.img_back ? "card1__img" : "card1__img--hide"}
            src={element.img_back}
          />
        </div>
        <div
          className={
            isClicked ? "card1__btn__container" : "card1__btn__container--hide"
          }
        >
          <Plus
            className="card1__icon card1__btn"
            onClick={() => handleAddCard(element.id, element.isSideboard)}
            type="submit"
          />
          <Minus
            className="card1__icon1 card1__btn "
            onClick={() => {
              handleSubCard(element.id, element.isSideboard);
            }}
            type="submit"
          />
          <Trash
            className="card1__btn card1__icon"
            onClick={() => handleDel(element.id, element.isSideboard)}
          />
        </div>
      </div>
    </>
  );
}

export default Card;
