import React, { useState } from "react";
import classes from "./login.module.css";

function Login() {
  return (
    <form>
      <div>
        <label htmlFor="username">Email:</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Iniciar sesión</button>
      <h2>¿Aún no tienes cuenta?</h2>
      <button type="href">Regístrate</button>
    </form>
  );
}
export default Login;
