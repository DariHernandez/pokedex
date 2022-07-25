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

export function getPokemonSpecies (doneFunction, number) {
    // Get data from api
    fetch (`https://pokeapi.co/api/v2/pokemon-species/${number}/`)
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

export const pokemonFilters = {
    "types": [
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
    ],
    "generations": [
        "generation-I",
        "generation-II",
        "generation-III",
        "generation-IV",
        "generation-V",
        "generation-VI",
        "generation-VII",
        "generation-VIII",
    ],
    "egg groups": [
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
    ],
    "colors": [
        "black",
        "blue",
        "brown",
        "gray",
        "green",
        "pink",
        "purple",
        "red",
        "white",
        "yellow",
    ],
    "habitats": [
        "cave",
        "forest",
        "grassland",
        "mountain",
        "rare",
        "rough-terrain",
        "sea",
        "urban",
        "waters-edge",
    ],
}