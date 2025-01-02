'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class RefreshToken extends Model {
		static associate(models) {
			RefreshToken.belongsTo(models.User, { foreignKey: 'User_ID' })
		}
	}

	RefreshToken.init(
		{
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			expiredAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'RefreshToken',
		}
	)

	return RefreshToken
}
