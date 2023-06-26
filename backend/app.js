// Archivo principal de la aplicación, punto de entrada
// importar la librería express, para crear el servidor
const express = require("express");
// importar la librería dotenv, para leer las variables de entorno
const dotenv = require("dotenv");
// importar la librería mongoose, para conectarnos a la base de datos
const mongoose = require("mongoose");
/* Habilitar strictQuery para que no se puedan hacer consultas 
con campos que no existen en el modelo*/
mongoose.set('strictQuery', true);
// importar la librería cors, para habilitar el acceso a la API desde cualquier origen
const cors = require("cors");
// importar las rutas
const logins = require("./routes/loginRoutes");
const events = require("./routes/eventRoutes");

// leer las variables de entorno
dotenv.config();
// crear el servidor
const app = express();
// habilitar el uso de json en el body
app.use(express.json());
// habilitar el uso de cors
app.use(cors());
// conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI, {
    // para evitar warnings con las URL de conexión, aplica el nuevo motor de análisis de URL
    useNewUrlParser: true,
    /* para evitar warnings con la topología de la base de datos, 
    aplica el nuevo motor de detección y monitoreo de servidores */
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the database!"))
  .catch((err) => console.log(err));
// escuchar los eventos de error, para manejar posibles errores después de la conexión
mongoose.connection.on('error', err => {
  console.log(err);
});
// habilitar las rutas
app.use("/auth", logins);
app.use("/calendar", events);

// levantar el servidor
// escucha las conexiones para el puerto (y host especificados)
// devuelve un objeto http.Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});