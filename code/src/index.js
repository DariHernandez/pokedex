"use strict";

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
      <div class="pokedex">

        {/* Render header */}
        <header>
          <img src="./imgs/pokeball.svg" alt="app logo"></img>
          <h2>Pokedex</h2>
        </header>

        {/* Render main */}
        <main>
          <h1>Find your favorite pokemon</h1>
          <SearchBar
            // onChange={(event) => this.handleChangeSearch(event)}
            // value={this.state.search_value}
          />
        </main>
      </div>
    );
  }
}


class SearchBar extends React.Component {
  render() {
    // Search bar html
    return (
      <label>
        <img src="./imgs/search.svg" alt="Serach icon"></img>
        <input
          type="search"
          placeholder="Search pokemon"
          onChange={this.props.onChange}
          value={this.props.value}
        ></input>
        <p>{this.props.value}</p>
      </label>
    );
  }
}

// render button
const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));
