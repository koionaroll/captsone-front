import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./CreateEditPage.scss";
import axios from "axios";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import edit from "../../assets/icons/edit.svg";
import dropdown from "../../assets/icons/dropdown.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

function CreateEditPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [sugg, setSugg] = useState([]);
  const [sum, setSum] = useState(0);

  const { deckID } = useParams();
  const navigate = useNavigate();
  const searchInput = useRef(null);

  useEffect(() => {
    if (deckID) {
      axios.get(`http://localhost:8080/decks/${deckID}`).then((res) => {
        setData(res.data);
        setList(res.data.cardlist);
        setName(res.data.deckname);
        setSelectedOption(res.data.format);
      });
    }
  }, [deckID]);

  useEffect(() => {
    setSum(list.map((e) => e.quantity).reduce((a, b) => a + b, 0));
  }, [list]);

  const handleChange = (e) => {
    setValue(() => {
      axios
        .get(`http://localhost:8080/sugg/${e}`)
        .then((res) => {
          setSugg(res.data.data);
        })
        .catch((err) => {
          return;
        });
      return e;
    });
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8080/singles/${value}`).then((res) => {
      if (
        list.find(
          (card) => card.id === res.data.id && card.isSideboard === isSideboard
        )
      ) {
        handleAddCard(res.data.id);
        return;
      }
      setList((previous) => {
        return [
          ...previous,
          {
            id: res.data.id,
            name: res.data.name,
            img: res.data.img,
            img_back: res.data.img_back,
            type: res.data.type,
            isSideboard: isSideboard,
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

  const handleAddCard = (cardId, sideBoard) => {
    setList(
      list.map((mapCard) => {
        if (mapCard.id === cardId && mapCard.isSideboard === sideBoard) {
          mapCard.quantity += 1;
        }
        return mapCard;
      })
    );
  };

  const handleSubCard = (cardId, sideBoard) => {
    setList(
      list.map((mapCard) => {
        if (mapCard.id === cardId && mapCard.isSideboard === sideBoard) {
          mapCard.quantity -= 1;
          if (mapCard.quantity === 0) {
            setTimeout(() => handleDel(cardId, mapCard.isSideboard), 0.00001);
          }
        }

        return mapCard;
      })
    );
  };

  const handleDel = (id, isSideboard) => {
    setList((currentList) => {
      const filtered = currentList.filter((list) => {
        const idMatches = list.id === id;
        const sideBoardMatches = list.isSideboard === isSideboard;
        return !(idMatches && sideBoardMatches);
      });
      return filtered;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (deckID) {
      axios
        .patch(`http://localhost:8080/decks/${deckID}`, {
          name: name,
          list: list,
          format: selectedOption,
        })
        .then(() => {
          alert("DeckList Save");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:8080/decks/decklist`, {
          deckname: name,
          cardlist: list,
          format: selectedOption,
        })
        .catch((err) => {
          console.log(err);
        });
    }
    alert("Deck Saved!");
    navigate("/");
  };

  const [isSideboard, setIsSideboard] = useState(false);
  const handleToggle = () => {
    setIsSideboard(!isSideboard);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const [options, setOptions] = useState(false);
  const handleOptions = (e) => {
    setOptions(!options);
  };

  const handleTrash = (e) => {
    const res = window.confirm("Delete deck?");
    if (res) {
      axios.delete(`http://localhost:8080/decks/delete/${deckID}`);
      setTimeout(() => navigate("/"), 300);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="layout">
        <div className="page__layout">
          <div className="input">
            <div className="input__name__container">
              <img src={edit} alt="" className="input__icon" />
              <form onSubmit={handleSubmitName}>
                <input
                  className="input__name"
                  ref={searchInput}
                  value={name}
                  onChange={handleChangeName}
                  placeholder={"Enter Deck Name"}
                />
              </form>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <TextInput
                  className="input__search"
                  Component="input"
                  trigger={[""]}
                  options={sugg}
                  value={value}
                  onChange={handleChange}
                  placeholder="Search Card"
                />
              </form>
              <img src={dropdown} alt="" className= { options? "btnH-active" :"btnH"} onClick={handleOptions}/>
              <div
                className={
                  options ? "input__container" : "input__container--hide"
                }
              >
                <p className="input__label">Total: {sum} cards</p>
                <div className="input__check__container">
                  <label htmlFor="toggle-switch" className="input__label">
                    Is Sideboard?
                  </label>
                  <input
                    className="input__check"
                    type="checkbox"
                    id="toggle-switch"
                    checked={isSideboard}
                    onChange={handleToggle}
                  />
                </div>
                <div>
                  <label htmlFor="dropdown" className="input__label">
                    Format:
                  </label>
                  <select
                    className="input__dropdown"
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleSelect}
                  >
                    <option value="">--Please choose a format--</option>
                    <option value="Standard">Standard</option>
                    <option value="Modern">Modern</option>
                    <option value="Pioneer">Pioneer</option>
                    <option value="Legacy">Legacy</option>
                    <option value="Pauper">Pauper</option>
                    <option value="EDH">EDH</option>
                  </select>
                </div>
                <div className="input__label__container">

                <label className="input__label">
                  Delete deck?
                </label>
                  <Trash className="input__trash" onClick={() => handleTrash()} />
              </div>
                </div>
            </div>
          </div>
          <div className="list">
            <div>
              <p className="list__label">Mainboard:</p>
              {list
                .filter((e) => e.isSideboard === false)
                .map((element) => {
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
            </div>
            <div>
              <p className="list__label">Sideboard:</p>
              {list
                .filter((e) => e.isSideboard === true)
                .map((element) => {
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
            </div>
          </div>
          <div className="btn__wrapper">
            <button className="btn btnS" onClick={handleSave} type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateEditPage;
