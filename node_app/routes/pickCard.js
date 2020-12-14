let fs = require('fs')

module.exports = (req, res) => {

    let { games } = JSON.parse(fs.readFileSync('./data/games.json'))


    let { id, user_id, card_id } = req.query
    if (!id || !user_id || !card_id) {
        return res.json({ error: "Please provide id, user id and card id" })
    }

    for (game in games) {
        if (games[game].id == id) {
            for (player in games[game].players) {
                if (user_id == games[game].players[player].user_id) {
                    if (games[game].players[player].deck.indexOf(+card_id) == -1) {
                        return res.json({ error: "Card not in your deck" })
                    }
                    // hewre we check to see which round and play we're at
                    // if there is not play then we create a play
                    if (games[game].plays.length == 5) {



                        let winners = {}

                        for (play in games[game].plays) {
                            let winnerId = games[game].plays[play].winner
                            if (!winners[winnerId]) {
                                winners[winnerId] = 1
                            } else {
                                winners[winnerId]++
                            }
                        }

                        // winners: 
                        // {
                        //     "1": 4,
                        //     "2": 2
                        // }

                        let highestScore = 0
                        for (let key in winners) {
                            if (winners[key] > highestScore) {
                                highestScore = winners[key]
                            }
                        }

                        // higestscore:
                        // 4
                        for (let key in winners) {
                            if (winners[key] == highestScore) {
                                games[game].winner = +key
                                fs.writeFileSync('./data/games.json', JSON.stringify({ games }))
                                return res.json(games[game])
                            }
                        }






                    }


                    if (games[game].plays[games[game].plays.length - 1][user_id]) {
                        console.log("card played")
                    }

                    games[game].plays[games[game].plays.length - 1][user_id] = +card_id




                    fs.writeFileSync('./data/games.json', JSON.stringify({ games }))
                    return res.json(games[game])
                }

            }



        }
    }






    res.json({ error: "No game found" })
} 