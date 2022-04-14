'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event, stage }) {
      set_time.belongsTo(Band, {
        foreignKey: "band_id",
        as: 'band'
      })

      set_time.belongsTo(Event,{
        foreignKey: "event_id",
        as: "event"
      })

      set_time.belongsTo(stage,{
        foreignKey: "stage_id",
        as: "stage"
      })
    }
  }
  set_time.init({
    set_time_id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    event_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'events',
        key: 'event_id'
      }
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stages',
        key: 'stage_id'
      }
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'band_id'
      }
    },
    start_time:{
      type: DataTypes.DATE,
      allowNull: false
    }, 
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'set_time',
    tableName: 'set_times',
    timestamps: false
  });
  return set_time;
};
// INSERT INTO set_times (event_id, stage_id, band_id, start_time, end_time) VALUES(2,1,1,'2022-03-02T05:00:00.000Z','2022-03-02T06:00:00.000Z');