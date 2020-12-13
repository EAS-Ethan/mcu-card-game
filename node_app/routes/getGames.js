const fs = require('fs')

module.exports = (req, res) => {
    let { games } = JSON.parse(fs.readFileSync('data/games.json'))
    let filteredGames = []
    for (let game in games) {
        if (games[game].players.length != 2) {
            filteredGames.push(games[game])
        }
    }
    res.json(filteredGames)
}
