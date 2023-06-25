import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listado from "./Listado";
import Listado2 from "./Listado2";
import { useState } from "react";
import { MyContext } from "./MyContext";

const getSuper = () => {
  let list = localStorage.getItem("items");
  if (list === null) {
    return [];
  }
  //console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("items"));
  }
};

export default function Rutas() {

  const [supermercado, setSupermercado] = useState(getSuper());
  const [general, setGeneral] = useState([]);

  return (
    <MyContext.Provider value={{supermercado, setSupermercado, general, setGeneral}}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/super" element={<Listado nombre="Supermercado" />} />
          <Route path="/general" element={<Listado2 nombre="¿Que hay que comprar?" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </MyContext.Provider>
  );
}
