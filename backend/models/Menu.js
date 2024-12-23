'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Menu extends Model {
		static associate(models) {
			Menu.belongsTo(models.Bar, { foreignKey: 'Bar_ID' })

			Menu.hasMany(models.Menu_Review, { foreignKey: 'Menu_ID' })
		}
	}

	Menu.init(
		{
			Bar_ID: DataTypes.INTEGER,
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			price: DataTypes.DECIMAL(10, 2),
			image_url: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Menu',
		}
	)

	return Menu
}
