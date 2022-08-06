const { User } = require('../models');

const userData = [
    {
        first_name: 'James',
        last_name: 'Plasencia',
        user_name: 'mvpcents',
        role: 'Player',
        email: 'jamesplasencia@gmail.com',
        password: 'bootcamp2022!'
    },

    {
        first_name: 'Jeanette',
        last_name: 'Ralph',
        user_name: 'jeanster',
        role: 'Player',
        email: 'jean.ralph@hotmail.com',
        password: 'Bootcamp2022!!'
    },

    {
        first_name: 'Dave',
        last_name: 'Dorado',
        user_name: 'oddvidaroad',
        role: 'Player',
        email: 'oddvidaroad@gmail.com',
        password: 'B00tcamp2022!!'
    },

    {
        first_name: 'James',
        last_name: 'Ralph',
        user_name: 'james_ralph',
        role: 'Admin',
        email: 'jamesralph71@gmail.com',
        password: 'adminBootcamp2022!'
    },

    {
        first_name: 'Frank',
        last_name: 'Ralph',
        user_name: 'frank_ralph',
        role: 'Admin',
        email: 'frankralph@live.com',
        password: 'adminBootcamp2022!'
    },

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;