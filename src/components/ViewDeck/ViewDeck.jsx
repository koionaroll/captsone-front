import { React, useState } from "react";
import { Link } from "react-router-dom";
import folder from "../../assets/icons/folder.svg";
import axios from "axios";
import "./ViewDeck.scss";

function ViewDeck({ element }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDel = (e) => {
    axios.delete(`http://localhost:8080/decks/delete/${element.id}`);
    window.location.reload();
  };

  // console.log(element.cardlist[0].img)
  // console.log(element.cardlist[1].img)
  // console.log(element.cardlist[2].img)
  return (
    <>
    <div className="deck__align">
      <Link to={`edit/${element.id}`}>
        <div class="card-groups">
          <div class="card-group">
            <div class="big-card card" style={{backgroundImage:`url(${element.cardlist[0].img})`}}></div>
            <div class="big-card card" style={{backgroundImage:`url(${element.cardlist[1].img})`}}></div>
            <div class="big-card card" style={{backgroundImage:`url(${element.cardlist[2].img})`}}></div>
          </div>
        </div>
      </Link>
      <p
        className="deck__name"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        {element.deckname}
      </p>
      <p
        className="deck__date"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
        >
        {new Date(element.timestamp).toLocaleDateString()}
      </p>
      <button
        className={isClicked ? "deck__del" : "deck__del--hide"}
        onClick={handleDel}
        >
        Delete
      </button>
        </div>
    </>
  );
}

export default ViewDeck;
