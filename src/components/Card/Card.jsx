import { React, useState } from "react";
import "./Card.scss";

function Card({ element, handleDel, handleAddCard, handleSubCard }) {
  const [quant, setQuant] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleAdd = (e) => {
    handleAddCard(element.id);
  };

  const handleSub = (e) => {
    handleSubCard(element.id);
  };
  return (
    <>
      <div className="card1">
        <div className="card1__quantity">
          <p onClick={() => {
              setIsClicked(!isClicked);
            }}>{element.quantity}x</p>
          <p
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {element.name}
          </p>
        </div>
        <img className= {isHover? "card1__img" : "card1__img--hide" }  src={element.img} />
        <div
          className={
            isClicked ? "card1__btn__container" : "card1__btn__container--hide"
          }
        >
          <button className="card1__btn" onClick={handleAdd} type="submit">
            +
          </button>
          <button className="card1__btn" onClick={handleSub} type="submit">
            -
          </button>
          <button className="card1__btn" onClick={() => handleDel(element.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
