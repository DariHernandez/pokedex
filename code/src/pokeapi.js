export function get_pokedex (doneFunction) {
    // Get data from api
    fetch ("https://pokeapi.co/api/v2/pokedex/1/")
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data.pokemon_entries))
}

export function get_pokemon (doneFunction, number) {
    // Get data from api
    fetch (`https://pokeapi.co/api/v2/pokemon/${number}/`)
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data))
}