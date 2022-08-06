const { Players } = require("../models");

const playersData = [
  {
    id: 1,
    player_name: "Alex Chiva",
    email: "thechiva@pol.org",
    user_id: 1,
  },
  {
    id: 2,
    player_name: "Joe Kozel",
    email: "joziekozie@smc.edu",
    user_id: 1,
  },
  {
    id: 3,
    player_name: "Jaque Custo",
    email: "guyiknow@aqua.org",
    user_id: 2,
  },
  {
    id: 4,
    player_name: "Dan Steel",
    email: "dsteelz@earthlink.com",
    user_id: 2,
  },
];

const seedPlayerData = () => Players.bulkCreate(playerData);
module.exports = seedPlayerData;
