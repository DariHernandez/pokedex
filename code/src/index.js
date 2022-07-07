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
      <div className="pokedex">

        {/* Render header */}
        <header className="home main-area">
          <img src="./imgs/pokeball.svg" alt="app logo"></img>
          <h2 className="title">Pokedex</h2>
        </header>

        {/* Render main */}
        <main>
          <section className="search main-area">
            <h1>Find your favorite pokemon</h1>
            <SearchBar
              // onChange={(event) => this.handleChangeSearch(event)}
              // value={this.state.search_value}
            />
          </section> 
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
