import filterCats from "./cat-filter.js"

const breedsUrl = "http://localhost:9000/breeds"
const favoritesUrl = "http://localhost:9000/favorites"

const $authStatus = document.querySelector(".auth-status")
const $breeds = document.querySelector(".breeds")
const $controls = document.querySelectorAll("form input")

class Breed {
    breeds = []
    static fetchAll(){
        let headers = {}
        if (localStorage.getItem("token")){
            headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        }
        return fetch(breedsUrl, { headers })
            .then(response => response.json())
            .then(breeds => {
                this.breeds = breeds.map(breed => {
                    const {
                        id, name, description, adaptability,
                        affection_level, energy_level,
                        intelligence, wikipedia_url, is_favorite
                    } = breed
                    return new Breed(id, {
                        name, description, adaptability,
                        affectionLevel: affection_level,
                        energyLevel: energy_level,
                        intelligence,
                        wikipediaUrl: wikipedia_url,
                        isFavorite: is_favorite,
                    })
                })
            })
    }
    static get all(){
        return this.breeds
    }
    constructor(id, {
        name, description, adaptability,
        affectionLevel, energyLevel,
        intelligence, wikiUrl, isFavorite
    }){
        this.id = id
        this.name = name
        this.description = description
        this.adaptability = adaptability
        this.affectionLevel = affectionLevel
        this.energyLevel = energyLevel
        this.intelligence = intelligence
        this.wikiUrl = wikiUrl
        this.isFavorite = isFavorite
    }
}

class BreedRenderer {
    constructor(breed){
        const {
            id, name, description, adaptability,
            affectionLevel, energyLevel,
            intelligence, wikiUrl, isFavorite,
        } = breed

        this.id = id
        this.name = name
        this.description = description
        this.adaptability = adaptability
        this.affectionLevel = affectionLevel
        this.energyLevel = energyLevel
        this.intelligence = intelligence
        this.wikiUrl = wikiUrl
        this.isFavorite = isFavorite
    }
    render(){
        const $div = document.createElement("div")
        $div.classList.add("breed")
        if (this.isFavorite){
            $div.classList.add("favorite")
        }
        $div.dataset.breedId = this.id

        const favoriteText = this.isFavorite
            ? "Unfavorite"
            : "Favorite"

        $div.innerHTML = `
<h3>${this.name}</h3>
<p>${this.description}</p>
<ul>
    <li>Adaptability: ${this.adaptability}</li>
    <li>Affection Level: ${this.affectionLevel}</li>
    <li>Energy Level: ${this.energyLevel}</li>
    <li>Intelligence: ${this.intelligence}</li>
</ul>
<button data-breed-id="${this.id}">${favoriteText}</button>
<a href="${this.wikiUrl}" target="_BLANK">Wiki</a>
        `
        return $div
    }
}

$controls.forEach($control => {
    $control.addEventListener("change", updateBreeds)
})

$breeds.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON"){
        const breedId = event.target.dataset.breedId
        const $element = document.querySelector(`div[data-breed-id=${breedId}]`)
        const isFavorite = $element.classList.contains("favorite")

        event.target.textContent = isFavorite
            ? "Favorite"
            : "Unfavorite"
        Breed.all.map(breed => {
            if (breed.id == breedId){
                breed.isFavorite = isFavorite ? false : true
            }
            return breed
        })

        $element.classList.contains("favorite")
            ? removeFavorite(breedId, $element)
            : addFavorite(breedId, $element)
    }
})

function addFavorite(breedId, element){
    element.classList.add("favorite")
    return fetch(favoritesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            breed_id: breedId,
        }),
    })
}

function removeFavorite(breedId, element){
    element.classList.remove("favorite")
    return fetch(`${favoritesUrl}/${breedId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer: ${localStorage.getItem("token")}`
        },
    })
}

function getValues(){
    const values = [...$controls]
        .map($control => $control.value)
    return {
        adaptability: +values[0],
        affectionLevel: +values[1],
        energyLevel: +values[2],
        intelligence: +values[3],
    }
}

function clearBreeds(){
    $breeds.innerHTML = ""
}

function updateBreeds(event){
    clearBreeds()

    filterCats(Breed.all, getValues())
        .map(breed => new BreedRenderer(breed))
        .map(breedRenderer => breedRenderer.render())
        .forEach($breed => {
            const $li = document.createElement("li")
            $li.append($breed)
            $breeds.append($li)
        })
}

function flashAuthStatus(){
    const name = localStorage.getItem("name")

    $authStatus.innerHTML = name
        ? `<a href="/logout.html">Logout ${name}</a>`
        : `<a href="/login.html">Login</a>`
}

(async function initialize(){
    await Breed.fetchAll()
    Breed.all
        .map(breed => new BreedRenderer(breed))
        .map(breedRenderer => breedRenderer.render())
        .forEach($breed => {
            const $li = document.createElement("li")
            $li.append($breed)
            $breeds.append($li)
        })

    flashAuthStatus()    
})()
