'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Menu_Review extends Model {
		static associate(models) {
			Menu_Review.belongsTo(models.Menu, { foreignKey: 'Menu_ID' })

			Menu_Review.belongsTo(models.User, { foreignKey: 'User_ID' })
		}
	}

	Menu_Review.init(
		{
			Menu_ID: DataTypes.INTEGER,
			User_ID: DataTypes.INTEGER,
			rating: DataTypes.DECIMAL(3, 2),
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Menu_Review',
		}
	)

	return Menu_Review
}
