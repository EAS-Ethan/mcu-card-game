let userId = window.localStorage.getItem('userid')
if (userId == null) {
    window.location.pathname = '/login.html'
}

const getCards = async () => {
    const data = await get('/api/cards?all=true')
    let topOfViewCards = document.getElementById("top")
    for (i in data) {
        let character = document.createElement("div")
        character.classList.add("card")
        character.classList.add("still")
        character.innerHTML =
            generateCardHtml(data[i], "marvelCard active")

        topOfViewCards.appendChild(character)
    }
    console.log(data)
}
getCards()