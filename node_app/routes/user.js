const fs = require('fs')

module.exports = (req, res) => {
    let { id } = req.query
    if (!id) {
        res.jsom({ error: 'id is required' })
    }

    let { users } = JSON.parse(fs.readFileSync('data/users.json'));

    for (let user in users) {
        if (id == users[user].id) {
            delete users[user].password
            return res.json(users[user])
        }
    }
    res.json({ error: "No user found" })
}