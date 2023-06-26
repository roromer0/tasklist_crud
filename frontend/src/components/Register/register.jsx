import React, { useState } from "react";
import classes from "./register.module.css";

function register() {
  return (
    <form>
      <div>
        <label>Nombre:</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="username">Apellido:</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="username">Email:</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" />
      </div>
      <button type="href">Regístrate</button>
    </form>
  );
}
export default register;
