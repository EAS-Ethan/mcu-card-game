const { readFile, writeFile } = require('../helpers/data.js')

module.exports = (req, res) => {

    // maybe check to see if the data you need was sent
    let { user_id, name } = req.body

    if (!user_id || !name) {
        return res.json({ error: "please provide user_id and name" })
    }

    // lets fix these 2 lines
    //is that right 
    let games = readFile('./data/games.json')
    let cardsObject = readFile('./data/cards.json')

    let cards = []

    for (let card_id in cardsObject) {
        cardsObject[card_id].id = card_id
        cards.push(cardsObject[card_id])
    }

    // convert all the elements in the array from cards {} to their ids
    cards = cards.map(card => card.id)

    let currentId = 0

    // so this works for the first person
    for (id in games) {

        if (+id > currentId) {
            currentId = +id
        }
    }

    //this randomizes cards
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    let player_deck = cards.splice(0, 5)

    let newGame = {
        "name": name,
        "user_id": user_id,
        "players": [
            {
                "user_id": user_id,
                "deck": player_deck
            }
        ],
        "plays": [{}],
        "full_deck": cards,
        "status": "looking for an opponent"
    }

    games[+currentId + 1] = newGame

    writeFile('./data/games.json', games)

    newGame.id = +currentId + 1

    res.json(newGame)
}

