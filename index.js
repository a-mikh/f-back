const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let notes = [
  { name: 'TEst', id: 1 },
  { name: 'NON Note', id: 2 },
  { name: 'Hide me', id: 3 }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(n => n.id === id);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = `Note with id '${id}' doesn't exist`;
    response.status(404).end();
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.json(note);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


