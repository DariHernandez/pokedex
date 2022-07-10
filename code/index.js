var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { get_pokedex } from "./pokeapi.js";
import { SearchButtons } from "./search_buttons.js";
import { SearchBar } from "./search_bar.js";
import { ResultsGrid } from "./results.js";

"use strict";

var e = React.createElement;

var Pokedex = function (_React$Component) {
  _inherits(Pokedex, _React$Component);

  function Pokedex(props) {
    _classCallCheck(this, Pokedex);

    var _this = _possibleConstructorReturn(this, (Pokedex.__proto__ || Object.getPrototypeOf(Pokedex)).call(this, props));

    _this.updatePokedex = function (api_data) {
      // Save main date in status
      _this.setState({
        pokemons: api_data
      });
    };

    _this.state = {
      searchValue: "",
      pokemons: [],
      foundPokemons: [],
      currentScreen: "home",
      lastScreen: ""
    };
    return _this;
  }

  _createClass(Pokedex, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Get main data from api
      get_pokedex(this.updatePokedex);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(event) {

      // Save search value
      var searchValue = event.target.value;

      // Update results when edit text in results page
      if (this.state.currentScreen == "home") {
        this.setState({
          searchValue: searchValue
        });
      } else {
        this.handleClickSearch(searchValue);
      }
    }
  }, {
    key: "handleClickSearch",
    value: function handleClickSearch() {
      var searchValueManual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


      // Get state variables
      var pokemons = this.state.pokemons;
      var searchValue = searchValueManual != null ? searchValueManual : this.state.searchValue;

      // Filter pokemons
      var foundPokemons = pokemons.filter(function (pokemon) {
        return pokemon.pokemon_species.name.includes(searchValue);
      });

      if (foundPokemons.length > 12) {
        foundPokemons = foundPokemons.slice(0, 12);
      }

      // Go to search all types screen
      this.setState({
        currentScreen: "all types",
        lastScreen: "home",
        foundPokemons: foundPokemons,
        searchValue: searchValue

      });
    }
  }, {
    key: "handleClickGoBack",
    value: function handleClickGoBack() {
      // Go back to last screen
      var lastScreen = this.state.lastScreen;
      this.setState({
        currentScreen: lastScreen,
        lastScreen: ""
      });
    }

    // Main component

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Selet main section
      return React.createElement(
        "div",
        { className: "pokedex" },
        React.createElement(
          "header",
          { className: "home" },
          React.createElement(
            "div",
            { className: "content regular-width" },
            React.createElement("img", { src: "./imgs/pokeball.svg", alt: "app logo" }),
            React.createElement(
              "h2",
              { className: "title" },
              "Pokedex"
            )
          )
        ),
        React.createElement(Main, {
          currentScreen: this.state.currentScreen,
          searchValue: this.state.searchValue,
          handleChangeSearch: function handleChangeSearch(event) {
            return _this2.handleChangeSearch(event);
          },
          handleClickSearch: function handleClickSearch() {
            return _this2.handleClickSearch();
          },
          handleClickGoBack: function handleClickGoBack() {
            return _this2.handleClickGoBack();
          },
          foundPokemons: this.state.foundPokemons
        })
      );
    }
  }]);

  return Pokedex;
}(React.Component);

function Main(props) {
  if (props.currentScreen == "home") {
    return React.createElement(MainHome, {
      currentScreen: props.currentScreen,
      searchValue: props.searchValue,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch
    });
  } else if (props.currentScreen == "all types") {
    return React.createElement(MainSearch, {
      currentScreen: props.currentScreen,
      searchValue: props.searchValue,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      handleClickGoBack: props.handleClickGoBack,
      foundPokemons: props.foundPokemons
    });
  }
}

function MainHome(props) {
  return React.createElement(
    "main",
    { className: props.currentScreen.replace(" ", "-") },
    React.createElement(SearchBar, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      currentScreen: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    }),
    React.createElement(SearchButtons, null)
  );
}

function MainSearch(props) {
  return React.createElement(
    "main",
    { className: props.currentScreen.replace(" ", "-") },
    React.createElement(SearchBar, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      currentScreen: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    }),
    React.createElement(ResultsGrid, {
      pokemons: props.foundPokemons
    })
  );
}

// render button
var domContainer = document.querySelector("#root");
var root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));