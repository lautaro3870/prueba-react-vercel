import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Listado from "./Listado";
import Listado2 from "./Listado2";
import { useState } from "react";
import { MyContext } from "./MyContext";
import { getItemsSuper } from "./utils/getItemsSuper";


export default function Rutas() {
  const [supermercado, setSupermercado] = useState(getItemsSuper());
  const [general, setGeneral] = useState([]);

  return (
    <MyContext.Provider
      value={{ supermercado, setSupermercado, general, setGeneral }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/super" />} />
          <Route path="/super" element={<Listado nombre="Supermercado" />} />
          <Route path="/general" element={<Listado2 nombre="¿Que hay que hacer?" />} />
          {/* <Route
            path="/general"
            element={<Listado2 nombre="¿Que hay que hacer?" />}
          /> */}
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}
