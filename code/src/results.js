import {get_pokemon} from "./pokeapi.js"

export function ResultsGrid (props) {

    // Create a card for each pokemon
    let cards = []
    for (const pokemon_data of props.pokemons) {
        cards.push (<Card pokemon={pokemon_data} key={pokemon_data.entry_number.toString()}/>)
    }

    if (cards.length > 0) {
        // Render pokemons
        return (
            <section className="results-grid">
                {cards}
            </section>
        )
    } else {
        // Render error screen
        const kaomojis = ["ಠ_ಠ", "ಠ▃ಠ", "ノಠ_ಠノ", "(┳◇┳)", "(ó﹏ò｡)", "(;´д｀)", "（￣s￣；", ]
        const kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)]
        return (
            <section className="results-grid error">
                <div className="kaomoji">
                    {kaomoji}
                </div>
                <h3>Not pokemon found</h3>
            </section>
        )
    }
}

class Card extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            pokemonCode: this.props.pokemon.entry_number,
            pokemonName: this.props.pokemon.pokemon_species.name,
            pokemonData: {},
        }
    }

    componentDidMount () {
        // Query data for current pokemon
        get_pokemon (this.updatePokemonData, this.state.pokemonCode)
    }

    updatePokemonData = (data) => {
        // Update state
        this.setState ({
            pokemonData: data
        })
    }

    render () {

        // Check if image is loaded from api
        let image
        let pokemon_image
        let pokemon_type
        if (this.state.pokemonData.sprites && this.state.pokemonData.types) {
            // Render pokemon image
            image = this.state.pokemonData.sprites.front_default
            pokemon_image = <img src={image} alt="{this.state.pokemonName} image"/>

            // Render pokemon code color
            pokemon_type = this.state.pokemonData.types[0].type.name

        } else {
            // Render default image
            image = "./imgs/loading.gif"
            pokemon_image = <img src={image} alt="loading image"/>

            // Normal as default pokemon type
            pokemon_type = "normal"
        }

        return (
            <article className="card btn round">
                <span 
                    className="pokemonCode"
                    pokecolor={pokemon_type}
                    >#{this.state.pokemonCode}</span>
                {pokemon_image}
                <h3>{this.state.pokemonName}</h3>
            </article>
        )
    }
}