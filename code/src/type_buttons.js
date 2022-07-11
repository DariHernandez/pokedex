export function TypeButtons (props) {

    const pokemonTypes = props.pokemonTypes
    let buttons = []
    for (const pokemonType of pokemonTypes) {
        buttons.push (
            <TypeButton
                pokemonType={pokemonType}
                handleUpdateFilter={props.handleUpdateFilter}
                key={pokemonType}
            />
        )
    }
    return (
        <section className="pokemon-types-buttons regular-width">
            {buttons}
        </section>
    )
}

function TypeButton (props) {
    return (
        <button
            className="pokemon-type btn round"
            onClick={(pokemonType) => props.onClick (pokemonType)}
            pokecolor={props.pokemonType}
        >
            {props.pokemonType}
            <img
                src={`./imgs/types/${props.pokemonType}.png`}
            />
        </button>
    )
}