const { teeTimes, Teetimes } = require("../models");

const teetimes = [
  {
    id: 1,
    tee_time_start: "2022-08-06 06:00:00",
    user_id: 3,
    availability: true,
    price: 45.0,
  },
  {
    id: 2,
    tee_time_start: "2022-08-06 06:30:00",
    user_id: 2,
    availability: true,
    price: 45.0,
  },
  {
    id: 3,
    tee_time_start: "2022-08-06 08:00:00",
    user_id: 1,
    availability: true,
    price: 45.0,
  },
  {
    id: 4,
    tee_time_start: "2022-08-06 07:00:00",
    availability: true,
    price: 35.0,
  },
  {
    id: 5,
    tee_time_start: "2022-08-06 07:30:00",
    availability: false,
    price: 35.0,
  },
];

const seedTeetimesData = () => Teetimes.bulkCreate(teetimes);
module.exports = seedTeetimesData;
