'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Subscription extends Model {
		static associate(models) {
			Subscription.belongsTo(models.Bar, { foreignKey: 'Bar_ID' })

			Subscription.belongsTo(models.Match, { foreignKey: 'Match_ID' })

			Subscription.belongsTo(models.User, { foreignKey: 'User_ID' })
		}
	}

	Subscription.init(
		{
			Bar_ID: DataTypes.INTEGER,
			Match_ID: DataTypes.INTEGER,
			User_ID: DataTypes.INTEGER,
			users_to_come: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Subscription',
		}
	)

	return Subscription
}
