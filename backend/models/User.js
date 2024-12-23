'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.belongsTo(models.Role, { foreignKey: 'Role_ID' })

			User.hasMany(models.Review, { foreignKey: 'User_ID' })

			User.hasMany(models.Subscription, { foreignKey: 'User_ID' })
		}
	}

	User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return User
}
