const express = require("express");
const { connectToDatabase } = require("../models");
const TodoModel = require("../models/todo.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todos = await TodoModel.getTodos();
    res.json(todos);
  } catch (e) { next(e); }
});


router.get("/:id", async function (req, res) {
    const todos = await TodoModel.getTodoById(req.params.id);
    return res.json(todos);
});

router.post("/", async function (req, res) {
    const createTodo = await TodoModel.createTodo({
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        is_done: req.body.is_done

    })
    return res.json(createTodo);
});

router.delete('/:id', async function (req, res) {
    const deleteTodo = await TodoModel.deleteTodo(req.params.id);
    res.json({
        success: deleteTodo.affectedRows > 0
    });
});

router.put("/:id", async function (req, res) {
    const updateTodo = await TodoModel.updateTodo(req.params.id, req.body);
    return res.json(updateTodo);
})

module.exports = router;
