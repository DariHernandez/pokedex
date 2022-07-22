export class Pokemon extends React.Component {
    render () {
        return (
            <section className="pokemon">
                <Background 
                    pokemonType="steel" 
                />
                <ArrowButton
                    arrowType="back"
                />
                <ArrowButton
                    arrowType="next"
                />
                <Name
                    pokemonName = "steelix"
                    pokemonId = "208"
                    pokemonType = "steel"
                />
                <Sprite
                    sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/208.png"
                />
                <TypeTag
                    pokemonType = "steel"
                />
                <Details
                    pokemonType = "steel"
                />
            </section>
        )
    }
}

function Background (props) {
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
    return (
        <button className={`btn arrow pokemon ${props.arrowType}`}>
            <img src="./imgs/arrow-dark.svg" />
        </button>
    )
}

function Name (props) {
    // Format pokemon id
    let id_formated = props.pokemonId
    if (id_formated.length == 1) {
        id_formated = `#00${id_formated}`
    } else if (id_formated.length == 2) {
        id_formated = `#0${id_formated}`
    } else if (id_formated.length == 3) {
        id_formated = `#${id_formated}`
    }

    return (
        <h1 className="pokemon-name" pokecolor={props.pokemonType}>
            <span className="name">{props.pokemonName}</span>
            <span className="id">{id_formated}</span>
        </h1>
    )
}

function Sprite (props) {
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
    return (
        <div className="type-tag">
            <span className="text-shadow" pokecolor={props.pokemonType}>
                {props.pokemonType}
            </span>
        </div>
    )
}

class Details extends React.Component {
    render () {
        return (
            <section className="details">
                <div className="buttons">
                    <DetailsButton
                        buttonType="left"
                        text="About"
                        pokemonType = {this.props.pokemonType}
                        activeButton="About"
                    />
                    <DetailsButton
                        buttonType="center"
                        text="Stats"
                        pokemonType = {this.props.pokemonType}
                        activeButton="About"
                    />
                    <DetailsButton
                        buttonType="right"
                        text="Moves"
                        pokemonType = {this.props.pokemonType}
                        activeButton="About"
                    />
                </div>
            </section>
        )
    }
}

function DetailsButton (props) {
    let className
    if (props.activeButton == props.text) {
        className = `btn pokemon-details no-box-shadow text-shadow ${props.buttonType} active`
    } else {
        className = `btn pokemon-details no-box-shadow text-shadow ${props.buttonType}`
    }

    return (
        <button 
            className= {className} 
            pokecolor={props.pokemonType}
        >
            <span>
                {props.text}
            </span>
        </button>
    )
}