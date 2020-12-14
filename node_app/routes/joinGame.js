let fs = require('fs')

module.exports = (req, res) => {

    let { games } = JSON.parse(fs.readFileSync('./data/games.json'))


    let { id, user_id } = req.query
    if (!id || !user_id) {
        return res.json({ error: "Please provide id and user id" })
    }



    for (game in games) {
        if (games[game].id == id) {
            if (games[game].players.length == 2) {
                return res.json({ error: "Game full" })
            }
            let newPlayer = {
                "user_id": user_id,
                "deck": games[game].full_deck.splice(0, 5)
            }
            games[game].players.push(newPlayer)
            fs.writeFileSync('./data/games.json', JSON.stringify({ games }))
            return res.json(games[game])
        }
    }






    res.json({ error: "No game found" })
} 