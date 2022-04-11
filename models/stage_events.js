'use strict';
const {
  Model
} = require('sequelize');
const stage = require('./stage');
module.exports = (sequelize, DataTypes) => {
  class stage_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stage_events.init({
    stage_events_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    stage_id:{
      type:DataTypes.INTEGER,
      references: {
        model: 'stages',
        key: 'stage_id'
      }
    },
    event_id:{
      type:DataTypes.INTEGER,
      references: {
        model: 'events',
        key: 'event_id'
      }
    },
  }, {
    sequelize,
    modelName: 'stage_event',
    tableName: 'stage_events',
    timestamps: false
  });
  return stage_events;
};