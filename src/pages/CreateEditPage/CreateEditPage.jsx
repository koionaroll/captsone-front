import { React, useState } from "react";
import axios from "axios"
import { element } from "prop-types";
const list = []
let counter = 0

function CreateEditPage() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .get(`http://localhost:8080/singles/${value}`)
    .then((res) => {
      console.log(res)
      list.push({
        id:res.data.id,
        name:res.data.name,
        img:res.data.img
    })
    console.log(list.name)
    })

    setValue("");
  };

  const handleKeypress = (e) => {
    // 13 keycode is enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };


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
      {list.map(element=>{
        {console.log(element)}
        return(
          <div key={element.id}>
            <p>{element.id}</p>
            <p>{element.name}</p>
            <p>{element.img}</p>
          </div>
        )
      })}     
    </>
  );
}

export default CreateEditPage;
