"use strict";

const e = React.createElement;

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_value: "",
    };
  }

  handleChangeSearch = (event) => {
    this.setState({
      search_value: event.target.value,
    });
  };

  // Main component
  render() {
    return (
      <SearchBar
        onChange={(event) => this.handleChangeSearch(event)}
        value={this.state.search_value}
      />
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
const domContainer = document.querySelector("#like_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));
