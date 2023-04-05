import { React, useState } from "react";
import { Link } from "react-router-dom";
import folder from "../../assets/icons/folder.svg";
import "./ViewDeck.scss";

function ViewDeck({ element }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDel = (e) => {

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
