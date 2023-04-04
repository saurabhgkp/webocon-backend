const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, email, gender, password, phone, date } = req.body;
    // console.log(req.body, "0999999999999999");
    const hashpassword = await bcrypt.hash(password, 10);
    try {
        const userInDB = await User.findOne({
            where: {
                email: email
            }
        });
        // console.log(userInDB, "sgdsfhgd-=--=-=-=");
        if (!userInDB) {
            console.log("!userInDB-=--=-=-=");
            const data = new User({ name, email, gender, password: hashpassword, phone, date });
            await data.save();
            res.status(201).json({
                message: data,
                status: 1,

            });

        } else {
            console.log("userInDB-=--=-=-=");
            res.status(200).json({
                message: "this email is Alredy Used",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const data = await User.findOne({
        where: { email: email },
    });

    try {
        const isData = await bcrypt.compare(password, data.password);
        // console.log(isData);
        if (data && isData) {
            const token = jwt.sign({ userId: data.id }, "saurabh");
            console.log(token);
            return res.status(200).json({
                status: 1,
                token: token,
                userId: data.id
            });
        } else {
            res.send("user not found");
        }
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.userDetails = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(req.query);
        const data = await User.findOne({
            where: { id: id }
        });
        return res.status(200).json({
            status: 1,
            data: data,
        });
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};

exports.userEdit = async (req, res) => {
    try {
        const { name, gender, password, phone, date } = req.body;
        const { id } = req.query
        const hashpassword = await bcrypt.hash(password, 10);
        const updatedRows = await User.update(
            {
                name, gender, password: hashpassword, phone, date
            },
            {
                where: {
                    id: id
                }
            }
        );
        return res.status(200).json({
            status: 1,
            msg: "Update success",
        });
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};


exports.userDelete = async (req, res) => {
    try {
        const { id } = req.query;

        const deletedRows = await User.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            status: 1,
            msg: "deleted success",
        });
    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "something went wrong",
        });
    }
};





