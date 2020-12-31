const express = require('express')
const app = express()


// import our routeFunctions
const cards = require('./routes/cards.js')
const play = require('./routes/play.js')
const signup = require('./routes/signup.js')
const login = require('./routes/login.js')
const user = require('./routes/user.js')
const postGames = require('./routes/postGames.js')
const getGames = require('./routes/getGames.js')
const putGames = require('./routes/putGames.js')
const joinGame = require('./routes/joinGame.js')
const getGame = require('./routes/getGame.js')
const pickCard = require('./routes/pickCard.js')
const pickStat = require('./routes/pickStat.js')




app.use(express.json())

// serve our browser files (index.html, js/main.js) etc...
app.use(express.static('browser'))


// define our routes
app.get('/api/cards', cards)
app.get('/api/play', play)
app.post('/api/signup', signup)
app.post('/api/login', login)
app.get('/api/user', user)
app.get('/api/games', getGames)
app.post('/api/games', postGames)
app.put('/api/games', putGames)
app.get('/api/joinGame', joinGame)
app.get('/api/getGame', getGame)
app.get('/api/pickCard', pickCard)
app.get('/api/pickStat', pickStat)






app.listen(80)