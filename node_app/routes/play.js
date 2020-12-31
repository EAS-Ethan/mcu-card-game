const { readFile } = require('../helpers/data.js')

module.exports = (req, res) => {
    let allCards = readFile('./data/cards.json')
    let cards = []

    // return all cards

    for (let card_id in allCards) {
        allCards[card_id].id = card_id
        cards.push(allCards[card_id])
    }



    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }


    let playerCards = cards.slice(cards.length - 6, cards.length - 1)
    let cpuCards = cards.slice(cards.length - 12, cards.length - 7)

    res.json({ playerCards, cpuCards })
}