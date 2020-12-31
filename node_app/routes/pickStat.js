const { readFile, writeFile } = require('../helpers/data.js')

module.exports = (req, res) => {

    let games = readFile('./data/games.json')
    let cards = readFile('./data/cards.json')


    let { id, user_id, stat } = req.query
    if (!id || !user_id || !stat) {
        return res.json({ error: "Please provide id, user id and stat" })
    }

    if (!games[id]) {
        return res.json({ error: "No game found" })
    }

    // check if player is in the game
    let playerFound = false
    for (player in games[id].players) {
        if (user_id == games[id].players[player].user_id) {
            playerFound = true
        }
    }
    if (!playerFound) {
        return res.json({ error: "you're not playing this game" })
    }

    // is it time to choose stat?

    if (Object.keys(games[id].plays[games[id].plays.length - 1]).length < 2) {
        return res.json({ error: "not time to pick stat" })

    }


    if (games[id].plays.length % 2) { // is odd number
        if (user_id == games[id].user_id) { // is the owner
            let cardPicks = {}

            for (let player_id in games[id].plays[games[id].plays.length - 1]) {
                if (!cards[games[id].plays[games[id].plays.length - 1][player_id]][stat]) {
                    return res.json({ error: "stat doesn't exist" })
                }
                cardPicks[player_id] = cards[games[id].plays[games[id].plays.length - 1][player_id]][stat]
            }

            let highestValue = 0
            for (let user_id in cardPicks) {
                if (cardPicks[user_id] > highestValue) {
                    highestValue = cardPicks[user_id]
                }
            }

            for (let user_id in cardPicks) {
                if (cardPicks[user_id] == highestValue) {
                    games[id].plays[games[id].plays.length - 1].stat = stat
                    games[id].plays[games[id].plays.length - 1].winner = +user_id
                }
            }

            if (games[id].plays.length == 5) {

                let winners = {}
                for (play in games[id].plays) {
                    let winnerId = games[id].plays[play].winner
                    if (!winners[winnerId]) {
                        winners[winnerId] = 1
                    } else {
                        winners[winnerId]++
                    }
                }

                let highestScore = 0
                for (let key in winners) {
                    if (winners[key] > highestScore) {
                        highestScore = winners[key]
                    }
                }

                for (let key in winners) {
                    if (winners[key] == highestScore) {
                        games[id].winner = +key
                    }
                }
            } else {

                games[id].plays.push({})
            }
            writeFile('./data/games.json', games)
            return res.json(games[id])
        }
    } else { // is even
        for (player in games[id].players) {
            if (user_id != games[id].user_id) { // is the other player
                let cardPicks = {}

                for (let player_id in games[id].plays[games[id].plays.length - 1]) {
                    if (!cards[games[id].plays[games[id].plays.length - 1][player_id]][stat]) {
                        return res.json({ error: "stat doesn't exist" })
                    }
                    cardPicks[player_id] = cards[games[id].plays[games[id].plays.length - 1][player_id]][stat]
                }

                let highestValue = 0
                for (let user_id in cardPicks) {
                    if (cardPicks[user_id] > highestValue) {
                        highestValue = cardPicks[user_id]
                    }
                }

                for (let user_id in cardPicks) {
                    if (cardPicks[user_id] == highestValue) {
                        games[id].plays[games[id].plays.length - 1].stat = stat
                        games[id].plays[games[id].plays.length - 1].winner = +user_id
                    }
                }


                if (games[id].plays.length == 5) {

                    let winners = {}
                    for (play in games[id].plays) {
                        let winnerId = games[id].plays[play].winner
                        if (!winners[winnerId]) {
                            winners[winnerId] = 1
                        } else {
                            winners[winnerId]++
                        }
                    }

                    let highestScore = 0
                    for (let key in winners) {
                        if (winners[key] > highestScore) {
                            highestScore = winners[key]
                        }
                    }

                    for (let key in winners) {
                        if (winners[key] == highestScore) {
                            games[id].winner = +key
                        }
                    }
                } else {
                    games[id].plays.push({})
                }
                writeFile('./data/games.json', games)
                return res.json(games[id])
            }
        }
    }


    res.json({ error: "not your turn" })
} 