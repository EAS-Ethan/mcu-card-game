let userId = window.localStorage.getItem('userid')
console.log(userId)

if (userId == null) {
    window.location.pathname = '/login.html'
}

const main = async () => {
    const data = await get('/api/user?id=' + userId)
    console.log(data)
    $('#usernameContainer').innerText = data.first_name
}
main()

const getViewCards = () => {
    window.location.pathname = "/viewcards.html";
}

const getPlay = () => {
    window.location.pathname = "/play.html";
}