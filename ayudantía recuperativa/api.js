const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "pokemons.json"); //indicamos la ruta del archivo JSON

app.use(express.json());
app.use(express.static(path.join(__dirname))); // sirve index.html y styles.css

function readData() { // Leer datos del archivo JSON
  try {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content || "[]"); //Parse significa convertir de JSON a objeto JS
  } catch (err) {
    console.error("readData error:", err);
    return [];
  }
}
function writeData(data) { // Escribir datos en el archivo JSON
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8"); //escribir la data en el archivo
  } catch (err) {
    console.error("writeData error:", err);
    throw err;
  }
}

// Listar todos
app.get("/api/pokemons", (req, res) => { //en la ruta /api/pokemons corresponde al json completo
  res.json(readData());
});

// Buscar por nombre (params)
app.get("/api/pokemon/:name", (req, res) => { //:name indica que es un parametro variable
  const name = (req.params.name || "").trim().toLowerCase(); //obtiene el parametro name del requestc del cliente
  const data = readData(); //lee la data del archivo
  const p = data.find(x => (x.name || "").trim().toLowerCase() === name); //busca el nombre en la data
  if (!p) return res.status(404).json({ error: "Pokémon no encontrado" });
  res.json(p);
});

// Crear
app.post("/api/pokemon", (req, res) => { //el metodo post es para crear un nuevo recurso en /api/pokemon
  const { name, type, nature, moves } = req.body || {}; //desestructura el body del request
  if (!name || !name.toString().trim()) return res.status(400).json({ error: "El campo 'name' es obligatorio" }); //impide crear si no hay nombre

  const data = readData(); 
  const exists = data.find(x => (x.name || "").trim().toLowerCase() === name.toString().trim().toLowerCase()); //verifica si ya existe un pokemon con ese nombre
  if (exists) return res.status(400).json({ error: "Ese Pokémon ya existe" });

  // Normalizar moves: puede venir como string "a,b" o array
  let moveArr = [];
  if (Array.isArray(moves)) moveArr = moves.map(m => m.toString().trim()).filter(Boolean); 
  else if (typeof moves === "string") moveArr = moves.split(",").map(m => m.trim()).filter(Boolean); //mapear y filtra los movimientos

  const newP = { //define el nuevo pokemon
    name: name.toString().trim(),
    type: type ? type.toString().trim() : "",
    nature: nature ? nature.toString().trim() : "",
    moves: moveArr
  };
  data.push(newP); //push agrega el nuevo pokemon a la data
  writeData(data); //escribe la data actualizada en el archivo
  res.json({ message: "Pokémon agregado con éxito", pokemon: newP });
});

// Actualizar (parcial)
app.put("/api/pokemon/:name", (req, res) => {
  const target = (req.params.name || "").trim().toLowerCase(); //recibe el nombre del pokemon a actualizar
  const update = req.body || {}; //recibe los campos a actualizar en el body del request
  const data = readData();
  const i = data.findIndex(x => (x.name || "").trim().toLowerCase() === target); //busca el indice del pokemon en la data
  if (i === -1) return res.status(404).json({ error: "Pokémon no encontrado" });

  // Solo actualizar campos válidos y no vacíos
  if (update.type && update.type.toString().trim() !== "") data[i].type = update.type.toString().trim();
  if (update.nature && update.nature.toString().trim() !== "") data[i].nature = update.nature.toString().trim();

  if (update.moves) {
    if (Array.isArray(update.moves)) {
      const arr = update.moves.map(m => m.toString().trim()).filter(Boolean); //mapear y filtra los movimientos
      if (arr.length) data[i].moves = arr;
    } else if (typeof update.moves === "string") {
      const arr = update.moves.split(",").map(m => m.trim()).filter(Boolean);
      if (arr.length) data[i].moves = arr;
    }
  }

  writeData(data);
  res.json({ message: "Pokémon actualizado con éxito", pokemon: data[i] });
});

// Eliminar
app.delete("/api/pokemon/:name", (req, res) => {
  const target = (req.params.name || "").trim().toLowerCase();
  const data = readData();
  const i = data.findIndex(x => (x.name || "").trim().toLowerCase() === target);
  if (i === -1) return res.status(404).json({ error: "Pokémon no encontrado" });
  const deleted = data.splice(i, 1)[0]; //splice elimina el elemento en el indice i y retorna un array con el elemento eliminado
  writeData(data); //escribe la data actualizada en el archivo
  res.json({ message: "Pokémon eliminado con éxito", pokemon: deleted });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)); //inicia el servidor en el puerto 3000
