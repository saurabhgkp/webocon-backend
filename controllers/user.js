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

// exports.verify = async (req, res) => {

//     try {
//         const { userId, uniqueString } = req.params
//         const isKey = await User.findOne({ id: userId });
//         console.log("isKey", isKey.uniqueString);
//         // console.log("======+++++", userId, "++++++", uniqueString);
//         const isData = await bcrypt.compare(uniqueString, isKey.uniqueString);
//         if (isData) {
//             isKey.isActive = true
//             await isKey.save();
//             const token = jwt.sign({ userId: userId }, "saurabh", {
//                 expiresIn: "10000h",
//             });
//             return res.status(201).json({
//                 message: "verification  Successfully",
//                 status: " verifed ",
//                 token: token,
//             });
//         }
//         else {
//             return res.status(500).json({
//                 message: "something went wrong",

//             });
//         }


//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             status: 0,
//             message: "something went wrong",
//         });
//     }
// };

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

exports.Adminlogin = async (req, res) => {
    const { email, password } = req.body;

    const data = await User.findOne({
        where: { email: email, isActive: true, role: "admin" },
    });

    try {
        const isData = await bcrypt.compare(password, data.password);
        console.log(isData);
        if (data && isData) {
            const token = jwt.sign({ userId: data.id }, "saurabh");
            return res.status(200).json({
                status: 1,
                token: token,
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