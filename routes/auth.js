const express = require('express');

const router = express.Router();

const USERS = [
    {
        username: 'isangemink',
        password: 'isan1234',
        name : 'channn',
        email : 'foerzafaren@gmail.com',
    }
]

const token = [];

router.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = USERS.find((u) => username === username);
    //cek user ada atau tidak
    if (!user) {
        //jika user tidak ada
        return res.status(404).json({
            status: false,
            message: 'user tidak ada',
        })
    }

    if (user.password !== password) {
        return res.status(401).json({
            status: false,
            message: 'password salah',
        });
    }
    //generate token
    const randomToken = Math.random().toString(36).substring(2, 15);
    token.push(randomToken);
    return res.json({
        status: true,
        message: 'berhasil sign in',
        data: {
            username: user.username,
            name: user.name,
            email: user.email,
            token: randomToken,
        }
    })
})

module.exports = router;
    