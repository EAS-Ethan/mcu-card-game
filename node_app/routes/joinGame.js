const { readFile, writeFile } = require('../helpers/data.js')

module.exports = (req, res) => {
    let { id, user_id } = req.query
    let games = readFile('./data/games.json')

    if (!id || !user_id) {
        return res.json({ error: "Please provide id and user id" })
    }

    if (!games[id]) {
        return res.json({ error: "No game found" })
    }

    if (games[id].players.length == 2) {
        return res.json({ error: "Game full" })
    }

    let newPlayer = {
        "user_id": +user_id,
        "deck": games[id].full_deck.splice(0, 5)
    }
    games[id].players.push(newPlayer)
    writeFile('./data/games.json', games)
    games[id].id = +id
    return res.json(games[id])

} 