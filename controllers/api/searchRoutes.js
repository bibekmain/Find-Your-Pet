// /api/search

const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { SearchedPets } = require("../../models");

//default search page without results
router.get("/", async (req, res) => {
	try {
		res.render("searchpage", {
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//post endpoint that uses Pet Finder API and seeds SearchedPets db with pets
router.post("/", async (req, res) => {
	function GetPetsFromAPI(type, limit) {
		const pf = new petfinder.Client({
			apiKey: process.env.API_KEY,
			secret: process.env.SECRET,
		});
		pf.animal.search({type, limit})
			.then(async function (response) {
				const search = response.data.animals;
				await SearchedPets.truncate();
				await search.forEach((pet) =>
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
	console.log("Passed Type:", type);
	console.log("Passed Limit:", limit);
	GetPetsFromAPI(type, limit);
	console.log("DB seeded with search results");
});

//get endpoint that displays the searched pets
router.get("/results", async (req, res) => {// /api/search/results
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
