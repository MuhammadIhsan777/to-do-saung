const express = require("express");
const { connectToDatabase } = require("../models");
const CategoryModel = require("../models/category.model");

const router = express.Router();

router.get("/", async function (req, res) {
    const categories = await CategoryModel.getAllCategories();
    return res.json(categories);
});

router.get("/:id", async function (req, res) {
    const category = await CategoryModel.getCategoryById(req.params.id);
    return res.json(category);
});

router.post("/", async function (req, res) {
    const createCategory = await CategoryModel.createCategory(req.body);
    return res.json(createCategory);
});

router.put("/:id", async function (req, res) {
    const updateCategory = await CategoryModel.updateCategory(req.params.id, req.body);
    return res.json({ success: updateCategory.affectedRows > 0 });
});

router.delete("/:id", async function (req, res) {
    const deleteCategory = await CategoryModel.deleteCategory(req.params.id);
    return res.json({ success: deleteCategory.affectedRows > 0 });
});


router.delete('/:id', async function (req, res) {
    const deleteCategory = await CategoriesModel.deleteCategory(req.params.id);
    res.json({
        success: deleteCategory.affectedRows > 0
    });
});

router.put("/:id", async function (req, res) {
    const updateCategory = await CategoryModel.updateCategory(req.params.id, req.body);
    return res.json(updateCategory);
})
