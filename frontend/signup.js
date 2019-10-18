const $form = document.querySelector("form")
const $authStatus = document.querySelector(".auth-status")
const userUrl = "http://localhost:9000/users"

$form.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    fetch(userUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: formData.get("name"),
            username: formData.get("username"),
            password: formData.get("password"),
        })
    }).then(() => {
        window.location.href = "login.html"
    }).catch(error => console.error(error.message))
})

function flashAuthStatus(){
    const name = localStorage.getItem("name")

    $authStatus.innerHTML = name
        ? `<a href="/logout.html">Logout ${name}</a>`
        : `<a href="/login.html">Login</a>`
}
