'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hashtag: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Campaign.associate = function(models) {
    // associations can be defined here
  };
  return Campaign;
};