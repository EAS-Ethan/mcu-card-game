const fs = require('fs')

module.exports = (req, res) => {

    // maybe check to see if the data you need was sent
    let { user_id, max_rounds } = req.body

    // what is game object missing?

    if (!user_id || !max_rounds) {
        res.json({ error: "please BLAH BLAH BLAH" })//that errors good i like it!
    }

    let { games } = JSON.parse(fs.readFileSync('data/games.json'))
    let { cards } = JSON.parse(fs.readFileSync('data/cards.json'));
    // convert all the elements in the array from cards {} to their ids
    cards = cards.map(card => card.id)



    // so this works for the first person

    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    let player_deck = cards.splice(0, 5)

    let newGame = {
        "id": ,
        "user_id": user_id,
        "max_rounds": max_rounds,
        "players": [
            {
                "user_id": user_id,
                "deck": player_deck
            }
        ],
        "rounds": [],
        "full_deck": cards,
        "status": "looking for an opponent"
    }

    games.push(newGame)

    fs.writeFileSync('data/games.json', JSON.stringify({ games }, null, 4))

    res.json(newGame)
}

