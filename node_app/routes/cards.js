const fs = require('fs')

// api/cards?ids=[6,2,3,9,5,32,7]
module.exports = (req, res) => {
    let { ids, all } = req.query
    let { cards: allCards } = JSON.parse(fs.readFileSync('data/cards.json'));
    if (all) {
        return res.json(allCards)
    }

    let cards = []

    let idArray = JSON.parse(ids)

    for (i in idArray) {
        for (j in allCards) {
            if (idArray[i] == allCards[j].id) {
                cards.push(allCards[j])
            }
        }



    }

    res.json(cards)
}