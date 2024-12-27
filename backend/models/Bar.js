'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Bar extends Model {
		static associate(models) {
			Bar.belongsToMany(models.Match, { through: models.Bar_matches, foreignKey: 'Bar_ID' })

			Bar.hasMany(models.Review, { foreignKey: 'Bar_ID' })

			Bar.hasMany(models.Menu, { foreignKey: 'Bar_ID' })
		}
	}

	Bar.init(
		{
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			description: DataTypes.STRING,
			city: DataTypes.STRING,
			latitude: DataTypes.DECIMAL(9, 6),
			longitude: DataTypes.DECIMAL(9, 6),
			image_url: DataTypes.STRING,
			averageRating: {
				type: DataTypes.DECIMAL(3, 2),
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: 'Bar',
		}
	)

	return Bar
}
