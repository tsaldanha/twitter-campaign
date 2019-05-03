'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hashtag: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Campaign.associate = function(models) {
    Campaign.hasMany(models.Item);
  };
  return Campaign;
};