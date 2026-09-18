const express = require("express");
const path = require("node:path");
const { leerJSON } = require("./archivos");

async function main() {
  try {
    const ruta = path.join(__dirname, "../datos/instrumentos.json");
    const instrumentos = await leerJSON(ruta);

    const app = express();
    app.use(express.json());

    // Bienvenida
    app.get("/", (req, res) => {
      res.status(200).json({ mensaje: "API de instrumentos disponible" });
    });

    // Listado y filtro
    app.get("/api/instrumentos", (req, res) => {
      const { familia } = req.query;
      let resultado = instrumentos;
      if (familia) {
        resultado = instrumentos.filter(i =>
          i.familia.toLowerCase() === familia.toLowerCase()
        );
      }
      res.status(200).json(resultado);
    });

    // Detalle por ID
    app.get("/api/instrumentos/:id", (req, res) => {
      const id = Number(req.params.id);
      const instrumento = instrumentos.find(i => i.id === id);
      if (instrumento) {
        res.status(200).json(instrumento);
      } else {
        res.status(404).json({ error: "Instrumento no encontrado" });
      }
    });

    // Creación en memoria
    app.post("/api/instrumentos", (req, res) => {
      const { nombre, familia, origen, descripcion, disponible } = req.body;

      if (
        nombre === undefined ||
        familia === undefined ||
        origen === undefined ||
        descripcion === undefined ||
        disponible === undefined
      ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const nuevoId = instrumentos[instrumentos.length - 1].id + 1;
      const nuevoInstrumento = {
        id: nuevoId,
        nombre,
        familia,
        origen,
        descripcion,
        disponible
      };
      instrumentos.push(nuevoInstrumento);

      res.status(201).json(nuevoInstrumento);
    });

    // Iniciar servidor
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la API:", error.message);
  }
}

main();
