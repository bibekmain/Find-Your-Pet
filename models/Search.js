const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SearchedPets extends Model {}

SearchedPets.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		pf_id: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.STRING,
		},
		breeds: {
			type: DataTypes.STRING,
		},
		age: {
			type: DataTypes.STRING,
		},
		gender: {
			type: DataTypes.STRING,
		},
		size: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		photo: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING,
		},
		published_at: {
			type: DataTypes.STRING,
		},
		contact: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "searchedPets",
	}
);
module.exports = SearchedPets;
