const router = require("express").Router();
const req = require("express/lib/request");
const { Pets, User } = require("../../models");
const withAuth = require("../../utils/auth");

// gets all the users saved pets
router.get("/", withAuth, async (req, res) => {
	try {
		const petDB = await Pets.findAll({
			include: [
				{
					model: User,
					through: "user_saved",
					where: { id: req.session.user.id },
				},
			],
		});
		const pet = petDB.map((data) => data.get({ plain: true }));

		// res.json(petDB);
		res.render("savedpets", { pet, loggedIn: req.session.loggedIn });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// creates a row for the saved pet with the included columns
router.post("/", withAuth, async (req, res) => {
	console.log("arrived at backend  ", req.session);
	try {
		// 1. check db for clicked pet, check db for user, put in const's
		const userData = await User.findByPk(req.session.user.id);
		const petData = await Pets.findOne({
			where: { pf_id: req.body.pf_id },
		});
		// 2. if pet exists create the relationship between the user and pet
		if (!petData) {
			const savePet = await Pets.create({
				id: req.body.id,
				type: req.body.type,
				pf_id: req.body.pf_id,
				breeds: req.body.breed,
				age: req.body.age,
				gender: req.body.gender,
				size: req.body.size,
				name: req.body.name,
				description: req.body.description,
				photo: req.body.photo,
				status: req.body.status,
				published_at: req.body.published_at,
				contact: req.body.contact,
			});
			const userSavesPet = await userData.addPets(savePet);
			res.status(200).json(userSavesPet);
		} else {
			const userSavesPet = await userData.addPets(petData);
			res.status(200).json(userSavesPet);
		}
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

// removes a pet from the saved pets list
router.delete("/", async (req, res) => {
	console.log("I'm deleting an entry from the Pets DB");
	try {
		const savedPetCard = await Pets.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!savedPetCard) {
			res.status(404).json({ message: "No pet found with that id!" });
			return;
		}
		res.status(200).json(savedPetCard);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
