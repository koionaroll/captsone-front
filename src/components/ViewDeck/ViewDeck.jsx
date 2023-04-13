import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import axios from "axios";
import "./ViewDeck.scss";


function ViewDeck({ element }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDel = (e) => {
    axios.delete(`http://localhost:8080/decks/delete/${element?.id}`);
    window.location.reload();
  };
  function dots(text, count){
    return text.slice(0, count) + (((text.length > count)) ? "..." : "");
}

  return (
    <>
      <div className="deck__align">
        <Link to={`edit/${element?.id}`}>
          <div className="card-groups">
            <div className="card-group">
              <div
                className="big-card card"
                style={{ backgroundImage: `url(${element.cardlist[2]?.img})` }}
              ></div>
              <div
                className="big-card card"
                style={{ backgroundImage: `url(${element.cardlist[1]?.img})` }}
              ></div>
              <div
                className="big-card card"
                style={{ backgroundImage: `url(${element.cardlist[0]?.img})` }}
              ></div>
            </div>
          </div>
        </Link>
        <p
          className="deck__name"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          {dots(element?.deckname, 12, true)}
        </p>
        <p className="deck__format" onClick={() => {
              setIsClicked(!isClicked);
            }}>{element.format}</p>
        <div className="deck__date__align">
          <p
            className="deck__date"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            {new Date(element?.timestamp).toLocaleDateString()}
          </p>
          <Trash
            className={isClicked ? "deck__del" : "deck__del--hide"}
            onClick={handleDel}
          />
        </div>
      </div>
    </>
  );
}

export default ViewDeck;
