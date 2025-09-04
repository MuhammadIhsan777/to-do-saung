const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./models");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const categoriesRouter = require("./routes/categories");

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.send("Halo Dunia");
});

app.get("/about", function (req, res) {
  res.send('<h2 style="color: skyblue;">Ini adalah halaman about</h2>');
});

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);

app.get("/api/categories", async function (req, res) {
  const connection = await connectToDatabase();
  const [categories] = await connection.query("SELECT * from Categories");
  console.log("Categories:", categories);
  await connection.end();
  return res.json(categories);
});

app.get("/api/categories/:id", async function (req, res) {
  const connection = await connectToDatabase();
  const [categories] = await connection.query(`SELECT * from Categories WHERE id=${req.params.id}`);
  console.log("Categories:", categories);
  await connection.end();
  return res.json(categories);
});

///FRONTEND TODOS
app.get('/todos', async function(req, res) {
  return res.sendFile(path.join(__dirname, './views/todos/index.html'));
})

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});

//FRONTEND CATEGORIES
app.get('/categories', async function(req, res) {
  return res.sendFile(path.join(__dirname, './views/categories/index.html'));
})

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});


