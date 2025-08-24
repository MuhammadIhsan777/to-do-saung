const express = require("express");
const { connectToDatabase } = require("./models");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Halo Dunia");
});

app.get("/about", function (req, res) {
  res.send('<h2 style="color: skyblue;">Ini adalah halaman about</h2>');
});

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.get("/Categories", async function (req, res) {
  const connection = await connectToDatabase();
  const [categories] = await connection.query("SELECT * from Categories");
  console.log("Categories:", categories);
  await connection.end();
  return res.json(categories);
});

app.get("/Categories/:id", async function (req, res) {
  const connection = await connectToDatabase();
  const [categories] = await connection.query(`SELECT * from Categories WHERE id=${req.params.id}`);
  console.log("Categories:", categories);
  await connection.end();
  return res.json(categories);
});

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");

const express = require("express");
const app = express();

app.use(express.json()); // biar bisa baca req.body JSON

const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

app.listen(5000, () => console.log("Server running on port 5000"));

});
