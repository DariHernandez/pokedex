import {pokemonTypes, pokemonGenerations} from "./pokeapi.js"

export function FilterButtons (props) {

    // Select data for show different filter buttons
    const currentScreen = props.currentScreen
    let buttonsData
    let useImage = false
    if (currentScreen == "types") {
        buttonsData = pokemonTypes
        useImage = true
    } else if (currentScreen == "generations") {
        buttonsData = pokemonGenerations
    }

    // Generate buttons
    let buttons = []
    for (const buttonData of buttonsData) {

        // Set color for button
        let color = "default"
        if (currentScreen == "types") {
            color = buttonData
        }
        
        buttons.push (
            <FilterButton
                buttonData={buttonData}
                key={buttonData}
                onClick={props.handleFilter}
                currentScreen={props.currentScreen}
                color={color} 
                useImage={useImage}
            />
        )
    }
    return (
        <section className={`${currentScreen} filter-buttons regular-width`}>
            {buttons}
        </section>
    )
}

function FilterButton (props) {

    return (
        <button
            className={`${props.currentScreen} button btn round text-shadow`}
            onClick={() => props.onClick (props.buttonData)}
            pokecolor={props.color}
        >
            {props.buttonData.replaceAll("-", " ")}

            {/* Use iage only for filter type */}
            {props.useImage &&
                <div className="wrapper-img">
                    <img
                        src={`./imgs/types-assets/${props.buttonData}.png`}
                        alt="pokemon type image"
                    />
                </div>
            }
        </button>
    )
}