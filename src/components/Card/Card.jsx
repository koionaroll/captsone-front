import { React, useState } from "react";
import "./Card.scss";

function Card({ element, handleDel, handleAddCard, handleSubCard }) {
  const [quant, setQuant] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleAdd = (e) => {
    handleAddCard(element.id);
    setQuant(quant + 1);
  };

  const handleSub = (e) => {
    handleSubCard(element.id);
    setQuant(quant - 1);

    if (quant === 1) {
      handleDel(element.id);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card__quantity">
          <p onClick={() => {
              setIsClicked(!isClicked);
            }}>{quant}x</p>
          <p
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {element.name}
          </p>
        </div>
        <img className= {isHover? "card__img" : "card__img--hide" }  src={element.img} />
        <div
          className={
            isClicked ? "card__btn__container" : "card__btn__container--hide"
          }
        >
          <button className="card__btn" onClick={handleAdd} type="submit">
            +
          </button>
          <button className="card__btn" onClick={handleSub} type="submit">
            -
          </button>
          <button className="card__btn" onClick={() => handleDel(element.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
