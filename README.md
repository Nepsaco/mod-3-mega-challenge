## Steps

### Identify the site

Create a web page that identifies the site as CatMatchr, the site that helps you identify your ideal cat.

### Display a list of cat breeds

* Go to the [The Cat API](https://docs.thecatapi.com/) and sign up for a key.
* Create a Rails API that fetches a list of all the cat breeds and sends them back to a client
* Create a `Breed` class that has the following methods
    * `.fetchAll`, which fetches a list of breed data from your API and stores them as `Breed` instances in the class
    * `.all`, which returns the list of `Breed`s
    * `#constructor(id, {name, description, adaptability, affectionLevel, energyLevel, intelligence, wikiUrl})`
* Create a `BreedRenderer` class with the following methods:
    * `#constructor(breed)`
    * `#render`, which creates a DOM tree with the following data:
        * Name
        * Description
        * Adaptability
        * Affection Level
        * Energy Level
        * Intelligence
        * A link to their Wikipedia page
* Use the `Breed` and `BreedRenderer` classes to display a list of breeds on the index page

### Filter the list of cat breeds

Create a form at the top of the index page that has range input filters (1-5) for:

* Adaptability
* Affection Level
* Energy Level
* Intelligence

These should default to 1, and filter out cats that don't have at least the specified number. When the sliders change, the list of cats should filter out the cats the are being displayed in real time. The function you write to do this filter should be:

* Stored in a separate module and imported
* Adhere to functional principles

### Create a user account

Create a sign-up page that allows users to create an account with a:

* Name
* Username
* Password

On the backend, this information should be sent to a user creation endpoint. Use strong params to restrict the data being set, and use model validations to ensure that the username is unique and the password is at least 7 characters.

When they have successfully signed up, redirect them to a login page that you create. When a user successfully logs in, store their token in local storage and redirect them to the cats page. If their login is not successful, display an error message.

In the header for all pages, a logged in user should see a link that says `Logout ${name}`, and a logged out user should see a link to the login page.

When a user clicks the Logout link, it should delete their token and change their logged in status.

### Keep track of logged in users' favorite cats

When a user clicks on a "Favorite" button in the cat breed, it should mark them as a "favorite," and the button text should change to "Unfavorite." Favorite breed should be displayed with a green border, should persisted on the backend, and favorite breeds should load with the border.

### Create an information page for your API

The root of the API (`/`) should render a template that displays information about how to use all of the endpoints in the API.
