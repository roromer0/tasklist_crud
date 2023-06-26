import React from "react";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import classes from "./App.module.css";
import Login from "./components/Login/Login";

const App = () => {
  const { pending, error, tasks, fetchTasksHandler } = useFetch();

  const addTaskHandler = (body) => {
    // enviar la petición POST
    fetchTasksHandler("POST", body);
  };

  const deleteItemHandler = (id) => {
    // eliminar la tarea
    fetchTasksHandler("DELETE", {}, id);
  };

  const updateItemHandler = (body, id) => {
    // actualizar la tarea
    fetchTasksHandler("PATCH", body, id);
  };

  useEffect(() => {
    fetchTasksHandler();
  }, []);

  return (
    <main>
      <Login />
    </main>
  );
};

export default App;
