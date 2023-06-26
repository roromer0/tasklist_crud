import React from "react";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import classes from "./App.module.css";
import Login from "./components/login/login";

const App = () => {
  const { isLoading, error, sendRequest, clearError } = useFetch();

  return (
    <main>
      <Login />
    </main>
  );
};

export default App;
