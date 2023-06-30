const sequelize = require('../config/connection');
var models = require('../models');

const petData = require('./petData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });    
    await models.Pets.bulkCreate(petData);
};

seedDatabase();
