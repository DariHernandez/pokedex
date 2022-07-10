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
      searchValue: "",
      pokemons: [],
      foundPokemons: [],
      currentScreen: "home",
      lastScreen: ""
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

    // Save search value
    const searchValue = event.target.value


    // Update results when edit text in results page
    if (this.state.currentScreen == "home") {
      this.setState({
        searchValue: searchValue,
      })
    } else {
      this.handleClickSearch (searchValue)
    }
    
  }

  handleClickSearch (searchValueManual=null) {

    // Get state variables
    const pokemons = this.state.pokemons
    const searchValue = searchValueManual != null ? searchValueManual : this.state.searchValue

    // Filter pokemons
    let foundPokemons = pokemons.filter ((pokemon) => {
      return pokemon.pokemon_species.name.includes (searchValue)
    })

    if (foundPokemons.length > 12) {
      foundPokemons = foundPokemons.slice(0,12)
    }

    // Go to search all types screen
    this.setState({
      currentScreen: "all types",
      lastScreen: "home",
      foundPokemons: foundPokemons,
      searchValue: searchValue
      
    })

  }

  handleClickGoBack () {
    // Go back to last screen
    const lastScreen = this.state.lastScreen
    this.setState({
      currentScreen: lastScreen,
      lastScreen: "",
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
          currentScreen = {this.state.currentScreen}
          searchValue={this.state.searchValue}
          handleChangeSearch ={(event) => (this.handleChangeSearch(event))}
          handleClickSearch={() => this.handleClickSearch()}
          handleClickGoBack={() => this.handleClickGoBack()}
          foundPokemons={this.state.foundPokemons}
        />
        
      </div>
    )
  }
}

function Main (props) {
  if (props.currentScreen == "home") {
    return <MainHome
      currentScreen = {props.currentScreen}
      searchValue={props.searchValue}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
    />
  } else if (props.currentScreen == "all types") {
    return <MainSearch
      currentScreen = {props.currentScreen}
      searchValue={props.searchValue}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      handleClickGoBack={props.handleClickGoBack}
      foundPokemons={props.foundPokemons}
    />
  }
}

function MainHome (props) {
  return (
    <main className={props.currentScreen.replace(" ", "-")}>
          
      <SearchBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        searchValue={props.searchValue}
        currentScreen = {props.currentScreen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <SearchButtons/>

    </main>
  )
}

function MainSearch (props) {
  return (
    <main className={props.currentScreen.replace(" ", "-")}>
          
      <SearchBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        searchValue={props.searchValue}
        currentScreen = {props.currentScreen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <ResultsGrid
        pokemons={props.foundPokemons}
      /> 

    </main>
  )
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
