'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		static associate(models) {
			Review.belongsTo(models.Bar, { foreignKey: 'Bar_ID' })

			Review.belongsTo(models.User, { foreignKey: 'User_ID' })
		}
	}

	Review.init(
		{
			User_ID: DataTypes.INTEGER,
			Bar_ID: DataTypes.INTEGER,
			rating: DataTypes.INTEGER,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Review',
		}
	)

	return Review
}
