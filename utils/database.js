const Sequelize = require("sequelize");

const sequelizeConnect = new Sequelize(
    "sql12610920",  //"db_name",
    "sql12610920",            // "db_usename",
    "mgZnkYVill",    ///"Password",
    {
        dialect: "mysql",
        host: "sql12.freesqldatabase.com",
        // logging:false
    }
);


module.exports = sequelizeConnect;