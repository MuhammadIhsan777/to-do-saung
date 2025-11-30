const express = require('express');

const router = express.Router();

const USERS = [
    {
        username: "admin",
        password: "password123",
        name: "Administrator",
        email: "admin123@gmail.com"
    }
];

const token = [];

router.post('/signin', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    //check username dan password sudah sesuai
    const user = USERS.find(u => u.username === username);
    
    //check usernya ada atau tidak
    if (!user) {
        //jika user tidak ada
        return res.status(404).json({
            status: false,
            message: 'user tidak ada',
        });
    }
});