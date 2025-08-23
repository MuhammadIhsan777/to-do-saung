const express = require("express");
const { connectToDatabase } = require("../models");
const UserModel = require("../models/user.model");

const router = express.Router();

router.get("/", async function (req, res) {
    const user = await UserModel.getUsers();

    return res.json(user);
});

router.get("/:id", async function (req, res) {
    const user = await UserModel.getUserbyID(req.params.id);4
    return res.json(user);
});

router.post("/", async function (req, res) {
    const createUser = await UserModel.createUser({
        name: req.body.name,
        email:req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    })
    return res.json(createUser);
});

module.exports = router;