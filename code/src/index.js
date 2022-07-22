import {getPokedex, getPokemonsFilter} from "./pokeapi.js"
import {CategoryButtons} from "./category_buttons.js"
import {TopBar} from "./top_bar.js"
import {ResultsGrid} from "./results.js"
import {Paginator} from "./paginator.js"
import {FilterButtons} from "./filter_buttons.js"
import {Pokemon} from "./pokemon.js"

"use strict"

const e = React.createElement

function getPokemonEntry (pokemonData) {

  // Get entry
  const url = pokemonData.url
  let pokemonEntry = url.split("/") [url.split("/").length - 2]
  let pokemonEntryFormated = pokemonEntry

  // Format pokemon entry text
  if (pokemonEntryFormated.length == 1) {
    pokemonEntry = `00${pokemonEntryFormated}` 
  } else if (pokemonEntryFormated.length == 2) {
    pokemonEntry = `0${pokemonEntryFormated}` 
  }

  return [pokemonEntryFormated, pokemonEntry]
}

class Pokedex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: "",
      pokemons: [],
      foundPokemons: [],
      currentScreen: "pokemon",
      currentPage: 1,
      totalPages: 1,
      categoryFilter: "",
      pokemon: "pikachu",
    }
  }

  handleUpdatePokedex () {
    // Get main data from api
    getPokedex (this.updatePokedex)
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
      return pokemon.pokemon_species.name.includes (searchValue.toLowerCase())
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
    this.setState({
      currentScreen: "type all",
    })

  }

  handleClickGoBack () {
    // Go back to last screen
    this.setState({
      currentScreen: "home",
      searchValue: "",
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
  
  handleCategory (categoryName) {
    this.setState({
      currentScreen: categoryName,
      searchValue: "",
    })
  }
  
  updateFilter = (data, filterkey, filterValue) => {
    // Format data from the api
    let pokemonsFormated

    if (filterkey == "type") {
      // Format data for pokemon type filter
      pokemonsFormated = data.pokemon.map ((pokemonData) => {
        const pokemonName = pokemonData.pokemon.name
        const pokemonUrl = pokemonData.pokemon.url
        let [pokemonEntry, pokemonEntryFormated] = getPokemonEntry (pokemonData.pokemon)
        return {
          entry_number: pokemonEntry,
          entry_formated: pokemonEntryFormated,
          pokemon_species: {
            name: pokemonName,
            url: pokemonUrl
          }
        }
      }) 
  
      // Filter extra pokemons
      pokemonsFormated = pokemonsFormated.filter ((pokemonData) => {
        return parseInt(pokemonData.entry_number) < 10000
      })
    } else {
      // Format data for pokemon generation filter
      pokemonsFormated = data.pokemon_species.map ((pokemonData) => {
        const pokemonName = pokemonData.name
        const pokemonUrl = pokemonData.url
        let [pokemonEntry, pokemonEntryFormated] = getPokemonEntry (pokemonData)

        return {
          entry_number: pokemonEntry,
          entry_formated: pokemonEntryFormated,
          pokemon_species: {
            name: pokemonName,
            url: pokemonUrl
          }
        }
      }) 
    }

    // Short pokemon by number
    let pokemonsEntries = pokemonsFormated.map ((pokemonData) => {
      return pokemonData.entry_formated
    })
    pokemonsEntries.sort ()

    let pokemonsFormatedLast = [...pokemonsFormated]
    pokemonsFormated = pokemonsEntries.map ((entry_formated) => {
      return pokemonsFormatedLast.filter ((pokemonData) => {
        return pokemonData.entry_formated == entry_formated
      })[0]
    })

    // Update data in state
    this.setState ({
      pokemons: pokemonsFormated,
      foundPokemons: pokemonsFormated,
      currentScreen: `${filterkey} ${filterValue}`,
    })
  }

  handleFilter (filterValue) {
    // handle click in filter button
    const currentScreen = this.state.currentScreen
    let filterkey = currentScreen.substring (0, currentScreen.length - 1)
    filterkey = filterkey.replace (" ", "-")
    if (["color", "habitat"].includes (filterkey)) {
      filterkey = `pokemon-${filterkey}`
    }

    getPokemonsFilter (this.updateFilter, filterkey, filterValue.toLowerCase())
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
          handleCategory={(categoryName) => this.handleCategory(categoryName)}
          handleFilter={(filterValue) => this.handleFilter(filterValue)}
          updateResults={(currentScreen) => this.updateResults(currentScreen=currentScreen)}
          onHomeLoad={() => this.handleUpdatePokedex()}
        />
        
      </div>
    )
  }
}

function Main (props) {
  const currentScreen = props.currentScreen

  // Home screen
  if (currentScreen == "home") {
    props.onHomeLoad ()
    return <MainHome
      currentScreen = {currentScreen}
      searchValue={props.searchValue}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      handleCategory={props.handleCategory}
    />

  // Filter screens
  } else if (currentScreen == "all types" 
            || currentScreen.includes("type ")
            || currentScreen.includes("generation ")
            || currentScreen.includes("egg-group ")
            || currentScreen.includes("color ")
            || currentScreen.includes("habitat ")) {

    return <MainSearch
      currentScreen = {currentScreen}
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
      updateResults={props.updateResults}
    />

  // Filter buttons screens
  } else if (["types", "generations", "egg groups", "colors", "habitats"].includes (currentScreen)) {
    return <MainFilter
      currentScreen={currentScreen}
      handleChangeSearch={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      searchValue={props.searchValue}
      handleClickGoBack={props.handleClickGoBack}
      handleFilter={props.handleFilter}
    />

  // Pokemon screen
  } else if (currentScreen == "pokemon") {
    return <MainPokemon/>
  }
}

function MainHome (props) {
  return (
    <main className={props.currentScreen.replace(" ", "-")}>
          
      <TopBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        searchValue={props.searchValue}
        currentScreen = {props.currentScreen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <CategoryButtons
        handleCategory={props.handleCategory}
      />

    </main>
  )
}

class MainSearch extends React.Component {
  componentDidMount () {
    // Call to update function for enable pagination
    this.props.updateResults ()
  }
  render () {

    return (
      <main className={this.props.currentScreen.replace(" ", "-")}>
            
        <TopBar
          handleChangeSearch={this.props.handleChangeSearch}
          handleClickSearch={this.props.handleClickSearch}
          searchValue={this.props.searchValue}
          currentScreen = {this.props.currentScreen}
          handleClickGoBack={this.props.handleClickGoBack}
        />
  
        <Paginator
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          pokemonsNum={this.props.pokemonsNum}
          clickNextPage={this.props.handleClickNextPage}
          clickBackPage={this.props.handleClickBackPage}
        />
  
        <ResultsGrid
          pokemons={this.props.foundPokemons}
        /> 
  
        <Paginator
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          pokemonsNum={this.props.pokemonsNum}
          clickNextPage={this.props.handleClickNextPage}
          clickBackPage={this.props.handleClickBackPage}
        />
  
      </main>
    )
  }
}

function MainFilter (props) {
  return (   
    <main className={props.currentScreen.replace(" ", "-")}>
      <TopBar
        handleChangeSearch={props.handleChangeSearch}
        handleClickSearch={props.handleClickSearch}
        searchValue={props.searchValue}
        currentScreen = {props.currentScreen}
        handleClickGoBack={props.handleClickGoBack}
      />

      <FilterButtons
        handleFilter={props.handleFilter}
        currentScreen={props.currentScreen}
      />
    </main>
  )
}

function MainPokemon (props) {
  return <Pokemon/>
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
