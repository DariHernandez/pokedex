import {get_pokemon} from "./pokeapi.js"

export function ResultsGrid (props) {

    let cards = []
    for (const pokemon_data of props.pokemons) {
        cards.push (<Card pokemon={pokemon_data} key={pokemon_data.entry_number.toString()}/>)
    }
    return (
        <section className="results-grid">
            {cards}
        </section>
    )
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
        let pokemon_image
        let image
        if (this.state.pokemonData.sprites) {
            // render pokemon image
            pokemon_image = this.state.pokemonData.sprites.front_default
            image = <img src={pokemon_image} alt="{this.state.pokemonName} image"/>
        } else {
            // Render default image
            pokemon_image = "./imgs/pokeball.svg"
            image = <img src={pokemon_image} alt="loading image"/>
        }

        return (
            <article className="card">
                <span className="pokemonCode">#{this.state.pokemonCode}</span>
                {image}
                <h3>{this.state.pokemonName}</h3>
            </article>
        )
    }
}