const { readFile } = require('../helpers/data.js')

module.exports = (req, res) => {
    let { ids, all } = req.query
    let allCards = readFile('./data/cards.json')
    let idArray
    if (ids) {
        idArray = JSON.parse(ids)
    }
    let cards = []

    // return all cards
    if (all) {
        for (let card_id in allCards) {
            allCards[card_id].id = card_id
            cards.push(allCards[card_id])
        }
        return res.json(cards)
    }

    // return cards for the ids provided
    for (let i in idArray) {
        for (let card_id in allCards) {
            if (idArray[i] == card_id) {
                allCards[card_id].id = card_id
                cards.push(allCards[card_id])

            }
        }
    }

    // localhost/api/cards?ids=[1,2,3,4]

    res.json(cards)
}