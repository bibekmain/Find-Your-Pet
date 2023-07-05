const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	const delaySeconds = 500;
	let keyCheckedValue = "";

	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");

	const limitCheck = await document.querySelector("#limitCheck");

	const response = fetch("/api/search", {
		method: "POST",
		body: JSON.stringify({
			keyCheck: keyCheckedValue,
			limitCheck: limitCheck.value,
		}),
		headers: { "Content-Type": "application/json" },
	})
	delay(1500).then(() => document.location.replace("/api/search/results"));//1.5s delay
};

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
