const express = require("express");
const { connectToDatabase } = require("./models");

const app = express();

app.get("/", function (request, response) {
  response.send("Halo Dunia");
});

app.get("/about", function (req, res) {
  res.send('<h2 style="color: skyblue;">Ini adalah halaman about</h2>');
});

app.get("/users", async function (req, res) {
  const connection = await connectToDatabase();
  const [users] = await connection.query("SELECT * from users");
  console.log("Users:", users);
  await connection.end();
  res.send(`
      <pre>${JSON.stringify(users, null, 2)}</pre>
    `);
});

app.get("/users/:id", async function (req, res) {
  const connection = await connectToDatabase();
  const [users] = await connection.query(`SELECT * from users WHERE id=${req.params.id}`);
  console.log("Users:", users);
  await connection.end();
  res.send(`
      <pre>${JSON.stringify(users, null, 2)}</pre>
    `);
});

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});
