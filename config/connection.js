<<<<<<< HEAD
const Sequelize = require("sequelize");
require("dotenv").config();
=======
const Sequelize = require('sequelize');
require('dotenv').config();
>>>>>>> 08c7813125295ba87e216a5e83f2e118daf771eb

let sequelize;

if (process.env.JAWSDB_URL) {
<<<<<<< HEAD
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORTEMAIL,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

module.exports = sequelize;
=======
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;
>>>>>>> 08c7813125295ba87e216a5e83f2e118daf771eb
