const searchButtonHandler = async function (event) {
	event.preventDefault();
	const keyCheck = await document.querySelectorAll(".form-check-input");
	let keyCheckedValue = "";

	keyCheck[0].checked == true ? (keyCheckedValue = "dog") : keyCheck[1].checked == true ? (keyCheckedValue = "cat") : (keyCheckedValue = "");

	const limitCheck = await document.querySelector("#limitCheck");

	const response = await fetch("/api/search", {//there is an issue with loading the page. It is not waiting for the data to come in before replacing document.
		method: "POST",
		body: JSON.stringify({
			keyCheck: keyCheckedValue,
			limitCheck: limitCheck.value,
			// typeValue: keyCheckedValue,
		}),
		headers: { "Content-Type": "application/json" },
	})
	.then(document.location.replace("/api/search/results"));
};

document.querySelector("#searchbutton").addEventListener("click", searchButtonHandler);
