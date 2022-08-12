const { User } = require("../models");

const userData = [
  {
    first_name: "James",
    last_name: "Plasencia",
    user_name: "mvpcents",
    role: "Player",
    email: "jamesplasencia@gmail.com",
    password: "$2b$10$7S/N7Eiwrzz5ilVD/cDEGO6RjhwPI13DAlBZhhHtEGqy/ztANcpYe",
    user_id: 1,
  },

  {
    first_name: "Jeanette",
    last_name: "Ralph",
    user_name: "jeanster",
    role: "Player",
    email: "jean.ralph@hotmail.com",
    password: "$2b$10$7S/N7Eiwrzz5ilVD/cDEGO6RjhwPI13DAlBZhhHtEGqy/ztANcpYe",
  },

  {
    first_name: "Dave",
    last_name: "Dorado",
    user_name: "oddvidaroad",
    role: "Player",
    email: "oddvidaroad@gmail.com",
    password: "$2b$10$7S/N7Eiwrzz5ilVD/cDEGO6RjhwPI13DAlBZhhHtEGqy/ztANcpYe",
  },

  {
    first_name: "James",
    last_name: "Ralph",
    user_name: "james_ralph",
    role: "Admin",
    email: "jamesralph71@gmail.com",
    password: "$2b$10$7S/N7Eiwrzz5ilVD/cDEGO6RjhwPI13DAlBZhhHtEGqy/ztANcpYe",
  },

  {
    first_name: "Frank",
    last_name: "Ralph",
    user_name: "frank_ralph",
    role: "Admin",
    email: "frankralph@live.com",
    password: "$2b$10$7S/N7Eiwrzz5ilVD/cDEGO6RjhwPI13DAlBZhhHtEGqy/ztANcpYe",
  },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;
