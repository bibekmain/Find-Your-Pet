const { log } = require("handlebars");
const { get } = require("../api/userRoutes");
import axios from 'axios'; //dont need to use axios but good to learn it as a promise based http client for nodes

const oAuthUrl = 'https://api.petfinder.com/v2/oauth2/token';
const apiKey = 'sXDqH9SCtBtLPk1MYwe77fqvQ0vZv781AO7niLSL2BzZNVspm8';
//use  process.env.Pet_Finder_Secret  to access the API secret
var authSessionKey = '';//temporary session keys for PetFinder API will be stored here

//TODO:add event-listener for the zipcode search bar


//TODO:add a post request call to the petfinder api using api key and secret.
//create function that refreshes bearer token. Post request with grant_type, client_id, and client_secret to: https://api.petfinder.com/v2/oauth2/token
// request for initial bearer token: curl -d "grant_type=client_credentials&client_id=sXDqH9SCtBtLPk1MYwe77fqvQ0vZv781AO7niLSL2BzZNVspm8&client_secret=9gihYG4IPjnXYOFsNi1xBtkjeFbxbY56WokQbzRm" https://api.petfinder.com/v2/oauth2/token

const getAuthKey = await axios.post(oAuthUrl, 
    {
        "grant_type": "client_credentials",
        "client_id": apiKey,
        "client_secret": process.env.Pet_Finder_Secret
    },
    {
        headers:{
            'content-type': 'text/json'
        }
    }).then((response) => console.log(response));

(function(){
   getAuthKey();
})




//TODO:after request, parse the data and use it to create cards for different pets.
//each pet will probably be saved using their id in the user's db.

