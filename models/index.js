const Pets = require("./SavedPets");
const User = require("./User");
const SearchedPets = require("./Search");

User.belongsToMany(Pets, {through: 'user_saved'});

Pets.belongsToMany(User, {through: 'user_saved'});

console.log(typeof Pets);
module.exports = { User, Pets, SearchedPets };
