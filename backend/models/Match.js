'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Match extends Model {
		static associate(models) {
			Match.belongsToMany(models.Bar, { through: models.Bar_matches, foreignKey: 'Match_ID' })
		}
	}

	Match.init(
		{
			sport: DataTypes.STRING,
			team_1: DataTypes.STRING,
			team_2: DataTypes.STRING,
			match_date: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Match',
		}
	)

	return Match
}
