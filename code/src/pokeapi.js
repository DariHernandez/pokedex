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

export function getPokemonsFilter (doneFunction, filterkey, filterValue) {
    // Get data from api
    fetch (`https://pokeapi.co/api/v2/${filterkey}/${filterValue}/`)
    .then ((response) => response.json())

    // Send data to function
    .then(data => doneFunction(data, filterkey, filterValue))
}

export const pokemonTypes = [
    "normal", 
    "fighting", 
    "flying",
    "poison", 
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
]

export const pokemonGenerations = [
    "generation-I",
    "generation-II",
    "generation-III",
    "generation-IV",
    "generation-V",
    "generation-VI",
    "generation-VII",
    "generation-VIII",
]

export const pokemonEggs = [
    "monster",
    "water1",
    "bug",
    "flying",
    "ground",
    "fairy",
    "plant",
    "humanshape",
    "water3",
    "mineral",
    "indeterminate",
    "water2",
    "ditto",
    "dragon",
    "no-eggs",
]