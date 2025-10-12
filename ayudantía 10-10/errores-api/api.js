//Hints al final de esta página
const express = require('express');
const app = express();

app.use(express.json());

// Base de datos en memoria
let books = [
  { id: 1, title: 'El Quijote', author: 'Cervantes', available: true },
  { id: 2, title: '1984', author: 'Orwell', available: false }
];

//1
app.get('/books', (req) => {
  res.json(books);
});

//2
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
});

//3
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    available: true
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//4
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  
  req.body.title = req.body.title;
  req.body.author = req.body.author;
  res.json(req.body);
});


//5
app.delete('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  
  res.json({ message: 'Libro eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});











//Hints:
// 1. Revisar parámetros de la api
// 2. Revisar tipos de datos (números vs strings)
// 3. Revisar verificación de los datos pedidos en el request (se ingresaran todos los datos necesarios?)
// 4. Revisar como se modifica el nuevo libro
// 5. Revisar lógica para eliminar recursos