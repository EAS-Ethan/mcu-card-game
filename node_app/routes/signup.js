const fs = require('fs')

// api/cards?ids=[6,2,3,9,5,32,7]
module.exports = (req, res) => {
    if (
        req.body.first_name == "" ||
        req.body.last_name == "" ||
        req.body.email == "" ||
        req.body.username == "" ||
        req.body.password == ""
    ) {
        return res.json({ error: "Fill in details" })
    }
    let { users } = JSON.parse(fs.readFileSync('data/users.json'));
    let currentId = 0
    for (let user in users) {
        if (users[user].id > currentId) {
            currentId = users[user].id
        }
        if (req.body.email == users[user].email) {
            return res.json({ error: "Email already in use" })
        }
        if (req.body.username == users[user].username) {
            return res.json({ error: "Username taken" })
        }
    }

    let newUser = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "username": req.body.username,
        "password": req.body.password,
        "id": currentId + 1
    }
    users.push(newUser)
    fs.writeFileSync('data/users.json', JSON.stringify({ users }))
    res.json(newUser)
}