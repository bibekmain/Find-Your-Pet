var apiKey = 'sXDqH9SCtBtLPk1MYwe77fqvQ0vZv781AO7niLSL2BzZNVspm8';
//use  process.env.Pet_Finder_Secret  to access the API secret
var authSessionKey = '';

//TODO:add event-listener for the zipcode search bar //or have event listener somewhere else that will call a function here
// document.addEventListener('DOMContentLoaded', bindButtons); //after dom content loads, run bindButtons

// function bindButtons(){ 
// 	document.getElementById('submitZip').addEventListener('click', function(event){
// 		event.preventDefault();
// 		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
// 		var url = 'http://api.petfinder.com/pet.getRandom';
//     });
// }


//TODO:add a get request call to the petfinder api using api key and secret.

//TODO:create function that refreshes bearer token.
// request for initial bearer token: curl -d "grant_type=client_credentials&client_id=sXDqH9SCtBtLPk1MYwe77fqvQ0vZv781AO7niLSL2BzZNVspm8&client_secret=9gihYG4IPjnXYOFsNi1xBtkjeFbxbY56WokQbzRm" https://api.petfinder.com/v2/oauth2/token

//TODO:after request parse the data and use it to create cards for different pets.

