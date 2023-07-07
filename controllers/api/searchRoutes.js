// /api/search

const router = require("express").Router();
const petfinder = require("@petfinder/petfinder-js");
const { SearchedPets } = require("../../models");
const geo2zip = require("geo2zip");
const usZips = require("us-zips/array");

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
	console.log(req.body.lat);
	console.log(req.body.lng);
	const tmpLocation = {
		latitude: req.body.lat,
		longitude: req.body.lng,
	};
	result = await geo2zip.geo2zip(tmpLocation);
	console.log(result);
	const zipcode = result;
	function GetPetsFromAPI(type, limit,zipcode) {
		const pf = new petfinder.Client({
			apiKey: process.env.API_KEY,
			secret: process.env.SECRET,
		});
		pf.animal.search(({type: type, limit: limit, location: String(zipcode)}))
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
	let latitude = req.body.lat;
	let longitude = req.body.lng;
	console.log("Passed Type:", type);
	console.log("Passed Limit:", limit);
	console.log("Pass Lat,Long: ", latitude, longitude);
	GetPetsFromAPI(type, limit,zipcode);
	console.log("DB seeded with search results");
});

//get endpoint that displays the searched pets
router.get("/results", async (req, res) => {// /api/search/results
	try {
		const dbPetData = await SearchedPets.findAll();
		const petData = dbPetData.map((pd) => pd.get({ plain: true }));
		console.log("/results get route");
		console.log(petData);
		console.log(req.body.lat);
		console.log(req.body.lng);
		return res.render("searchresults", { petData, loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
