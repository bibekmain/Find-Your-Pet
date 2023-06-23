const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const sequelize = require("../../config/connection");
const { SearchedPets } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
	try {
		res.render("searchpage", {
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	function GetPetsFromAPI(type, limit) {
		const pf = new petfinder.Client({
			apiKey: process.env.API_KEY,
			secret: process.env.SECRET,
		});
		pf.animal
			.search({
				type,
				limit,
			})
			.then(function (response) {
				const search = response.data.animals;
				SearchedPets.truncate();
				search.forEach((pet) =>
					SearchedPets.create({
						type: pet.type,
						pf_id: pet.id,
						breeds: pet.breeds.primary,
						age: pet.age,
						gender: pet.gender,
						size: pet.size,
						name: pet.name,
						description: pet.description,
						photo: pet.primary_photo_cropped?.full,
						status: pet.status,
						published_at: pet.published_at,
						contact: pet.contact.email,
					})
				);
			})

			.catch((err) => console.log(err));
	}

	let type = req.body.keyCheck;
	let limit = req.body.limitCheck;
	GetPetsFromAPI(type, limit);
	console.log("DB seeded with search results");
});

router.get("/results", async (req, res) => {
	try {
		const dbPetData = await SearchedPets.findAll();
		const petData = dbPetData.map((pd) => pd.get({ plain: true }));
		console.log("/results get route");
		console.log(petData);
		return res.render("searchresults", { petData, loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
