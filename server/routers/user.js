const express = require('express');
const router = express.Router();

const USER = [
    {
        userName: "tri255",
        password: "123456",
        role: "admin",
    },
    {
        userName: "tri",
        password: "123456",
        role: "nood"
    },
    {
        userName: "tri2",
        password: "123456",
        role: "admin"
    }
];

const suppliers = [
]



router.post('/login', (req, res) => {
    const { userName, password } = req.body;
    try {
        USER.map(user => {
            if(userName == user.userName && password == user.password) {
                const response = {
                    ...user,
                    suppliers: suppliers
                }
                return res.status(200).send(response);
            }
        })
        return res.status(204).send("Sai thông tin đăng nhập");
    } catch (error) {
        return res.status(500).send('Something wrong');
    }
});

router.post('/addsupplier', (req, res) => {
    const { address, name, taxId } = req.body;
    try {
        suppliers.push({
            address,
            name,
            taxId
        })
        return res.status(200).send({
            address,
            name,
            taxId
        })
    } catch (error) {
        return res.status(500).send('Something wrong');
    }
})

module.exports = router;