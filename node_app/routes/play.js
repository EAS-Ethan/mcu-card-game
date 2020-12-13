const fs = require('fs')

module.exports = (req, res) => {
    let { cards } = JSON.parse(fs.readFileSync('data/cards.json'));

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