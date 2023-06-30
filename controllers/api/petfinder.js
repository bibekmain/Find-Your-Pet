const axios = require('axios');
const search = require('../../public/js/search');
const { all } = require('./searchRoutes');

const oAuthUrl = 'https://api.petfinder.com/v2/oauth2/token';
const apiKey = process.env.API_KEY;

//temporary session keys and animal data for PetFinder API will be stored here
var authSessionKey;
var authSessionType;
var animalData;

//TODO:add a post request call to the petfinder api using api key and secret.
//Function that refreshes bearer token. Post request with grant_type, client_id, and client_secret to: https://api.petfinder.com/v2/oauth2/token
async function getAuthKey(){
   const keyInfo = await axios.post(oAuthUrl, 
    {
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: process.env.PetFinderSecret,
    },);
    
    authSessionKey = keyInfo.data.access_token;
    authSessionType = keyInfo.data.token_type;

    return {authSessionKey, authSessionType};
}

async function getSearch(animalType, numPerPage){//takes animal type and num results per page
    let reqUrl = `https://api.petfinder.com/v2/animals?sort=recent&limit=${numPerPage}&type=${animalType}&page=2`;
    const res = await axios.get(reqUrl,
        {
            headers: {
                Authorization: `${authSessionType} ${authSessionKey}`
            }
        });

    animalData = res.data.animals;
    return animalData;
}



module.exports = {getAuthKey, getSearch};