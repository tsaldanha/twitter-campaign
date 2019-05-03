'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    hashtag: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Campaign, {foreignKey: 'CampaignId', hooks: true});
    Item.hasMany(models.Vote);
  };

  return Item;
};