const User = require('./User');
const Teetimes = require('./Teetimes');

// Add joins
Teetimes.hasOne(User,
    {
        foreignKey: 'user_id',

    });

module.exports = { User, Teetimes};
