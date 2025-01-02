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
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return User
}
