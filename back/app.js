require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || "tu_clave_secreta"; // Utiliza una clave segura

app.use(express.json());

// Middleware de autorización
const authorizeMiddleware = (req, res, next) => {
  // Verifica si el token está presente en la cabecera de la solicitud
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secretKey);

    // Agrega la información del usuario al objeto de solicitud
    req.user = decoded;

    // Continúa con la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Ruta para servir archivos estáticos desde la carpeta 'front'
app.use(express.static(path.join(__dirname, "../front")));

// Ruta principal que sirve el archivo 'index.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front", "index.html"));
});

// Ruta para obtener la información de categorías
app.get("/api/cat", (req, res) => {
  res.sendFile(path.join(__dirname, "emercado-api-main", "cats", "cat.json"));
});

// Ruta para obtener productos de una categoría
app.get("/api/cat/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "cats_products",
    `${categoryId}.json`
  );
  res.sendFile(filePath);
});

// Ruta para obtener la información de un producto
app.get("/api/product/:productId", (req, res) => {
  const productId = req.params.productId;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "products",
    `${productId}.json`
  );
  res.sendFile(filePath);
});

// Ruta para obtener los comentarios de un producto
app.get("/api/product/:productId/comments", (req, res) => {
  const productId = req.params.productId;
  const commentsFilePath = path.join(
    __dirname,
    "emercado-api-main",
    "products_comments",
    `${productId}.json`
  );
  res.sendFile(commentsFilePath);
});

// Ruta para obtener el contenido del archivo publish.json
app.get("/api/sell/publish", (req, res) => {
  const publishFilePath = path.join(
    __dirname,
    "emercado-api-main",
    "sell",
    "publish.json"
  );
  res.sendFile(publishFilePath);
});

// Ruta para obtener el contenido del archivo buy.json
app.get("/api/cart/buy", (req, res) => {
  const buyFilePath = path.join(
    __dirname,
    "emercado-api-main",
    "cart",
    "buy.json"
  );
  res.sendFile(buyFilePath);
});

// Ruta para autenticar al usuario y generar un token
app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  // Valida el formato del correo electrónico usando una expresión regular
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Formato de correo electrónico inválido" });
  }

  try {
    // Lee los usuarios desde el archivo JSON
    const usersFilePath = path.join(
      __dirname,
      "emercado-api-main",
      "user",
      "users.json"
    );
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    // Busca el usuario por correo electrónico y contraseña
    const user = users.find((u) => u.username === email && u.password === pass);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera un token con el ID del usuario
    const token = jwt.sign({ userId: user.id }, secretKey);

    // Devuelve el token al frontend
    res.json({ token });
  } catch (error) {
    console.error("Error al leer el archivo de usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/api/user/:userId/cart", authorizeMiddleware, (req, res) => {
  console.log("Usuario autenticado:", req.user);
  const userId = req.params.userId;
  const filePath = path.join(
    __dirname,
    "emercado-api-main",
    "user_cart",
    `${userId}.json`
  );
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
