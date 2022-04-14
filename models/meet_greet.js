'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event }) {
      // define association here
      meet_greet.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })

      meet_greet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  meet_greet.init({
    meet_greet_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    event_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'events',
        key: 'event_id'
      }
    },
    band_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'band_id'
      }
    },
    meet_start_time:{
      type: DataTypes.DATE,
      allowNull: false
    }, 
    meet_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'meet_greet',
    tableName: 'meet_greets',
    timestamps: false
  });
  return meet_greet;
};

// INSERT INTO meet_greets(event_id, band_id,meet_start_time,meet_end_time) VALUES(2,1,'2022-03-02T05:00:00.000Z','2022-03-02T06:00:00.000Z');