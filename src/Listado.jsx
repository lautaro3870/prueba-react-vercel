import React, { useEffect, useState } from "react";
import './style.css'

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

export default function Listado() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItems());

  function addItem() {
    console.log(newItem);

    if (!newItem) {
      alert("Ingrese un item");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }

  //agregar los items al localstorage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div>
      <br />
      <h1>Supermercado</h1>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Ingrese tarea"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.value}{" "}
              <button
                className="delete-button"
                onClick={() => deleteItem(item.id)}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
