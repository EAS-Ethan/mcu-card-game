const fs = require('fs')


module.exports = (req, res) => {
    if (req.body.name == "" || req.body.password == "") {
        return res.json({ error: "Fill in details" })
    }
    let { users } = JSON.parse(fs.readFileSync('data/users.json'));

    for (let user in users) {
        if (req.body.name == users[user].email || req.body.name == users[user].username) {
            if (req.body.password == users[user].password) {
                return res.json(users[user])
            }
            return res.json({ error: "Incorrect password" })

        }
    }
    res.json({ error: "Incorrect email or username" })
}