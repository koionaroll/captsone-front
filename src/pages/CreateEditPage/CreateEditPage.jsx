import {React, useState} from 'react'
// const mtg = require("mtgsdk");

function CreateEditPage() {
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("you have searched for - " + value);
    // or you can send data to backend
  };

  const handleKeypress = e => {
      //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  // mtg.card.all({ name: "Experiment One" }).on("data", (card) => {
  //   res.json({name:card.name, image:card.imageUrl});
  // });

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

      
    </>
  );
}

export default CreateEditPage

