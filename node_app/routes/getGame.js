const { readFile } = require('../helpers/data.js')

module.exports = (req, res) => {

    let games = readFile('./data/games.json')
    let { id, user_id } = req.query
    if (!id || !user_id) {
        return res.json({ error: "Please provide id and user_id" })
    }

    if (!games[id]) {
        return res.json({ error: "No game found" })
    }

    games[id].players = games[id].players.filter(user => user.user_id == user_id)


    res.json(games[id])
}