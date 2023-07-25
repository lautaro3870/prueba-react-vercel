import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MyContext } from "./MyContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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

export default function Listado({ nombre }) {
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
    <div className="App">
      <br />
      <h1>{nombre}</h1>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Ingrese tarea"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <br />
      <br />
      <ListGroup
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        {items.map((i) => {
          return (
            <ListGroupItem
              style={{ backgroundColor: "whitesmoke", marginBottom: "10px" }}
              key={i.id}
            >
              {i.value}{" "}
              <button
                className="btn btn-secondary"
                onClick={() => deleteItem(i.id)}
              >
                ❌
              </button>
            </ListGroupItem>
          );
        })}
      </ListGroup>

      {/* <ol id="lista2">
        {items.map((i) => {
          return (
            <li key={i.id}>
              {i.value}
              <button
                className="btn btn-secondary"
                onClick={() => deleteItem(item.id)}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ol> */}
    </div>
  );
}
