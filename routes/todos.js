const express = require('express');
const Todo = require('../models/todo.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const rows = await Todo.getAllTodos();
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const row = await Todo.getTodoById(req.params.id);
  if (!row) return res.status(404).json({ message: 'Todo not found' });
  res.json(row);
});

router.post('/', async (req, res) => {
  const { title, description, category_id, is_done } = req.body || {};
  if (!title) return res.status(400).json({ message: 'title is required' });
  const created = await Todo.createTodo({ title, description, category_id, is_done });
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const ok = await Todo.updateTodo(req.params.id, req.body || {});
  if (!ok) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'updated' });
});

router.delete('/:id', async (req, res) => {
  const ok = await Todo.deleteTodo(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'deleted' });
});

module.exports = router;
