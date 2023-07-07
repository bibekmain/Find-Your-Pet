let lat = '37.8715';
let lng = '-122.2730';

const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	let secondsDelay = 2;
	let keyCheckedValue = "";

	//calculate animal type
	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");
	//calculate delay
	keyCheckedValue == 100 ? (secondsDelay = 2000) : (secondsDelay = 1500);

	const limitCheck = document.querySelector("#limitCheck");
	const response = fetch("/api/search", {
		method: "POST",
		body: JSON.stringify({
			keyCheck: keyCheckedValue,
			limitCheck: limitCheck.value,
			lat: lat,
			lng: lng,
		}),
		headers: { "Content-Type": "application/json" },
	})
	
	delay(secondsDelay).then(() => document.location.replace("/api/search/results"));//1.5s delay
};

//function that sets a time delay
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
	// Prompt user for permission to access their location
	navigator.geolocation.getCurrentPosition(
	  // Success callback function
	  (position) => {
		// Get the user's latitude and longitude coordinates
		lat = position.coords.latitude;
		lng = position.coords.longitude;
  
		// Do something with the location data, e.g. display on a map
		console.log(`Latitude: ${lat}, longitude: ${lng}`);
	  },
	  // Error callback function
	  (error) => {
		// Handle errors, e.g. user denied location sharing permissions
		console.error("Error getting user location:", error);
	  }
	);
  } else {
	// Geolocation is not supported by the browser
	console.error("Geolocation is not supported by this browser.");
  }

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
