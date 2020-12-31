let selectedCardIndex = -1
let data
let userId = window.localStorage.getItem('userid')
if (userId == null) {
    window.location.pathname = '/login.html'
}



const play = async () => {

    data = await get('/api/play?')


    for (let i in data.playerCards) {
        let card = document.createElement("div")
        card.classList.add("card")
        card.addEventListener('click', active)
        card.setAttribute("data-index", i)
        card.innerHTML = generateCardHtml(data.playerCards[i])
        document.getElementById("playersCards").appendChild(card)
    }
    let card = document.createElement("div")
    card.id = "cpuCardCard"
    card.classList.add("card")
    card.classList.add("back")
    card.innerHTML = generateCardHtml(data.cpuCards[0])
    document.getElementById("cpuCard").appendChild(card)
}
play()




const active = (e) => {
    if (selectedCardIndex != -1) {
        return
    }
    // deselect all cards
    document.querySelectorAll('.active').forEach(ae => {
        ae.classList.toggle("active")
    })

    // select card tat was clicked
    e.target.classList.toggle("active")

    // null?
    console.log(e.target)
    selectedCardIndex = e.target.getAttribute("data-index")
    console.log(selectedCardIndex)

    document.getElementById("pickACard").classList.remove('active')



    let card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("still")
    card.innerHTML = generateCardHtml(data.playerCards[selectedCardIndex])
    document.getElementById("pickedCardArea").appendChild(card)
    console.log(data.cpuCards[0])

    document.getElementById("statsSelector").classList.add('active')


    // set selectedCardIndex to the card that was clicked index
}

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const selectStat = (stat) => {
    console.log(stat)

    if (data.playerCards[selectedCardIndex][stat] > data.cpuCards[0][stat]) {
        document.getElementById("cpuCardCard").classList.remove('back')
        document.getElementById("cpuCardCard").classList.add('still')
        console.log("You Won")
        document.getElementById("statsSelector").classList.remove('active')
        let statCompare = document.createElement("div")
        statCompare.classList.add("stat-compare")
        statCompare.innerHTML = data.playerCards[selectedCardIndex][stat] + " VS " + data.cpuCards[0][stat]
        let statPicked = document.createElement("div")
        statPicked.innerText = stat
        statPicked.classList.add("stat-picked")
        document.getElementById("statCompare").appendChild(statPicked)
        document.getElementById("statCompare").appendChild(statCompare)
        let messege = document.createElement("div")
        messege.innerText = "You Won This Round"
        messege.classList.add("messege")
        document.getElementById("statCompare").appendChild(messege)
        document.getElementById("pickACard").classList.add('active')
        data.playerCards.push(data.cpuCards[0])
        data.cpuCards.splice(0, 1)
        shuffle(data.playerCards)
        console.log(data.playerCards)

        statCompare.style.color = "green"


    }
    else if (data.playerCards[selectedCardIndex][stat] == data.cpuCards[0][stat]) {
        console.log("Draw")
        document.getElementById("statsSelector").classList.remove('active')
        let statCompare = document.createElement("div")
        statCompare.classList.add("stat-compare")
        statCompare.innerHTML = data.playerCards[selectedCardIndex][stat] + " VS " + data.cpuCards[0][stat]
        let statPicked = document.createElement("div")
        statPicked.innerText = stat
        statPicked.classList.add("stat-picked")
        document.getElementById("statCompare").appendChild(statPicked)
        document.getElementById("statCompare").appendChild(statCompare)
        let messege = document.createElement("div")
        messege.innerText = "You drew, Pick Another Stat"
        messege.classList.add("messege")
        document.getElementById("statCompare").appendChild(messege)
        document.getElementById("statsSelector").classList.add('active')
        statCompare.style.color = "grey"
    }
    else if (data.playerCards[selectedCardIndex][stat] < data.cpuCards[0][stat]) {
        document.getElementById("cpuCardCard").classList.remove('back')
        document.getElementById("cpuCardCard").classList.add('still')
        console.log("You Lost")
        document.getElementById("statsSelector").classList.remove('active')
        let statCompare = document.createElement("div")
        statCompare.classList.add("stat-compare")
        statCompare.innerHTML = data.playerCards[selectedCardIndex][stat] + " VS " + data.cpuCards[0][stat]
        let statPicked = document.createElement("div")
        statPicked.innerText = stat
        statPicked.classList.add("stat-picked")
        document.getElementById("statCompare").appendChild(statPicked)
        document.getElementById("statCompare").appendChild(statCompare)
        let messege = document.createElement("div")
        messege.innerText = "You Lost This Round"
        messege.classList.add("messege")
        document.getElementById("statCompare").appendChild(messege)
        document.getElementById("pickACard").classList.add('active')
        statCompare.style.color = "red"
    }
}
