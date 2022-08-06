const sequelize = require('../config/connection');
const seedPlayerData = require('./playerSeeds');
const seedTeetimesData = require('./teeTimeSeeds');
const seedUser = require('./userSeeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPlayerData();
  await seedTeetimesData();
  await seedUser();

  process.exit(0);
};

seedAll();