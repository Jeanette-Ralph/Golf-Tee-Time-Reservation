// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

class Teetimes extends Model {}

Teetimes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tee_time_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "user",
        key: "id", // user table id FK
      },
    },
  },
  {
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: "teetimes",
  }
);

module.exports = Teetimes;
