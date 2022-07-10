export function get_pokedex(doneFunction) {
    // Get data from api
    fetch("https://pokeapi.co/api/v2/pokedex/1/").then(function (response) {
        return response.json();
    })

    // Send data to function
    .then(function (data) {
        return doneFunction(data.pokemon_entries);
    });
}

export function get_pokemon(doneFunction, number) {
    // Get data from api
    fetch("https://pokeapi.co/api/v2/pokemon/" + number + "/").then(function (response) {
        return response.json();
    })

    // Send data to function
    .then(function (data) {
        return doneFunction(data);
    });
}