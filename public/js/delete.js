const delButtonHandler = async (event) => {
    event.preventDefault();

    if (event.target.matches(".unsaveBtn")) {
    let btnElId = event.target.id;
    console.log("Trying to delete  ", btnElId)
            const response = await fetch(`/api/pets/${{btnElId}}`, {
        method: 'DELETE',
    });

        if (response.ok) {
            document.location.replace('/pets');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('#savedpetscontainer')
    .addEventListener('click', delButtonHandler);