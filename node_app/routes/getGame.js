let fs = require('fs')

module.exports = (req, res) => {

    let { games } = JSON.parse(fs.readFileSync('./data/games.json'))
    let { id } = req.query
    if (!id) {
        return res.json({ error: "Please provide id" })
    }

    for (game in games) {
        if (games[game].id == id) {
            return res.json(games[game])
        }
    }

    res.json({ error: "No game found" })
} 