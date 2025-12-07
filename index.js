const express = require('express');
const path = require('path');
const { connectToDb } = require('./models');
const usersRouter = require('./routes/users');
const ollamaRouter = require('./routes/ollama');
const authRouter = require('./routes/auth');
const cors = require('cors');
const proxy=require('express-http-proxy');

const categoryRouter = require('./routes/categories');
const todosRouter = require('./routes/todos');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use("/users", usersRouter);

// app.get('/kategori', async function (req, res) {
//   const connection = await connectToDb();
//   const [kategori] = await connection.query(SELECT * FROM kategori);
//   await connection.end();

//   return res.json(kategori);
// })

// app.get('/todos', async function (req, res) {
//   const connection = await connectToDb();
//   const [todos] = await connection.query('SELECT * from todos');
  
//   await connection.end();

//   return res.json(todos);
// })

app.use("/api/categories", categoryRouter);
app.use("/api/todos", todosRouter);
app.use("/api/ollama", ollamaRouter);
app.use("/api/auth", authRouter);

//frontend todos.6

app.use('/', proxy('http://localhost:5173'));

app.get('/todos', async function(req, res) {
  return res.sendFile(path.join(__dirname , './views/todos/index.html'))
})

//buat kategori
app.get('/categories', async function(req, res) {
  return res.sendFile(path.join(__dirname , './views/categories/index.html'))
})

app.listen(5000, function(){
  console.log ('server is running on http://localhost:5000');
});