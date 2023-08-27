import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Listado from "./Listado";
import Listado2 from "./Listado2";
import { useState } from "react";
import { MyContext } from "./MyContext";
import { getItemsSuper } from "./utils/getItemsSuper";
import { getItemsTareas } from "./utils/getItemsTareas";

export default function Rutas() {
  const [supermercado, setSupermercado] = useState(getItemsSuper());
  const [tareas, setTareas] = useState(getItemsTareas());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/super" />} />
        <Route
          path="/super"
          element={<Listado lista={supermercado} nombre="Supermercado" texto="Ingrese producto" />}
        />
        <Route
          path="/general"
          element={<Listado lista={tareas} nombre="¿Que hay que hacer?" texto="Ingrese tarea"/>}
        />
        {/* <Route
            path="/general"
            element={<Listado2 nombre="¿Que hay que hacer?" />}
          /> */}
      </Routes>
    </BrowserRouter>
  );
}
