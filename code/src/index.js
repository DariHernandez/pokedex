import {getPokedex, getPokemonsType} from "./pokeapi.js"
import {CategoryButtons} from "./category_buttons.js"
import {TopBar} from "./top_bar.js"
import {ResultsGrid} from "./results.js"
import {Paginator} from "./paginator.js"
import {FilterButtons} from "./filter_buttons.js"

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
      currentPage: 1,
      totalPages: 1,
      categoryFilter: "",
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
  
  handleFilter (filter_name) {
    this.setState({
      currentScreen: filter_name,
      searchValue: "",
    })
  }
  
  updateFilterType = (data, pokemonType) => {
    // Format data from the api
    const pokemonsFormated = data.pokemon.map ((pokemonData) => {
      const pokemonName = pokemonData.pokemon.name
      const pokemonUrl = pokemonData.pokemon.url
      const pokemonEntry = pokemonUrl.split("/") [pokemonUrl.split("/").length - 2]
      return {
        entry_number: pokemonEntry,
        pokemon_species: {
          name: pokemonName,
          url: pokemonUrl
        }
      }
    }) 

    // Filter extra pokemons
    const pokemonsFormatedFiltered = pokemonsFormated.filter ((pokemonData) => {
      return parseInt(pokemonData.entry_number) < 10000
    })

    // Update data in state
    this.setState ({
      pokemons: pokemonsFormatedFiltered,
      foundPokemons: pokemonsFormatedFiltered,
      currentScreen: `type ${pokemonType}`,
    })
  }

  handleFilterType (pokemonType) {
    // handle click in filter type button
    getPokemonsType (this.updateFilterType, pokemonType)
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
          handleFilterType={(pokemonType) => this.handleFilterType(pokemonType)}
          updateResults={(currentScreen) => this.updateResults(currentScreen=currentScreen)}
          onHomeLoad={() => this.handleUpdatePokedex()}
        />
        
      </div>
    )
  }
}

function Main (props) {
  if (props.currentScreen == "home") {
    props.onHomeLoad ()
    return <MainHome
      currentScreen = {props.currentScreen}
      searchValue={props.searchValue}
      handleChangeSearch ={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      handleFilter={props.handleFilter}
    />
  } else if (props.currentScreen == "all types" || props.currentScreen.includes("type ")) {

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
      updateResults={props.updateResults}
    />
  } else if (["types", "generations"].includes (props.currentScreen)) {
    return <MainFilterType
      currentScreen={props.currentScreen}
      handleChangeSearch={props.handleChangeSearch}
      handleClickSearch={props.handleClickSearch}
      searchValue={props.searchValue}
      handleClickGoBack={props.handleClickGoBack}
      handleFilterType={props.handleFilterType}
    />
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
        handleFilter={props.handleFilter}
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

function MainFilterType (props) {
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
        handleFilterType={props.handleFilterType}
        currentScreen={props.currentScreen}
      />
    </main>
  )
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
