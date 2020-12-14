const fs = require('fs')

module.exports = (req, res) => {

    // maybe check to see if the data you need was sent
    let { user_id } = req.body

    // what is game object missing?

    if (!user_id) {
        return res.json({ error: "please BLAH BLAH BLAH" })//that errors good i like it!
    }

    let { games } = JSON.parse(fs.readFileSync('data/games.json'))
    let { cards } = JSON.parse(fs.readFileSync('data/cards.json'));
    // convert all the elements in the array from cards {} to their ids
    cards = cards.map(card => card.id)

    let currentId = 0


    // so this works for the first person
    for (game in games) {
        if (games[game].id > currentId) {
            currentId = games[game].id
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
        "id": currentId + 1,
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

    games.push(newGame)

    fs.writeFileSync('data/games.json', JSON.stringify({ games }, null, 4))

    res.json(newGame)
}

