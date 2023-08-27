export const getItemsTareas = () => {
    let list = localStorage.getItem("tareas");
    if (list === "") {
      return [];
    }
    console.log(list);
    if (list) {
      return JSON.parse(localStorage.getItem("tareas"));
    }
  };
  