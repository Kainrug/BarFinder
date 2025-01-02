'use strict'

module.exports = (sequelize, DataTypes) => {
	const Bar_matches = sequelize.define('Bar_matches', {
		Bar_ID: {
			type: DataTypes.INTEGER,
			references: { model: 'Bars', key: 'id' },
		},
		Match_ID: {
			type: DataTypes.INTEGER,
			references: { model: 'Matches', key: 'id' },
		},
	})

	return Bar_matches
}
