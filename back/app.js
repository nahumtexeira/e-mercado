// Importa el módulo dotenv para cargar variables de entorno desde el archivo .env
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path"); // Añade la dependencia 'path' para trabajar con rutas de archivos

const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || "tu_clave_secreta"; // Usa una clave segura

app.use(express.json());

// Ruta para servir archivos estáticos desde la carpeta 'front'
app.use(express.static(path.join(__dirname, "../front")));

// Ruta principal que sirve el archivo 'index.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
