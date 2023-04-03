import { React, useState } from "react";
import axios from "axios";

function CreateEditPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [quant, setQuant] = useState(1);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/singles/${value}`).then((res) => {
      setList((previous) => [
        ...previous,
        {
          id: res.data.id,
          name: res.data.name,
          img: res.data.img,
          quantity: quant,
        },
      ]);
    });
    setValue("");
  };

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

  const handleAdd = (e) => {
    setQuant(+1);
    console.log(quant)
  };

  const handleSub = (e) => {
    setQuant(quant - 1);
    if (quant === 0) {
      setQuant(0);
    }
  };
  const handleSave = (e) => {};

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
            <p>----------------------</p>
            <p>{element.id}</p>
            <p>{element.name}</p>
            <p>{element.quantity}x</p>
            <p>{element.img}</p>
            <button onClick={()=>handleAdd(element.quantity)} type="submit">
              +
            </button>
            <button onClick={handleSub} type="submit">
              -
            </button>
            <button onClick={()=> handleDel(element.id)}>Delete</button>
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
