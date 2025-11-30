const express = require("express");

const router = express.Router();

//GET http://localhost:5000/ollama
router.post("/chat", async function (req, res) {
  const comtent = req.body.content;

  const response = await fetch("https://ollama.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 4e547ad79384417e9483913cd797de25.KppK5gSYeilWKNdJk3JFmvLQ",
    },
    body: JSON.stringify({
      model: "gpt-oss:120b",
      messages: [
        {
          role: "user",
          content: comtent,
        },
      ],
      stream: false,
    }),
  });

  const responseJson = await response.json();

  return res.status(response.status).json(responseJson);
});

module.exports = router;