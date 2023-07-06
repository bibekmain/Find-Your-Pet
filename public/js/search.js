const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	let secondsDelay;
	let keyCheckedValue = "";

	//calculate animal type
	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");
	//calculate delay
	keyCheckedValue == 100 ? (secondsDelay = 2000) : (secondsDelay = 1250);

	const limitCheck = document.querySelector("#limitCheck");

	const response = fetch("/api/search", {
		method: "POST",
		body: JSON.stringify({
			keyCheck: keyCheckedValue,
			limitCheck: limitCheck.value,
		}),
		headers: { "Content-Type": "application/json" },
	})
	
	delay(secondsDelay).then(() => document.location.replace("/api/search/results"));//1.5s delay
};

//function that sets a time delay
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
