require("dotenv").config();

var pf = new petfinder.Client({
	apiKey: process.env.API_KEY,
	secret: process.env.SECRET,
});

pf.animal
	.search({
		type: "cat",

		limit: 100,
	})
	.then(function (response) {
		console.log(response.data);
		// Do something with `response.data.animals`
	})
	.catch(function (error) {
		console.log(error);
		// Handle the error
	});
