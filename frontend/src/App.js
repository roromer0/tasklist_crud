import React from "react";
import { useEffect } from "react";
import classes from "./App.module.css";
import Login from "./components/login/login";
import Register from "./components/Register/register";

const App = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};

export default App;
