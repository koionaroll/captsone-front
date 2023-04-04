import { React, useEffect, useState } from "react";
import Card from "../../components/Card/Card"
import axios from "axios";

function CreateEditPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // useEffect(()=>{
  //   setNum(num)
  // }, [num])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/singles/${value}`).then((res) => {
      setList((previous) => [
        ...previous,
        {
          id: res.data.id,
          name: res.data.name,
          img: res.data.img,
          quantity: 1
        },
      ]);
    });
    setValue("");
  };
  const handleAddCard = (quant, cardId) => {
    // find the card id
    let card = list.find(x => x.id === cardId)
    // update the quant of card object to be quant
    card.quantity = quant
  }

  const handleSubCard = (quant, cardId) => {
    let card = list.find(x => x.id === cardId)
    card.quantity = quant
  }

  const handleKeypress = (e) => {
    // 13 keycode is enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleDel = id => {
    setList(currentList => {
      return currentList.filter(list => list.id !== id)
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/decks/}`).then((req) => {
    }
    
  
  )};
  return (
    <>

      <p>SearchEdit Page</p>
      <form>
        <input
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeypress}
          placeholder="Search Card"
        />
        <button onClick={handleSubmit} type="submit">
          Search
        </button>
      </form>
      <p>=========================</p>
      {list.map((element) => {
        return (
          <div key={element.id}>
            <Card element = {element} handleDel = {handleDel} handleAddCard = {handleAddCard} handleSubCard={handleSubCard}/>
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
