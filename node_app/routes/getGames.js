const { readFile } = require('../helpers/data.js')

module.exports = (req, res) => {
    let games = readFile("./data/games.json")
    let available = []
    let joined = []

    const { user_id } = req.query

    for (let id in games) {
        for (let player in games[id].players) {
            if (games[id].players[player].user_id == user_id && !games[id].winner) {
                games[id].id = +id
                joined.push(games[id])
            }
        }
        if (games[id].players.length != 2) {
            games[id].id = +id
            available.push(games[id])
        }
    }
    res.json({ available, joined })
}

