import {get_pokedex} from "./pokeapi.js"
import {SearchButtons} from "./search_buttons.js"
import {SearchBar} from "./search_bar.js"
import {ResultsGrid} from "./results.js"

"use strict"

const e = React.createElement

class Pokedex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search_value: "",
      pokemons: [],
      found_pokemons: [],
      current_screen: "home",
      last_screen: ""
    }
  }

  componentDidMount () {
    // Get main data from api
    get_pokedex (this.updatePokedex)
  }

  updatePokedex = (api_data) => {
    // Save main date in status
    this.setState ({
      pokemons: api_data,
    })
  }

  handleChangeSearch (event) {

    const search_value = event.target.value
    
    this.setState({
      search_value: search_value,
    })

  }

  handleClickSearch () {

    const pokemons = this.state.pokemons

    // Filter pokemons
    let found_pokemons = pokemons.filter ((pokemon) => {
      return pokemon.pokemon_species.name.includes (this.state.search_value)
    })

    if (found_pokemons.length > 12) {
      found_pokemons = found_pokemons.slice(0,12)
    }

    // Go to search all types screen
    this.setState({
      current_screen: "all types",
      last_screen: "home",
      found_pokemons: found_pokemons,
    })

  }

  handleClickGoBack () {
    // Go back to last screen
    const last_screen = this.state.last_screen
    this.setState({
      current_screen: last_screen,
      last_screen: "",
    })
  }

  // Main component
  render() {

    // Selet main section
    return (
      <div className="pokedex">

        {/* Render header */}
        <header className="home">
          <div className="content regular-width">
            <img src="./imgs/pokeball.svg" alt="app logo"></img>
            <h2 className="title">Pokedex</h2>
          </div>
        </header>


        {/* Render main */}
        <Main
          current_screen = {this.state.current_screen}
          search_value={this.state.search_value}
          handleChangeSearch ={(event) => (this.handleChangeSearch(event))}
          handleClickSearch={() => this.handleClickSearch()}
          handleClickGoBack={() => this.handleClickGoBack()}
          found_pokemons={this.state.found_pokemons}
        />
        
      </div>
    )
  }
}

function Main (props) {
  if (props.current_screen == "home") {
    return <MainHome
      current_screen = {props.current_screen}
      search_value={props.search_value}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
    />
  } else if (props.current_screen == "all types") {
    return <MainSearch
      current_screen = {props.current_screen}
      search_value={props.search_value}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      handleClickGoBack={props.handleClickGoBack}
      found_pokemons={props.found_pokemons}
    />
  }
}

function MainHome (props) {
  return (
    <main className={props.current_screen.replace(" ", "-")}>
          
      <SearchBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        search_value={props.search_value}
        current_screen = {props.current_screen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <SearchButtons/>

    </main>
  )
}

function MainSearch (props) {
  return (
    <main className={props.current_screen.replace(" ", "-")}>
          
      <SearchBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        search_value={props.search_value}
        current_screen = {props.current_screen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <ResultsGrid
        pokemons={props.found_pokemons}
      /> 

    </main>
  )
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
