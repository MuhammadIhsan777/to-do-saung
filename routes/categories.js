const express = require('express');
const Category = require('../models/category.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const rows = await Category.getAllCategories();
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const row = await Category.getCategoryById(req.params.id);
  if (!row) return res.status(404).json({ message: 'Category not found' });
  res.json(row);
});

router.post('/', async (req, res) => {
  if (!req.body?.name) return res.status(400).json({ message: 'name is required' });
  const created = await Category.createCategory({ name: req.body.name });
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const ok = await Category.updateCategory(req.params.id, { name: req.body.name });
  if (!ok) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'updated' });
});

router.delete('/:id', async (req, res) => {
  const ok = await Category.deleteCategory(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'deleted' });
});

module.exports = router;
