'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    twitter_id: DataTypes.STRING
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.Campaign, {foreignKey: 'ItemId', hooks: true});
  };
  Vote.removeAttribute('id');
  return Vote;
};