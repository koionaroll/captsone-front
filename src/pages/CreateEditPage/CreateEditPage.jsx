import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./CreateEditPage.scss";
import axios from "axios";

function CreateEditPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const { deckID } = useParams();
  const navigate = useNavigate();
  const searchInput = useRef(null);

  useEffect(() => {
    if (deckID) {
      axios.get(`http://localhost:8080/decks/${deckID}`).then((res) => {
        setData(res.data);
        setList(res.data.cardlist)
        setName(res.data.deckname)
      });
    }
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8080/singles/${value}`).then((res) => {
      setList((previous) => {
        previous.filter((element) => element.id !== res.data.id);
        return [
          ...previous,
          {
            id: res.data.id,
            name: res.data.name,
            img: res.data.img,
            quantity: 1,
          },
        ];
      });
    });
    setValue("");
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    searchInput.current.blur();
  };

  const handleAddCard = (cardId) => {
    setList(
      list.map((mapCard) => {
        if (mapCard.id === cardId) {
          mapCard.quantity += 1;
        }
        return mapCard;
      })
    );
  };

  const handleSubCard = (cardId) => {
    setList(
      list.map((mapCard) => {
        if (mapCard.id === cardId) {
          mapCard.quantity -= 1;
        }
        return mapCard;
      })
    );
  };

  const handleDel = (id) => {
    setList((currentList) => {
      return currentList.filter((list) => list.id !== id);
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(deckID){
      axios.patch(`http://localhost:8080/decks/${deckID}`,{
        name: name,
        list: list,
      })
      .then(() => {
        alert("DeckList Save");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      axios
      .post(`http://localhost:8080/decks/decklist`, {
          deckname: name,
          cardlist: list,
        })
        .catch((err) => {
          console.log(err);
        });
    }
setTimeout(() => {
  
  navigate("/");
}, 250);    
  };

  return (
    <>
      <form onSubmit={handleSubmitName}>
        <input
          className="input__name"
          ref={searchInput}
          value={name}
          onChange={handleChangeName}
          placeholder={"Enter Deck Name"}
        />
      </form>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={handleChange}
          placeholder="Search Card"
        />
      </form>
      <p>=========================</p>
      {list.map((element) => {
        return (
          <div key={element.id}>
            <Card
              element={element}
              handleDel={handleDel}
              handleAddCard={handleAddCard}
              handleSubCard={handleSubCard}
            />
          </div>
        );
      })}
      <p>=========================</p>
      <button onClick={handleSave} type="submit">
        Save
      </button>
    </>
  );
}
export default CreateEditPage;
