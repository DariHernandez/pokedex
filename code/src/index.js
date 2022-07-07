"use strict"

const e = React.createElement;

class Pokedex extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     search_value: "",
  //   };
  // }

  // handleChangeSearch = (event) => {
  //   this.setState({
  //     search_value: event.target.value,
  //   });
  // };

  // Main component
  render() {
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
        <main className="home">
          
              <SearchBar
                // onChange={(event) => this.handleChangeSearch(event)}
                // value={this.state.search_value}
              />

              <SearchButtons/>
            
        </main>
      </div>
    );
  }
}


class SearchBar extends React.Component {
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
            <input
              type="search"
              placeholder="Search pokemon"
              onChange={this.props.onChange}
              value={this.props.value}
            ></input>
          </label>
        </div>
      </section> 
    );
  }
}

class SearchButtons extends React.Component {
  render () {
    return (
      <section className="search-buttons">
        <div class="separator">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" class="shape-fill"></path>
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
const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));
