'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			Role.hasMany(models.User, { foreignKey: 'Role_ID' })
		}
	}

	Role.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},

			role: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isIn: [['Gość', 'Użytkownik', 'Właściciel Baru', 'Admin']],
				},
			},
		},
		{
			sequelize,
			modelName: 'Role',
		}
	)

	return Role
}
