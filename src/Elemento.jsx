import React, { useState } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("items");
  if (list === null) {
    return [];
  }
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("items"));
  }
};

export default function Elemento({ dato }) {
  const [items, setItems] = useState(getLocalItems());
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }
  return (
    <li key={dato.id}>
      {dato.value}{" "}
      <button
        style={{
          marginLeft: "10px",
        }}
        className="delete-button"
        onClick={() => deleteItem(dato.id)}
      >
        ❌
      </button>
    </li>
  );
}
