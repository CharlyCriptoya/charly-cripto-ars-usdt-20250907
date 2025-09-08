// server.js
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ejemplo de endpoint para cotizaciones de dólar
app.get("/api/dolar", async (req, res) => {
  try {
    const r = await fetch("https://dolarapi.com/v1/dolares");
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cotizaciones" });
  }
});

// Ejemplo de endpoint para cotizaciones cripto (BTC, ETH, etc.)
app.get("/api/cripto/:moneda", async (req, res) => {
  const { moneda } = req.params;
  try {
    const r = await fetch(`https://criptoya.com/api/${moneda}/ars`);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cripto" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
