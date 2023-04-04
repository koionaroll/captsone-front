import { React, useState } from "react";

function Card({ element, handleDel, handleAddCard, handleSubCard }) {
  const [quant, setQuant] = useState(1);

  const handleAdd = (e) => {
    handleAddCard(quant + 1, element.id)
    setQuant(quant + 1);

  };

  const handleSub = (e) => {
    handleSubCard(quant - 1, element.id)
    setQuant(quant - 1);
    
    if (quant === 1) {
        handleDel(element.id);
    }
};

return (
    <>
      <p>----------------------</p>
      <p>{element.id}</p>
      <div>
      <p>{element.name}</p>
      <p>{quant}x</p>
      </div>
      <p>{element.img}</p>
      <button onClick={handleAdd} type="submit">
        +
      </button>
      <button onClick={handleSub} type="submit">
        -
      </button>
      <button onClick={() => handleDel(element.id)}>Delete</button>
    </>
  );
}

export default Card;
