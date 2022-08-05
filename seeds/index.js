const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  // add your seeds conts here ie userSeeds(); etc.
  process.exit(0);
};

seedAll();
