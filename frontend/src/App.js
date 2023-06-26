import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import HourGlass from "./components/UI/Spinner/HourGlass";
import TasksList from "./components/Tasks/TasksList";
import TasksForm from "./components/Tasks/TasksForm";
import classes from "./App.module.css";

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
      <section className={classes["task-form"]}>
        <TasksForm onAddTask={addTaskHandler} />
      </section>
      {
        // mientras se carga la lista de tareas, se muestra el spinner
        pending && <HourGlass />
      }
      <section className={classes["tasks-content"]}>
        {
          // si hay tareas, y no hay errores, y no está cargando, se muestran las tareas
          !pending && !error && tasks.length > 0 && (
            <TasksList
              items={tasks}
              onDeleteItem={deleteItemHandler}
              onUpdateItem={updateItemHandler}
            />
          )
        }
        {
          // si no hay tareas, y no hay errores, y no está cargando, se muestra el mensaje de que no hay tareas
          !pending && !error && tasks.length === 0 && (
            <p className={classes["no-tasks"]}>No pending tasks!</p>
          )
        }
        {
          // si hay errores, se muestra el mensaje de error
          error && <p className={classes["error"]}>{error.message}</p>
        }
      </section>
    </main>
  );
};

export default App;
