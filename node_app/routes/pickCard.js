const { readFile, writeFile } = require('../helpers/data.js')

module.exports = (req, res) => {
    let games = readFile('./data/games.json')


    let { id, user_id, card_id } = req.query

    console.log(user_id, card_id)
    if (!id || !user_id || !card_id) {
        return res.json({ error: "Please provide id, user id and card id" })
    }

    if (!games[id]) {
        return res.json({ error: "No game found" })
    }

    for (player in games[id].players) {
        if (user_id == games[id].players[player].user_id) {

            if (games[id].players[player].deck.indexOf(card_id) == -1) {
                return res.json({ error: "Card not in your deck" })
            }

            if (games[id].plays[games[id].plays.length - 1][user_id]) {
                return res.json({ error: "you've already played a card this turn." })
            }


            // game found, plauyer found, card is in deck hasn't made a move

            // hewre we check to see which round and play we're at
            // if there is not play then we create a play





            games[id].players[player].deck.splice(games[id].players[player].deck.indexOf(card_id), 1)
            games[id].plays[games[id].plays.length - 1][user_id] = +card_id



            writeFile('./data/games.json', games)
            return res.json(games[id])
        }


    }
    return res.json({ error: "You aren't playing this game" })

} 