import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MyContext } from "./MyContext";
import io from "socket.io-client";
import { Button } from "bootstrap";

const getLocalItems = () => {
  let list = localStorage.getItem("general");
  if (list === null) {
    return [];
  }
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("general"));
  }
};

export default function Listado2({ nombre }) {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItems());

  let nuevoListado = [];

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
    //setItems((oldList) => [...oldList, item]);
    setItems([...items, item]);

    setNewItem("");
  }

  const enviarDatos = async () => {
    // Coloca aquí la lógica que deseas ejecutar a las 5 pm
    console.log("Tarea programada ejecutada a las 5 pm");

    const url = "http://localhost:3000/api/test";

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    };

    fetch(url, request)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
  };

  //agregar los items al localstorage
  useEffect(() => {
    localStorage.setItem("general", JSON.stringify(items));
    // enviarDatos();
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
      <div style={{display: "flex", justifyContent: "center"}}>
        <input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Ingrese tarea"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={() => enviarDatos()} className="btn btn-primary" style={{ marginLeft: "0.5rem" }}>
          Enviar
        </button>
      </div>
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
