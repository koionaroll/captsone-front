import { React, useState } from "react";
import { Link } from "react-router-dom";
import folder from "../../assets/icons/folder.svg";
import axios from "axios";
import "./ViewDeck.scss";

function ViewDeck({ element }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDel = (e) => {
    axios.delete(`http://localhost:8080/decks/delete/${element.id}`)
    window.location.reload();
  };

  return (
    <>
      <Link to={`edit/${element.id}`}>
        <img className="deck__folder" src={folder} alt="" />
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
    </>
  );
}

export default ViewDeck;
