export function getPokedex (doneFunction) {
    // Get data from api
    fetch ("https://pokeapi.co/api/v2/pokedex/1/")
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data.pokemon_entries))
}

export function getPokemon (doneFunction, number) {
    // Get data from api
    fetch (`https://pokeapi.co/api/v2/pokemon/${number}/`)
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data))
}

export function getPokemonsType (doneFunction, pokemonType) {
    // Get data from api
    fetch (`https://pokeapi.co/api/v2/type/${pokemonType}/`)
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data, pokemonType))
}