import {get_pokedex} from "./pokeapi.js"

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
    const pokemons = this.state.pokemons
    
    let found_pokemons = pokemons.filter ((pokemon) => {
      return pokemon.pokemon_species.name.includes (search_value)
    })
    
    this.setState({
      search_value: search_value,
      found_pokemons: found_pokemons,
    })

  }

  handleClickSearch () {
    // Go to search all types screen
    this.setState({
      current_screen: "all types",
      last_screen: "home",
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
    />
  }
}

function MainHome (props) {
  return (
    <main className={props.current_screen.replace(" ", "-")}>
          
      <SearchBarHome
        onChange={(event) => props.handleChangeSearch(event)}
        onClick={() => props.handleClickSearch()}
        value={props.search_value}
        sectionTitle = {props.current_screen}
      />

      <SearchButtons/>

    </main>
  )
}

function MainSearch (props) {
  return (
    <main className={props.current_screen.replace(" ", "-")}>
          
      <SearchBarType
        onChange={(event) => props.handleChangeSearch(event)}
        onClick={() => props.handleClickSearch()}
        value={props.search_value}
        sectionTitle = {props.current_screen}
        handleClickGoBack={props.handleClickGoBack}
      />

    </main>
  )
}


function SearchBarHome (props) {
  // Search bar html
  return (
    <section className="search-bar">
      <div className="bg-img-wrapper">
        <img src="./imgs/pokeball.svg" alt="pokeball background image" className="bg-img"></img>
      </div>

      <div className="content regular-width">
        <h1 className="title">Find your <br/> favorite pokemon</h1>
        <label>
          <img src="./imgs/search.svg" alt="Serach icon"></img>
          <SearchBarInput 
            onChange={props.onChange}
            value={props.value}
          />
          <SearchBarButton
            onClick={props.onClick}
            disabled={props.value.length > 0 ? false : true}
          />
          
        </label>
      </div>
    </section> 
  )
}

function SearchBarType (props) {
  // Search bar html
  return (
    <section className="search-bar">
      <div className="content regular-width">
        <SearchBarGoBack
          sectionTitle = {props.sectionTitle}
          onClick={props.handleClickGoBack}
        />
        <label>
          <img src="./imgs/search.svg" alt="Serach icon"></img>
          <SearchBarInput 
            onChange={props.onChange}
            value={props.value}
          />            
        </label>
      </div>
    </section> 
  )
}

function SearchBarInput (props) {
  return (
    <input
      type="search"
      placeholder="Search pokemon"
      onChange={props.onChange}
      value={props.value}
    ></input>
  )
}

function SearchBarButton (props) {
  return (
    <input
      type="button"
      value="search"
      onClick={props.onClick}
      disabled={props.disabled}
      className="btn round"
    ></input>
  )
}

function SearchBarGoBack (props) {
  return (
    <div className="return" onClick={props.onClick}>
      <img src="./imgs/arrow.svg" alt="go back icon" className="return-icon"/>
      <h2 className="section-title">{props.sectionTitle}</h2>
    </div>
  )
}

function SearchButtons (props) {
  return (
    <section className="search-buttons">
      <div className="separator">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className="buttons regular-width">
        <SearchButton value="search" pokecolor="grass"/>
        <SearchButton value="location" pokecolor="fire"/>
        <SearchButton value="moves and habilities" pokecolor="water"/>
      </div>
    </section>
  )
}

function SearchButton (props) {
  return (
    <button className="btn round" pokecolor={props.pokecolor}>
      {props.value}
      <img 
        src={"./imgs/" + props.value.replaceAll (" ", "-") + "-btn.svg"}
        className="regular"
        />
    </button>
  )
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
