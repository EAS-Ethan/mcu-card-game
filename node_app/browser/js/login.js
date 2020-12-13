const login = async () => {
    $('#loginError').innerText = ""
    let data = await post('/api/login', {
        name: $('#nameInput').value,
        password: $('#passwordInput').value
    })

    if (data.error) {
        $('#loginError').innerText = data.error
        return
    }

    localStorage.setItem("userid", data.id);
    window.location.pathname = '/home.html'

}

const register = async () => {
    $('#signupError').innerText = ""
    let data = await post('/api/signup', {
        first_name: $('#firstNameInput').value,
        second_name: $('#secondNameInput').value,
        username: $('#usernameInput').value,
        email: $('#emailInput').value,
        password: $('#password').value
    })

    if (data.error) {
        $('#signupError').innerText = data.error
        return
    }

    localStorage.setItem("userid", data.id);
    window.location.pathname = '/home.html'

}

const toggleView = () => {
    $(".content").classList.toggle("right");
    $("#signup").classList.toggle("hide");
};

document.querySelectorAll(".button").forEach((e) => {
    e.addEventListener("click", toggleView);
});