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
      current_screen: "home"
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
    console.log ("all types")
    this.setState({
      current_screen: "all types",
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
        />
        
      </div>
    )
  }
}

class Main extends React.Component {
  render () {
    if (this.props.current_screen == "home") {
      return <MainHome
        current_screen = {this.props.current_screen}
        search_value={this.props.search_value}
        handleChangeSearch ={this.props.handleChangeSearch}
        handleClickSearch={this.props.handleClickSearch}
      />
    } else if (this.props.current_screen == "all types") {
      return <MainSearch
        current_screen = {this.props.current_screen}
        search_value={this.props.search_value}
        handleChangeSearch ={this.props.handleChangeSearch}
        handleClickSearch={this.props.handleClickSearch}
      />
    }
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
      />

    </main>
  )
}


class SearchBarHome extends React.Component {
  render() {
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
              onChange={this.props.onChange}
              value={this.props.value}
            />
            <SearchBarButton
              onClick={this.props.onClick}
              disabled={this.props.value.length > 0 ? false : true}
            />
            
          </label>
        </div>
      </section> 
    )
  }
}

class SearchBarType extends React.Component {
  render() {
    // Search bar html
    return (
      <section className="search-bar">
        <div className="content regular-width">
          <button className="return">
            <img src="./imgs/arrow.svg" alt="go back icon" className="return-icon"></img>
            <h2 className="section-title">{this.props.sectionTitle}</h2>
          </button>
          <label>
            <img src="./imgs/search.svg" alt="Serach icon"></img>
            <SearchBarInput 
              onChange={this.props.onChange}
              value={this.props.value}
            />            
          </label>
        </div>
      </section> 
    )
  }
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

class SearchButtons extends React.Component {
  render () {
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
}

class SearchButton extends React.Component {
  render () {
    return (
      <button className="btn round" pokecolor={this.props.pokecolor}>
        {this.props.value}
        <img 
          src={"./imgs/" + this.props.value.replaceAll (" ", "-") + "-btn.svg"}
          className="regular"
          />
      </button>
    )
  }
}

// render button
const domContainer = document.querySelector("#root")
const root = ReactDOM.createRoot(domContainer)
root.render(e(Pokedex))
