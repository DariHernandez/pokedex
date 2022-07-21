import {pokemonFilters} from "./pokeapi.js"

export function FilterButtons (props) {

    // Select data for show different filter buttons
    const currentScreen = props.currentScreen
    let buttonsData
    let useImage = false
    buttonsData = pokemonFilters[currentScreen].sort()
    if (currentScreen == "types") {
        useImage = true
    } 

    // Generate buttons
    let buttons = []
    for (const buttonData of buttonsData) {

        // Set color for button
        let color = buttonData
        if (currentScreen == "generations") {
            color = "default"
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