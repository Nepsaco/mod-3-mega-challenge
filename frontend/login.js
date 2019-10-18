const $form = document.querySelector("form")
const $error = document.querySelector(".error")
const $authStatus = document.querySelector(".auth-status")
const loginUrl = "http://localhost:9000/login"

$form.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
        })
    }).then(response => response.json())
    .then(response => {
        if (response.error) throw new Error("You entered an incorrect username or password")
        localStorage.setItem("token", response.token)
        localStorage.setItem("name", response.name)
        window.location.href = `index.html`
    }).catch(error => {
        $error.textContent = error.message
    })
})

function flashAuthStatus(){
    const name = localStorage.getItem("name")

    $authStatus.innerHTML = name
        ? `<a href="/logout.html">Logout ${name}</a>`
        : `<a href="/login.html">Login</a>`
}
