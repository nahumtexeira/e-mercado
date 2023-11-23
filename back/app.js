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

// Ruta para obtener la información de categorias
app.get("/api/cat", (req, res) => {
  // Envía el archivo cat.json como respuesta
  res.sendFile(path.join(__dirname, "emercado-api-main", "cats", "cat.json"));
});

// Ruta para obtener productos de una categoría
app.get("/api/cat/:categoryId", (req, res) => {
  // id de la categoría desde los parámetros de la URL
  const categoryId = req.params.categoryId;

  // Construye la ruta del archivo basándote en la id de la categoría
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "cats_products",
    `${categoryId}.json`
  );

  // Envía el archivo correspondiente como respuesta
  res.sendFile(filePath);
});

// Ruta para obtener la información de un producto
app.get("/api/product/:productId", (req, res) => {
  // id del producto desde los parámetros de la URL
  const productId = req.params.productId;

  // Construye la ruta del archivo basándote en la id del producto
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "products",
    `${productId}.json`
  );

  // Envía el archivo correspondiente como respuesta
  res.sendFile(filePath);
});

// Ruta para obtener los comentarios de un producto
app.get("/api/product/:productId/comments", (req, res) => {
  // id del producto desde los parámetros de la URL
  const productId = req.params.productId;

  // Construye la ruta del archivo de comentarios basándote en la id del producto
  const commentsFilePath = path.join(
    __dirname,
    "emercado-api-main",
    "products_comments",
    `${productId}.json`
  );

  // Envía el archivo de comentarios correspondiente como respuesta
  res.sendFile(commentsFilePath);
});

// Ruta para obtener el carrito de un usuario
app.get("/api/user/:userId/cart", (req, res) => {
  // id del usuario desde los parámetros de la URL
  const userId = req.params.userId;

  // Construye la ruta del archivo basándote en la id del usuario
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "user_cart",
    `${userId}.json`
  );

  // Envía el archivo correspondiente como respuesta
  res.sendFile(filePath);
});

// Ruta para obtener el contenido del archivo publish.json
app.get("/api/sell/publish", (req, res) => {
  // Especifica la ruta directa del archivo publish.json
  const publishFilePath = __dirname + "/emercado-api-main/sell/publish.json";

  // Envía el contenido del archivo publish.json como respuesta
  res.sendFile(publishFilePath);
});

// Ruta para obtener el contenido del archivo buy.json
app.get("/api/cart/buy", (req, res) => {
  // Especifica la ruta directa del archivo buy.json
  const buyFilePath = __dirname + "/emercado-api-main/cart/buy.json";

  // Envía el contenido del archivo buy.json como respuesta
  res.sendFile(buyFilePath);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
