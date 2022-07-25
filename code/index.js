var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { getPokedex, getPokemonsFilter } from "./pokeapi.js";
import { CategoryButtons } from "./category_buttons.js";
import { TopBar } from "./top_bar.js";
import { ResultsGrid } from "./results.js";
import { Paginator } from "./paginator.js";
import { FilterButtons } from "./filter_buttons.js";
import { Pokemon } from "./pokemon.js";

"use strict";

var e = React.createElement;

function getPokemonEntry(pokemonData) {

  // Get entry
  var url = pokemonData.url;
  var pokemonEntry = url.split("/")[url.split("/").length - 2];
  var pokemonEntryFormated = pokemonEntry;

  // Format pokemon entry text
  if (pokemonEntryFormated.length == 1) {
    pokemonEntry = "00" + pokemonEntryFormated;
  } else if (pokemonEntryFormated.length == 2) {
    pokemonEntry = "0" + pokemonEntryFormated;
  }

  return [pokemonEntryFormated, pokemonEntry];
}

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

    _this.updateFilter = function (data, filterkey, filterValue) {
      // Format data from the api
      var pokemonsFormated = void 0;

      if (filterkey == "type") {
        // Format data for pokemon type filter
        pokemonsFormated = data.pokemon.map(function (pokemonData) {
          var pokemonName = pokemonData.pokemon.name;
          var pokemonUrl = pokemonData.pokemon.url;

          var _getPokemonEntry = getPokemonEntry(pokemonData.pokemon),
              _getPokemonEntry2 = _slicedToArray(_getPokemonEntry, 2),
              pokemonEntry = _getPokemonEntry2[0],
              pokemonEntryFormated = _getPokemonEntry2[1];

          return {
            entry_number: pokemonEntry,
            entry_formated: pokemonEntryFormated,
            pokemon_species: {
              name: pokemonName,
              url: pokemonUrl
            }
          };
        });

        // Filter extra pokemons
        pokemonsFormated = pokemonsFormated.filter(function (pokemonData) {
          return parseInt(pokemonData.entry_number) < 10000;
        });
      } else {
        // Format data for pokemon generation filter
        pokemonsFormated = data.pokemon_species.map(function (pokemonData) {
          var pokemonName = pokemonData.name;
          var pokemonUrl = pokemonData.url;

          var _getPokemonEntry3 = getPokemonEntry(pokemonData),
              _getPokemonEntry4 = _slicedToArray(_getPokemonEntry3, 2),
              pokemonEntry = _getPokemonEntry4[0],
              pokemonEntryFormated = _getPokemonEntry4[1];

          return {
            entry_number: pokemonEntry,
            entry_formated: pokemonEntryFormated,
            pokemon_species: {
              name: pokemonName,
              url: pokemonUrl
            }
          };
        });
      }

      // Short pokemon by number
      var pokemonsEntries = pokemonsFormated.map(function (pokemonData) {
        return pokemonData.entry_formated;
      });
      pokemonsEntries.sort();

      var pokemonsFormatedLast = [].concat(_toConsumableArray(pokemonsFormated));
      pokemonsFormated = pokemonsEntries.map(function (entry_formated) {
        return pokemonsFormatedLast.filter(function (pokemonData) {
          return pokemonData.entry_formated == entry_formated;
        })[0];
      });

      // Update data in state
      _this.setState({
        pokemons: pokemonsFormated,
        foundPokemons: pokemonsFormated,
        currentScreen: filterkey + " " + filterValue
      });
    };

    _this.state = {
      searchValue: "",
      pokemons: [],
      foundPokemons: [],
      currentScreen: "home",
      currentPage: 1,
      totalPages: 1,
      categoryFilter: "",
      pokemonId: 1
    };
    return _this;
  }

  _createClass(Pokedex, [{
    key: "handleUpdatePokedex",
    value: function handleUpdatePokedex() {
      // Get main data from api
      getPokedex(this.updatePokedex);
    }
  }, {
    key: "updateResults",
    value: function updateResults() {
      var searchValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      // Update the results to show in the current page

      // Get state variables
      var pokemons = this.state.pokemons;
      if (searchValue == null) {
        searchValue = this.state.searchValue;
      }

      // Filter pokemons
      var foundPokemons = pokemons.filter(function (pokemon) {
        return pokemon.pokemon_species.name.includes(searchValue.toLowerCase());
      });

      // Calculate number of result pages
      var totalPages = Math.ceil(foundPokemons.length / 12);

      // Get pokemons for current page
      if (foundPokemons.length > 12) {
        var pokemon_position = currentPage * 12;
        foundPokemons = foundPokemons.slice(pokemon_position - 12, pokemon_position);
      }

      // Go to search all types screen
      this.setState({
        foundPokemons: foundPokemons,
        searchValue: searchValue,
        currentPage: currentPage,
        totalPages: totalPages
      });
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
        this.updateResults(searchValue);
      }
    }
  }, {
    key: "handleClickSearch",
    value: function handleClickSearch() {
      this.setState({
        currentScreen: "type all"
      });
    }
  }, {
    key: "handleClickGoBack",
    value: function handleClickGoBack() {
      // Go back to last screen
      this.setState({
        currentScreen: "home",
        searchValue: ""
      });
    }
  }, {
    key: "handleClickNextPage",
    value: function handleClickNextPage() {
      var currentPage = this.state.currentPage;
      currentPage++;
      this.updateResults(null, currentPage);
    }
  }, {
    key: "handleClickBackPage",
    value: function handleClickBackPage() {
      var currentPage = this.state.currentPage;
      currentPage--;
      this.updateResults(null, currentPage);
    }
  }, {
    key: "handleCategory",
    value: function handleCategory(categoryName) {
      this.setState({
        currentScreen: categoryName,
        searchValue: ""
      });
    }
  }, {
    key: "handleFilter",
    value: function handleFilter(filterValue) {
      // handle click in filter button
      var currentScreen = this.state.currentScreen;
      var filterkey = currentScreen.substring(0, currentScreen.length - 1);
      filterkey = filterkey.replace(" ", "-");
      if (["color", "habitat"].includes(filterkey)) {
        filterkey = "pokemon-" + filterkey;
      }

      getPokemonsFilter(this.updateFilter, filterkey, filterValue.toLowerCase());
    }
  }, {
    key: "updatePokemonId",
    value: function updatePokemonId(id) {
      this.setState({
        pokemonId: id,
        currentScreen: "pokemon"
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
          foundPokemons: this.state.foundPokemons,
          currentPage: this.state.currentPage,
          totalPages: this.state.totalPages,
          handleClickNextPage: function handleClickNextPage() {
            return _this2.handleClickNextPage();
          },
          handleClickBackPage: function handleClickBackPage() {
            return _this2.handleClickBackPage();
          },
          pokemonsNum: this.state.foundPokemons.length,
          handleCategory: function handleCategory(categoryName) {
            return _this2.handleCategory(categoryName);
          },
          handleFilter: function handleFilter(filterValue) {
            return _this2.handleFilter(filterValue);
          },
          updateResults: function updateResults(currentScreen) {
            return _this2.updateResults(currentScreen = currentScreen);
          },
          onHomeLoad: function onHomeLoad() {
            return _this2.handleUpdatePokedex();
          },
          updatePokemonId: function updatePokemonId(id) {
            return _this2.updatePokemonId(id);
          },
          pokemonId: this.state.pokemonId
        })
      );
    }
  }]);

  return Pokedex;
}(React.Component);

function Main(props) {
  var currentScreen = props.currentScreen;

  // Home screen
  if (currentScreen == "home") {
    props.onHomeLoad();
    return React.createElement(MainHome, {
      currentScreen: currentScreen,
      searchValue: props.searchValue,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      handleCategory: props.handleCategory
    });

    // Filter screens
  } else if (currentScreen == "all types" || currentScreen.includes("type ") || currentScreen.includes("generation ") || currentScreen.includes("egg-group ") || currentScreen.includes("color ") || currentScreen.includes("habitat ")) {

    return React.createElement(MainSearch, {
      currentScreen: currentScreen,
      searchValue: props.searchValue,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      handleClickGoBack: props.handleClickGoBack,
      foundPokemons: props.foundPokemons,
      currentPage: props.currentPage,
      totalPages: props.totalPages,
      handleClickNextPage: props.handleClickNextPage,
      handleClickBackPage: props.handleClickBackPage,
      pokemonsNum: props.pokemonsNum,
      updateResults: props.updateResults,
      updatePokemonId: props.updatePokemonId
    });

    // Filter buttons screens
  } else if (["types", "generations", "egg groups", "colors", "habitats"].includes(currentScreen)) {
    return React.createElement(MainFilter, {
      currentScreen: currentScreen,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      handleClickGoBack: props.handleClickGoBack,
      handleFilter: props.handleFilter
    });

    // Pokemon screen
  } else if (currentScreen == "pokemon") {
    return React.createElement(MainPokemon, {
      currentScreen: currentScreen,
      pokemonId: props.pokemonId,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      handleClickGoBack: props.handleClickGoBack
    });
  }
}

function MainHome(props) {
  return React.createElement(
    "main",
    { className: props.currentScreen.replace(" ", "-") },
    React.createElement(TopBar, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      currentScreen: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    }),
    React.createElement(CategoryButtons, {
      handleCategory: props.handleCategory
    })
  );
}

var MainSearch = function (_React$Component2) {
  _inherits(MainSearch, _React$Component2);

  function MainSearch() {
    _classCallCheck(this, MainSearch);

    return _possibleConstructorReturn(this, (MainSearch.__proto__ || Object.getPrototypeOf(MainSearch)).apply(this, arguments));
  }

  _createClass(MainSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Call to update function for enable pagination
      this.props.updateResults();
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "main",
        { className: this.props.currentScreen.replace(" ", "-") },
        React.createElement(TopBar, {
          handleChangeSearch: this.props.handleChangeSearch,
          handleClickSearch: this.props.handleClickSearch,
          searchValue: this.props.searchValue,
          currentScreen: this.props.currentScreen,
          handleClickGoBack: this.props.handleClickGoBack
        }),
        React.createElement(Paginator, {
          currentPage: this.props.currentPage,
          totalPages: this.props.totalPages,
          pokemonsNum: this.props.pokemonsNum,
          clickNextPage: this.props.handleClickNextPage,
          clickBackPage: this.props.handleClickBackPage
        }),
        React.createElement(ResultsGrid, {
          pokemons: this.props.foundPokemons,
          updatePokemonId: this.props.updatePokemonId
        }),
        React.createElement(Paginator, {
          currentPage: this.props.currentPage,
          totalPages: this.props.totalPages,
          pokemonsNum: this.props.pokemonsNum,
          clickNextPage: this.props.handleClickNextPage,
          clickBackPage: this.props.handleClickBackPage
        })
      );
    }
  }]);

  return MainSearch;
}(React.Component);

function MainFilter(props) {
  return React.createElement(
    "main",
    { className: props.currentScreen.replace(" ", "-") },
    React.createElement(TopBar, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      currentScreen: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    }),
    React.createElement(FilterButtons, {
      handleFilter: props.handleFilter,
      currentScreen: props.currentScreen
    })
  );
}

function MainPokemon(props) {
  return React.createElement(
    "main",
    { className: props.currentScreen.replace(" ", "-") },
    React.createElement(TopBar, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      currentScreen: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    }),
    React.createElement(Pokemon, {
      pokemonId: props.pokemonId
    })
  );
}

// render button
var domContainer = document.querySelector("#root");
var root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));