const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	let secondsDelay;
	let keyCheckedValue = "";

	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");
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

	delay(secondsDelay).then(() => document.location.reload());// delay depending on size of search request
};

const saveBtnHandler = async function (event) {
	event.preventDefault();

	//redirects the target to element with dataset
	let revisedTarget = event.target;
	if (event.target.matches(".fa-heart")){
		revisedTarget = event.target.parentNode;
	}

	if (revisedTarget.matches(".favoritepet")) {
		const response = await fetch("/api/pets", {
			method: "POST",
			body: JSON.stringify(revisedTarget.dataset),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			const data = await response.json();
			console.log("PET SAVED***  ", data);
		}
	}
};

//function that sets a time delay
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

document
	.querySelector("#searchresultscontainer")
	// event delegation class favoritepet
	.addEventListener("click", saveBtnHandler);

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
