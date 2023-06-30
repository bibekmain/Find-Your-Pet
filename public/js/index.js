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
	// var header = $('#body');

	// var backgrounds = new Array(
	// 	'url(/images/dog.jpg)','url(images/dog2.jpg)','url(images/cat2.jpeg)','url(images/cat.jpeg)'
	// );
	
	// var current = 0;
	
	// function nextBackground() {
	// 	current++;
	// 	current = current % backgrounds.length;
	// 	header.css('background-image', backgrounds[current]);
	// }
	// setInterval(nextBackground, 1000);
	
	header.css('background-image', backgrounds[0]);