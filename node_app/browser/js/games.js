let userId = window.localStorage.getItem('userid')

if (userId == null) {
    window.location.pathname = '/login.html'
}

$('#createGameButton').addEventListener('click', async () => {
    const response = await post('/api/games', {
        user_id: userId, name: "test game"
    })
    if (response.error) {
        console.log(response.error)
        return
    }
})

const getGames = async () => {
    const { available, joined } = await get('/api/games?user_id=' + userId)

    let availableGamesContainer = document.getElementById("available")
    let joinnedGamesContainer = document.getElementById("joined")

    for (let game in available) {
        let gameItem = document.createElement('div')
        gameItem.classList.add("game-item")
        gameItem.innerText = available[game].name
        gameItem.addEventListener('click', async () => {
            let response = await get(`/api/joinGame?id=${available[game].id}&user_id=${userId}`)

            if (response.error) {
                return console.log(response.error)
            }

            localStorage.setItem("gameid", available[game].id);
            window.location.pathname = '/online.html'

        })
        availableGamesContainer.appendChild(gameItem)
    }


    for (let game in joined) {
        let gameItem = document.createElement('div')
        gameItem.classList.add("game-item")
        gameItem.innerText = joined[game].name
        gameItem.addEventListener('click', async () => {
            localStorage.setItem("gameid", joined[game].id);
            window.location.pathname = '/online.html'
        })
        joinnedGamesContainer.appendChild(gameItem)
    }
}

getGames()
