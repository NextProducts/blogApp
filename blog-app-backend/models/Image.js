const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define("Image", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Post);
  };
  return Image;
};
