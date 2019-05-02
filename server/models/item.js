'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    hashtag: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Campaign, {foreignKey: 'campaign_id', hooks: true});
  };
  return Item;
};