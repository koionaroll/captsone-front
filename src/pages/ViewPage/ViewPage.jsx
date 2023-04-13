import { React, useEffect, useState } from "react";
import axios from "axios";
import "./ViewPage.scss";
import ViewDeck from "../../components/ViewDeck/ViewDeck";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { Navigate, useNavigate } from "react-router-dom";


function ViewPage() {
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [show, setShow] = useState(false);

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
    if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortKey(key);
      setSortOrder(1);
    }
  };
  const handleSortF = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder * -1);
      setShow(key === "format" && !show);
    } else {
      setSortKey(key);
      setSortOrder(1);
      setShow(key === "format");
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8080/decks/`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
    <div className="layout">
      <h1 className="deck__title">Welcome Back User</h1>
      <div className="btn__container">
        <button className="btn" onClick={() => handleSort("timestamp")}>
          Sort by date
        </button>
        <button className="btn" onClick={() => handleSortF("format")}>
          Sort by format
        </button>
      </div>
      <div className="deck__container--big">
        {sortedData.map((element) => {
          return (
            <div className="deck__container" key={element.id}>
              <ViewDeck element={element} />
            </div>
          );
        })}
        <div className="deck__container">
          <div className="deck__create"><Plus onClick={()=>navigate("/create")} className="deck__create--icon"/></div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
    </>
  );
}

export default ViewPage;
