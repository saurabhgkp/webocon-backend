const express = require("express")
const cors = require("cors")
const app = express()


const PORT = process.env.PORT || 8080


const logger = require("morgan")
var sequelize = require("./utils/database");

// Middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"));

const router = require('./routes/user')
app.use('/user', router)

// sequelize
//   .sync({ alter: true })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})