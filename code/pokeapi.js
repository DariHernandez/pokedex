export function get_pokedex (done_function) {
    // Get data from api
    fetch ("https://pokeapi.co/api/v2/pokedex/1/")
    .then ((response) => response.json())

    // Send data to function
    .then(data => done_function(data.pokemon_entries))
}
