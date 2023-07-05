const delButtonHandler = async (event) => {
    event.preventDefault();
    
    let revisedTarget = event.target;
    if (event.target.matches(".fa-heart")){
		revisedTarget = event.target.parentNode;
	}

    if (revisedTarget.matches(".unsaveBtn")) {
        let btnElId = revisedTarget.id;
        console.log("Trying to delete  ", btnElId)

        const response = await fetch(`/api/pets/${btnElId}`, {//TODO: delete pet does not work
            method: 'DELETE',
        });

        if(response.ok) {
            console.log("Pet Deleted");
            document.location.replace('/pets');
        } else {
            alert('Failed to unsave pet');
        }
    }
};

document
    .querySelector('#savedpetscontainer')
    .addEventListener('click', delButtonHandler);