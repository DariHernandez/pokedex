var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { get_pokedex } from "./pokeapi.js";

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
      search_value: "",
      pokemons: [],
      found_pokemons: [],
      current_screen: "home",
      last_screen: ""
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

      var search_value = event.target.value;
      var pokemons = this.state.pokemons;

      var found_pokemons = pokemons.filter(function (pokemon) {
        return pokemon.pokemon_species.name.includes(search_value);
      });

      this.setState({
        search_value: search_value,
        found_pokemons: found_pokemons
      });
    }
  }, {
    key: "handleClickSearch",
    value: function handleClickSearch() {
      // Go to search all types screen
      this.setState({
        current_screen: "all types",
        last_screen: "home"
      });
    }
  }, {
    key: "handleClickGoBack",
    value: function handleClickGoBack() {
      // Go back to last screen
      var last_screen = this.state.last_screen;
      this.setState({
        current_screen: last_screen,
        last_screen: ""
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
          current_screen: this.state.current_screen,
          search_value: this.state.search_value,
          handleChangeSearch: function handleChangeSearch(event) {
            return _this2.handleChangeSearch(event);
          },
          handleClickSearch: function handleClickSearch() {
            return _this2.handleClickSearch();
          },
          handleClickGoBack: function handleClickGoBack() {
            return _this2.handleClickGoBack();
          }
        })
      );
    }
  }]);

  return Pokedex;
}(React.Component);

function Main(props) {
  if (props.current_screen == "home") {
    return React.createElement(MainHome, {
      current_screen: props.current_screen,
      search_value: props.search_value,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch
    });
  } else if (props.current_screen == "all types") {
    return React.createElement(MainSearch, {
      current_screen: props.current_screen,
      search_value: props.search_value,
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      handleClickGoBack: props.handleClickGoBack
    });
  }
}

function MainHome(props) {
  return React.createElement(
    "main",
    { className: props.current_screen.replace(" ", "-") },
    React.createElement(SearchBarHome, {
      onChange: function onChange(event) {
        return props.handleChangeSearch(event);
      },
      onClick: function onClick() {
        return props.handleClickSearch();
      },
      value: props.search_value,
      sectionTitle: props.current_screen
    }),
    React.createElement(SearchButtons, null)
  );
}

function MainSearch(props) {
  return React.createElement(
    "main",
    { className: props.current_screen.replace(" ", "-") },
    React.createElement(SearchBarType, {
      onChange: function onChange(event) {
        return props.handleChangeSearch(event);
      },
      onClick: function onClick() {
        return props.handleClickSearch();
      },
      value: props.search_value,
      sectionTitle: props.current_screen,
      handleClickGoBack: props.handleClickGoBack
    })
  );
}

function SearchBarHome(props) {
  // Search bar html
  return React.createElement(
    "section",
    { className: "search-bar" },
    React.createElement(
      "div",
      { className: "bg-img-wrapper" },
      React.createElement("img", { src: "./imgs/pokeball.svg", alt: "pokeball background image", className: "bg-img" })
    ),
    React.createElement(
      "div",
      { className: "content regular-width" },
      React.createElement(
        "h1",
        { className: "title" },
        "Find your ",
        React.createElement("br", null),
        " favorite pokemon"
      ),
      React.createElement(
        "label",
        null,
        React.createElement("img", { src: "./imgs/search.svg", alt: "Serach icon" }),
        React.createElement(SearchBarInput, {
          onChange: props.onChange,
          value: props.value
        }),
        React.createElement(SearchBarButton, {
          onClick: props.onClick,
          disabled: props.value.length > 0 ? false : true
        })
      )
    )
  );
}

function SearchBarType(props) {
  // Search bar html
  return React.createElement(
    "section",
    { className: "search-bar" },
    React.createElement(
      "div",
      { className: "content regular-width" },
      React.createElement(SearchBarGoBack, {
        sectionTitle: props.sectionTitle,
        onClick: props.handleClickGoBack
      }),
      React.createElement(
        "label",
        null,
        React.createElement("img", { src: "./imgs/search.svg", alt: "Serach icon" }),
        React.createElement(SearchBarInput, {
          onChange: props.onChange,
          value: props.value
        })
      )
    )
  );
}

function SearchBarInput(props) {
  return React.createElement("input", {
    type: "search",
    placeholder: "Search pokemon",
    onChange: props.onChange,
    value: props.value
  });
}

function SearchBarButton(props) {
  return React.createElement("input", {
    type: "button",
    value: "search",
    onClick: props.onClick,
    disabled: props.disabled,
    className: "btn round"
  });
}

function SearchBarGoBack(props) {
  return React.createElement(
    "div",
    { className: "return", onClick: props.onClick },
    React.createElement("img", { src: "./imgs/arrow.svg", alt: "go back icon", className: "return-icon" }),
    React.createElement(
      "h2",
      { className: "section-title" },
      props.sectionTitle
    )
  );
}

function SearchButtons(props) {
  return React.createElement(
    "section",
    { className: "search-buttons" },
    React.createElement(
      "div",
      { className: "separator" },
      React.createElement(
        "svg",
        { "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1200 120", preserveAspectRatio: "none" },
        React.createElement("path", { d: "M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z", className: "shape-fill" })
      )
    ),
    React.createElement(
      "div",
      { className: "buttons regular-width" },
      React.createElement(SearchButton, { value: "search", pokecolor: "grass" }),
      React.createElement(SearchButton, { value: "location", pokecolor: "fire" }),
      React.createElement(SearchButton, { value: "moves and habilities", pokecolor: "water" })
    )
  );
}

function SearchButton(props) {
  return React.createElement(
    "button",
    { className: "btn round", pokecolor: props.pokecolor },
    props.value,
    React.createElement("img", {
      src: "./imgs/" + props.value.replaceAll(" ", "-") + "-btn.svg",
      className: "regular"
    })
  );
}

// render button
var domContainer = document.querySelector("#root");
var root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));