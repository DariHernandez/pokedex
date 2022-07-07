export function get_pokedex (done_function) {
    fetch ("https://pokeapi.co/api/v2/pokedex/1/")
    .then ((response) => response.json())
    .then(data => done_function(data))
}

// function done_function (data) {
//     console.log (data)
// }

// get_pokedex (done_function)