import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MyContext } from "./MyContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Listado({ nombre, lista, texto }) {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(lista);

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
    if (nombre === "Supermercado") {
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      localStorage.setItem("tareas", JSON.stringify(items));
    }
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
        placeholder={texto}
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                marginBottom: "10px",
              }}
              key={i.id}
            >
              <div
                style={{ display: "flex", flexGrow: "1", marginLeft: "2rem" }}
              >
                <span>{i.value} </span>
              </div>
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
