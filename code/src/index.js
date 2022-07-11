import {get_pokedex} from "./pokeapi.js"
import {SearchButtons} from "./search_buttons.js"
import {SearchBar} from "./search_bar.js"
import {ResultsGrid} from "./results.js"
import {Paginator} from "./paginator.js"
import {TypeButtons} from "./type_buttons.js"

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
      lastScreen: "",
      currentPage: 1,
      totalPages: 1,
      pokemonTypes: [
        "normal", 
        "fighting", 
        "flying",
        "poison", 
        "ground",
        "rock",
        "bug",
        "ghost",
        "steel",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ice",
        "dragon",
        "dark",
        "fairy",
      ],
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

  updateResults (searchValue=null, currentPage=1) {
    // Update the results to show in the current page

    // Get state variables
    const pokemons = this.state.pokemons
    if (searchValue == null) {
      searchValue = this.state.searchValue
    }

    // Filter pokemons
    let foundPokemons = pokemons.filter ((pokemon) => {
      return pokemon.pokemon_species.name.includes (searchValue)
    })

    // Calculate number of result pages
    const totalPages = Math.ceil(foundPokemons.length / 12)

    // Get pokemons for current page
    if (foundPokemons.length > 12) {
      const pokemon_position = currentPage * 12
      foundPokemons = foundPokemons.slice(pokemon_position - 12 , pokemon_position)
    }

    // Go to search all types screen
    this.setState({
      currentScreen: "all types",
      lastScreen: "home",
      foundPokemons: foundPokemons,
      searchValue: searchValue,  
      currentPage: currentPage,
      totalPages: totalPages
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
      this.updateResults (searchValue)
    }
    
  }

  handleClickSearch () {
    this.updateResults ()

  }

  handleClickGoBack () {
    // Go back to last screen
    const lastScreen = this.state.lastScreen
    this.setState({
      currentScreen: lastScreen,
      lastScreen: "",
    })
  }

  handleClickNextPage () {
    let currentPage = this.state.currentPage
    currentPage++
    this.updateResults(null, currentPage)
  }
  
  handleClickBackPage () {
    let currentPage = this.state.currentPage
    currentPage--
    this.updateResults(null, currentPage)
  }
  
  handleFilter (filter_name) {
    this.setState({
      currentScreen: filter_name,
      lastScreen: "home",
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
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          handleClickNextPage={() => this.handleClickNextPage()}
          handleClickBackPage={() => this.handleClickBackPage()}
          pokemonsNum={this.state.foundPokemons.length}
          handleFilter={(filter_name) => this.handleFilter(filter_name)}
          pokemonTypes={this.state.pokemonTypes}
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
      handleFilter={props.handleFilter}
    />
  } else if (props.currentScreen == "all types") {
    return <MainSearch
      currentScreen = {props.currentScreen}
      searchValue={props.searchValue}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      handleClickGoBack={props.handleClickGoBack}
      foundPokemons={props.foundPokemons}
      currentPage={props.currentPage}
      totalPages={props.totalPages}
      handleClickNextPage={props.handleClickNextPage}
      handleClickBackPage={props.handleClickBackPage}
      pokemonsNum={props.pokemonsNum}
    />
  } else if (props.currentScreen == "types") {
    return <MainFilter
      currentScreen={props.currentScreen}
      pokemonTypes={props.pokemonTypes}
      handleChangeSearch={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      searchValue={props.searchValue}
      handleClickGoBack={props.handleClickGoBack}
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

      <SearchButtons
        handleFilter={props.handleFilter}
      />

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

      <Paginator
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        pokemonsNum={props.pokemonsNum}
        clickNextPage={props.handleClickNextPage}
        clickBackPage={props.handleClickBackPage}
      />

      <ResultsGrid
        pokemons={props.foundPokemons}
      /> 

      <Paginator
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        pokemonsNum={props.pokemonsNum}
        clickNextPage={props.handleClickNextPage}
        clickBackPage={props.handleClickBackPage}
      />

    </main>
  )
}

function MainFilter (props) {
  return (   
    <main className={props.currentScreen.replace(" ", "-")}>
      <SearchBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        searchValue={props.searchValue}
        currentScreen = {props.currentScreen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <TypeButtons
        handleUpdateFilter={() => console.log ("clicked")}
        pokemonTypes={props.pokemonTypes}
      />
    </main>
  )
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
