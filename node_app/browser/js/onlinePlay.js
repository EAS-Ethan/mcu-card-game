let user_id = window.localStorage.getItem('userid')
let game_id = window.localStorage.getItem('gameid')
let allCards
if (user_id == null) {
    window.location.pathname = '/login.html'
}

const getGameData = async () => {
    const game = await get(`api/getGame?id=${game_id}&user_id=${user_id}`);
    const cards = await get(`api/cards?ids=${JSON.stringify(game.players[0].deck)}`);
    allcards = await get(`api/cards?all=true`);
    renderCards(cards)
    renderSelectedCards(game.plays[game.plays.length - 1])
    renderStats(game.plays, game.user_id)
    renderResults(game.plays)
    renderWinner(game)
}

getGameData()

setInterval(getGameData, 1 * 1000);

const renderCards = (cards) => {
    document.getElementById("pickACard").classList.remove('active')

    document.getElementById("playersCards").innerHTML = ""
    for (let i in cards) {
        let card = document.createElement("div")
        card.classList.add("card")
        card.addEventListener('click', handleCardClick)
        card.setAttribute("data-id", cards[i].id)
        card.innerHTML = generateCardHtml(cards[i])
        document.getElementById("playersCards").appendChild(card)
    }
}

const renderWinner = (game) => {
    $('#winnerScreen').innerHTML = ``
    if (game.winner) {
        $('#winnerScreen').classList.add('active')

        for (let play in game.plays) {
            let newDiv = document.createElement('div')
            let gameWinner = document.createElement('div')

            // if (plays[plays.length - 2]) {
            let winloss
            let gameWinLose
            if (game.plays[play].winner == user_id) {
                winloss = 'Won'
            } else {
                winloss = 'Lost'
            }

            let opponentId
            for (let key in game.plays[play]) {
                if (!isNaN(key) && key != user_id) {
                    console.log(key)
                    opponentId = key
                }
            }

            let allCardsObj = {}

            for (let card in allcards) {
                allCardsObj[allcards[card].id] = allcards[card]
            }

            // if ()
            // all cards is an array not an object
            // we can't do allcards[id]
            // no it's that ^
            newDiv.classList.add('endResultContainer')
            // gameWinner.innerHTML = `You ${}`
            newDiv.innerHTML = `
        <div class="stat-compare">You ${winloss} Round ${+play + 1}</div>
        <div class="stat-compare">Stat Chosen: ${game.plays[play].stat}</div>
        <div class="stat-compare">You got: ${allCardsObj[game.plays[play][user_id]][game.plays[play].stat]}</div>
        <div class="stat-compare">They got: ${allCardsObj[game.plays[play][opponentId]][game.plays[play].stat]}</div>
    `


            $('#winnerScreen').appendChild(newDiv)
        }


    }
}

const renderResults = (plays) => {


    if (plays.length == 5 && plays[4].winner) {
        // final screen
        let winloss
        if (plays[4].winner == user_id) {
            winloss = 'Won'
        } else {
            winloss = 'Lost'
        }
        let opponentId
        for (let key in plays[4]) {
            if (!isNaN(key) && key != user_id) {
                console.log(key)
                opponentId = key

            }
        }

        let allCardsObj = {}

        for (let card in allcards) {
            allCardsObj[allcards[card].id] = allcards[card]
        }
        // all cards is an array not an object
        // we can't do allcards[id]
        // no it's that ^

        $('#resultDiv').innerHTML = `
            <div class="round-title">You ${winloss} The Last Round</div>
            <div class="stat-compare">Stat Chosen: ${plays[4].stat}</div>
            <div class="stat-score">You got: ${allCardsObj[plays[4][user_id]][plays[4].stat]}</div>
            <div class="stat-score">They got: ${allCardsObj[plays[4][opponentId]][plays[4].stat]}</div>
        `

        return
    }
    $('#resultDiv').innerHTML = ``
    console.log(plays[plays.length - 2])
    // if (plays[plays.length - 2]) {
    let winloss
    if (plays[plays.length - 2].winner == user_id) {
        winloss = 'Won'
    } else {
        winloss = 'Lost'
    }
    let opponentId
    for (let key in plays[plays.length - 2]) {
        if (!isNaN(key) && key != user_id) {
            console.log(key)
            opponentId = key
        }
    }

    let allCardsObj = {}

    for (let card in allcards) {
        allCardsObj[allcards[card].id] = allcards[card]
    }
    // all cards is an array not an object
    // we can't do allcards[id]
    // no it's that ^

    $('#resultDiv').innerHTML = `
        <div class="round-title">You ${winloss} The Last Round</div>
        <div class="stat-compare">Stat Chosen: ${plays[plays.length - 2].stat}</div>
        <div class="stat-score">You got: ${allCardsObj[plays[plays.length - 2][user_id]][plays[plays.length - 2].stat]}</div>
        <div class="stat-score">They got: ${allCardsObj[plays[plays.length - 2][opponentId]][plays[plays.length - 2].stat]}</div>
    `

}

const renderSelectedCards = (latestPlay) => {
    let allCardsObj = {}

    for (let card in allcards) {
        allCardsObj[allcards[card].id] = allcards[card]
    }
    document.getElementById("pickedCardArea").innerHTML = ""
    document.getElementById("cpuCard").innerHTML = ""
    for (let key in latestPlay) {
        if (!isNaN(key)) {

            if (key == user_id) {
                let card = document.createElement("div")
                card.classList.add("card")
                card.classList.add("still")
                card.innerHTML = generateCardHtml(allCardsObj[latestPlay[key]])
                document.getElementById("pickedCardArea").appendChild(card)
            } else {
                let card = document.createElement("div")
                card.classList.add("card")
                card.classList.add("back")
                card.innerHTML = generateCardHtml(allCardsObj[latestPlay[key]])
                document.getElementById("cpuCard").appendChild(card)
            }
        }
    }
}

const renderStats = (plays, hostUser_id) => {
    document.getElementById("statsSelector").classList.remove('active')

    if (Object.keys(plays[plays.length - 1]).length == 2) {
        if (plays.length % 2 && hostUser_id == user_id) {
            // show stats
            document.getElementById("statsSelector").classList.add('active')

        }
        if (!(plays.length % 2) && hostUser_id != user_id) {
            // show stats
            document.getElementById("statsSelector").classList.add('active')

        }
    }
}

const selectStat = async (stat) => {
    const response = await get(`/api/pickStat?id=${game_id}&user_id=${user_id}&stat=${stat}`)
    if (response.error) {
        console.log(response.error)
        return
    }
    getGameData()


}


const handleCardClick = async (e) => {

    card_id = e.target.getAttribute("data-id")

    const response = await get(`/api/pickCard?id=${game_id}&user_id=${user_id}&card_id=${card_id}`)

    if (response.error) {
        console.log(response.error)
        return
    }


    // document.getElementById("statsSelector").classList.add('active')

    getGameData()
}