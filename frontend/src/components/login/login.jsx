import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar la solicitud HTTP al backend para autenticar al usuario
    // Utiliza la variable `username` y `password` para enviar los datos del formulario

    // Restablecer los campos del formulario después de enviar la solicitud
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
