const User = require('./User');
const Players = require('./Players');
const Teetimes = require('./Teetimes');

// Add joins

Players.hasMany(User, {
    foreignKey: 'user_id',
});

Players.belongsTo(User, {
    foreignKey: 'id',
});

Teetimes.hasOne(User,
    {
        foreignKey: 'user_id',

    });

module.exports = { User, Players, Teetimes };
