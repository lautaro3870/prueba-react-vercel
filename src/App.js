import "./App.css";
import Listado from "./Listado";
import Chat from "./Chat";
import Barra from "./Barra";
import Rutas from "./Rutas";
import { MyContext } from "./MyContext";
import { useState } from "react";



function App() {
  var a = 16%8;
  console.log(a)
  return (
    <div className="App">
      <Barra />
      <Rutas />
    </div>
  );
}

export default App;
