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
        <section className="types-buttons regular-width">
            {buttons}
        </section>
    )
}

function TypeButton (props) {
    return (
        <button
            className="pokemon-type btn round text-shadow"
            onClick={(pokemonType) => props.onClick (pokemonType)}
            pokecolor={props.pokemonType}
        >
            {props.pokemonType}
            <div className="wrapper-img">
                <img
                    src={`./imgs/types-assets/${props.pokemonType}.png`}
                />
            </div>
        </button>
    )
}