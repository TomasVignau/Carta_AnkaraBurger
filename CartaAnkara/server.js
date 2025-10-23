const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, "dist")));

// Ruta pública específica que querés
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Para cualquier otra ruta, mostrar error o 404
app.get("*", (req, res) => {
  res.status(403).send("Acceso no autorizado");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
