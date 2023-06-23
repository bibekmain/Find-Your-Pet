const sequelize = require('../config/connection');
const { SavedPets } = require('../models');

const petData = require('./petData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await SavedPets.bulkCreate(petData);
};

seedDatabase();
