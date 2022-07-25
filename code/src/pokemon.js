import {getPokemon, getPokemonSpecies} from "./pokeapi.js"

export class Pokemon extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            isLoading: true,
            pokemonData: {
                pokemonId: 10,
            },
        }
    }

    updatePokemonData = (data) => {

        // Get component current data
        let pokemonData = this.state.pokemonData

        // Get data from api and save it
        pokemonData.baseExperience = data.base_experience
        pokemonData.height = data.height
        pokemonData.weight = data.weight
        pokemonData.name = data.name
        pokemonData.sprite = data.sprites.front_default
        pokemonData.type = data.types[0].type.name

        // Get and format moves
        pokemonData.moves = {}
        data.moves.map ((moveElem) => {

            // Get move name and learng type
            const move_name = moveElem.move.name
            const move_details_last = moveElem.version_group_details[moveElem.version_group_details.length - 1]
            const move_learn_type = move_details_last.move_learn_method.name
            const move_learn_level = move_details_last.level_learned_at
            let move_learn
            if (move_learn_type == "level-up") {
                move_learn = `level ${move_learn_level}`
            } else {
                move_learn = `machine`
            }

            // Save in object
            pokemonData.moves[move_name] = move_learn
        })

        // Get and format stats
        pokemonData.stats = {}
        data.stats.map ((statElem) => {
            const value = statElem.base_stat
            let name = statElem.stat.name

            // Short stat name
            if (name=="attack") {
                name = "atk"
            } else if (name=="defense") {
                name = "def"
            } else if (name=="special-attack") {
                name = "satk"
            } else if (name=="special-defense") {
                name = "sdef"
            } else if (name=="speed") {
                name = "spd"
            } 

            pokemonData.stats[name] = value
        })

        // Update state
        let newState = {}
        newState["pokemonData"] = pokemonData
        pokemonData = this.state.pokemonData

        // Stop loading if all api calls are done
        if ("baseHappiness" in pokemonData) {
            // Stop loading
            newState["isLoading"] = false
        }
        
        this.setState (newState)
    }

    updatePokemonDataSpacies = (data) => {

        // Get component current data
        let pokemonData = this.state.pokemonData

        // Get data from api and save it
        pokemonData.baseHappiness = data.base_happiness
        pokemonData.captureRate = data.capture_rate
        
        // Get las pokemon description in english
        const englishEntries = data.flavor_text_entries.filter ((textEntry) => {
            if (textEntry.language.name == "en") {
                return true
            }
        })
        pokemonData.description = englishEntries[englishEntries.length - 1].flavor_text

        // Update state
        let newState = {}
        newState["pokemonData"] = pokemonData
        pokemonData = this.state.pokemonData

        // Stop loading if all api calls are done
        if ("baseExperience" in pokemonData) {
            // Stop loading
            newState["isLoading"] = false
        }
        
        this.setState (newState)
    }

    componentDidMount () {
        getPokemon (this.updatePokemonData, this.state.pokemonData.pokemonId)
        getPokemonSpecies (this.updatePokemonDataSpacies, this.state.pokemonData.pokemonId)
    }

    render () {
        // Show loading spinner
        if (this.state.isLoading) {
            return (
                <section className="pokemon">
                    <img
                        className="loading"
                        src="./imgs/loading.gif"
                    />
                </section>
            )
        } else {

            // Show pokemon dat
            return (
                <section className="pokemon">
                    <Background 
                        pokemonType={this.state.pokemonData.type}
                    />
                    <ArrowButton
                        arrowType="back"
                    />
                    <ArrowButton
                        arrowType="next"
                    />
                    <Name
                        pokemonName = {this.state.pokemonData.name}
                        pokemonId = {this.state.pokemonData.pokemonId}
                        pokemonType = {this.state.pokemonData.type}
                    />
                    <Sprite
                        sprite={this.state.pokemonData.sprite}
                    />
                    <TypeTag
                        pokemonType = {this.state.pokemonData.type}
                    />
                    <Details
                        pokemonType = {this.state.pokemonData.type}
                        pokemonDescription = {this.state.pokemonData.description}
                        pokemonHeight = {this.state.pokemonData.height}
                        pokemonWeight = {this.state.pokemonData.weight}
                        pokemonBaseExperience = {this.state.pokemonData.baseExperience}
                        pokemonBaseHappiness = {this.state.pokemonData.baseHappiness}
                        pokemonCaptureRate = {this.state.pokemonData.captureRate}
                        pokemonStats = {this.state.pokemonData.stats}
                        pokemonMoves = {this.state.pokemonData.moves}
                    />
                </section>
            )
        }

    }
}

function Background (props) {
    // Background with pokeball and separator
    return (
        <div className="background">
            <div className="top" pokecolor={props.pokemonType}></div>
            <img className="pokeball" src="./imgs/pokeball-white.svg" />
            <div className="separator">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="bottom" pokecolor={props.pokemonType}></div>
        </div>
    )
} 

function ArrowButton (props) {
    // Button for go to the next or last pokemon
    return (
        <button className={`btn arrow pokemon ${props.arrowType}`}>
            <img src="./imgs/arrow-dark.svg" />
        </button>
    )
}

function Name (props) {
    // Format pokemon id number for use 3 digits
    let id_formated = props.pokemonId
    if (id_formated.length == 1) {
        id_formated = `#00${id_formated}`
    } else if (id_formated.length == 2) {
        id_formated = `#0${id_formated}`
    } else if (id_formated.length == 3) {
        id_formated = `#${id_formated}`
    }

    // Show pokemon name
    return (
        <h1 className="pokemon-name" pokecolor={props.pokemonType}>
            <span className="name">{props.pokemonName}</span>
            <span className="id">{id_formated}</span>
        </h1>
    )
}

function Sprite (props) {
    // Show the pokemon image
    return (
        <div className="sprites">
            <img 
                src={props.sprite}
                className="main"   
            />
            <img 
                src={props.sprite}
                className="back"   
            />
        </div> 
    )
}

function TypeTag (props) {
    // Show the pokemon name
    return (
        <div className="type-tag">
            <span className="text-shadow" pokecolor={props.pokemonType}>
                {props.pokemonType}
            </span>
        </div>
    )
}

class Details extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            activeButton: "About",
        }
    }

    handleUpdateActiveButton (newButton) {
        // Update the current active button and the info to show
        this.setState ({
            activeButton: newButton,
        })
    }

    render () {
        // Select correct info to show
        let info
        if (this.state.activeButton == "About") {
            info = <InfoAbout
                description={this.props.pokemonDescription}
                height={this.props.pokemonHeight}
                weight={this.props.pokemonWeight}
                baseExperience={this.props.pokemonBaseExperience}
                baseHappiness={this.props.pokemonBaseHappiness}
                captureRate={this.props.pokemonCaptureRate}

            />
        } else if (this.state.activeButton == "Stats") {
            info = <InfoStats
                stats={this.props.pokemonStats}
                pokemonType={this.props.pokemonType}
            />
        } else if (this.state.activeButton == "Moves") {
            info = <InfoMoves
                moves={this.props.pokemonMoves}
            />
        }

        return (
            <section className="details">
                {/* Show all buttons} */}
                <div className="buttons">
                    <DetailsButton
                        buttonType="left"
                        value="About"
                        pokemonType = {this.props.pokemonType}
                        activeButton={this.state.activeButton}
                        onClick={(newButton) => (this.handleUpdateActiveButton(newButton))}
                    />
                    <DetailsButton
                        buttonType="center"
                        value="Stats"
                        pokemonType = {this.props.pokemonType}
                        activeButton={this.state.activeButton}
                        onClick={(newButton) => (this.handleUpdateActiveButton(newButton))}
                    />
                    <DetailsButton
                        buttonType="right"
                        value="Moves"
                        pokemonType = {this.props.pokemonType}
                        activeButton={this.state.activeButton}
                        onClick={(newButton) => (this.handleUpdateActiveButton(newButton))}
                    />
                </div>

                {/* Show info card (about, stats or moves) */}
                {info}
            </section>
        )
    }
}

function DetailsButton (props) {
    // Buton in the info section (for change the content of the section)

    let className
    if (props.activeButton == props.value) {
        className = `btn pokemon-details no-box-shadow ${props.buttonType} active`
    } else {
        className = `btn pokemon-details no-box-shadow ${props.buttonType}`
    }

    return (
        <button 
            className= {className} 
            pokecolor={props.pokemonType}
            onClick={() => props.onClick(props.value)}
        >
            <span>
                {props.value}
            </span>
        </button>
    )
}

function InfoAbout (props) {
    // General info of the pokemon
    return (
        <div className="info about">
            <p className="description">{props.description.replaceAll("\\n", " ").replaceAll("\\u000", " ")}</p>
            <div className="grid">
                <p className="header">
                    Height
                </p>
                <p>
                    {Math.round(props.height/10*100)/100} m
                </p>
                <p>
                    {Math.round(props.height/10*3.28084*100)/100} ft
                </p>

                <p className="header">
                    Weight
                </p>
                <p>
                    {Math.round(parseInt(props.weight)/10*100)/100} kg
                </p>
                <p>
                    {Math.round(parseInt(props.weight)/10*2.20462*100)/100} lbs
                </p>

                <p className="header columns-2">
                    Base experience
                </p>
                <p>
                    {props.baseExperience}
                </p>

                <p className="header columns-2">
                    Base happiness
                </p>
                <p>
                    {props.baseHappiness}
                </p>

                <p className="header columns-2">
                    Capture rate
                </p>
                <p>
                    {props.captureRate}
                </p>
            </div>
        </div>
    )
}

function InfoStats (props) {
    // Stats with progress bars
    
    let stats_bars = []
    for (const stat_name in props.stats) {

        // Set the with for each bar
        let bar_width = {
            "width": `${props.stats[stat_name]*100/200}%`
        }

        // Save stat bar
        stats_bars.push (
            <label key={stat_name} className={`stat ${stat_name}`}>
                <p>
                    {stat_name}
                </p>
                <div className="bar">
                    <div 
                        className="bar-inner" 
                        style={bar_width}
                        pokecolor={props.pokemonType}>
                        
                    </div>
                    <div className="bar-bg"></div>
                </div>
                <p>
                    {props.stats[stat_name]}
                </p>
            </label>
        )
    }
    return (
        <div className="info stats">
            {stats_bars}
        </div>
    )
}

function InfoMoves (props) {
    // List of moves
    let moves_details = []
    for (const move_name in props.moves) {
        let move_learning = props.moves[move_name]
        moves_details.push (
            <li className="move" key={move_name}>
                {move_name} ({move_learning})
            </li>             
        )
    }
    return (
        <ul className="info moves">
            {moves_details}
        </ul>
    )
}