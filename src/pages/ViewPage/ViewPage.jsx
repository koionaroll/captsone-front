import { React, useEffect, useState } from "react";
import axios from "axios";
import "./ViewPage.scss";
import ViewDeck from "../../components/ViewDeck/ViewDeck";

function ViewPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/decks/`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="deck__container--big">
      {data.map((element) => {
        return (
          <div className="deck__container" key={element.id}>
            <ViewDeck element={element} />
          </div>
        );
      })}
    </div>
  );
}

export default ViewPage;
