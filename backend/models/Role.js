'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			Role.hasOne(models.User, { foreignKey: 'Role_ID' })
		}
	}

	Role.init(
		{
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Role',
		}
	)

	return Role
}
