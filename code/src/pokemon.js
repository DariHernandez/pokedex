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
    constructor (props) {
        super (props)
        this.state = {
            activeButton: "Stats",
        }
    }

    handleUpdateActiveButton (newButton) {
        this.setState ({
            activeButton: newButton,
        })
    }

    render () {
        // Select correct info
        let info
        if (this.state.activeButton == "About") {
            info = <InfoAbout
                description="When several of\nthese POKéMON\ngather, their\u000celectricity could\nbuild and cause\nlightning storms."
                height="7"
                weight="69"
                base_experience="64"
                base_happiness="50"
                capture_rate="45"

            />
        } else if (this.state.activeButton == "Stats") {
            const stats = {
                hp: 50,
                atk: 100,
                def: 150,
                satk: 200,
                sdef: 100,
                spd: 50
            }
            info = <InfoStats
                stats={stats}
                pokemonType={this.props.pokemonType}
            />
        }

        return (
            <section className="details">
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
                {info}
            </section>


        )
    }
}

function DetailsButton (props) {
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
                    {Math.round(props.weight/10*100)/100} kg
                </p>
                <p>
                    {Math.round(props.weight/10*2.20462*100)/100} lbs
                </p>

                <p className="header columns-2">
                    Base experience
                </p>
                <p>
                    {props.base_experience}
                </p>

                <p className="header columns-2">
                    Base happiness
                </p>
                <p>
                    {props.base_happiness}
                </p>

                <p className="header columns-2">
                    Capture rate
                </p>
                <p>
                    {props.capture_rate}
                </p>
            </div>
        </div>
    )
}

function InfoStats (props) {
    
    let stats_bars = []
    for (const stat_name in props.stats) {
        let bar_width = {
            "width": `${props.stats[stat_name]*100/200}%`
        }
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