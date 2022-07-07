"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Pokedex = function (_React$Component) {
  _inherits(Pokedex, _React$Component);

  function Pokedex() {
    _classCallCheck(this, Pokedex);

    return _possibleConstructorReturn(this, (Pokedex.__proto__ || Object.getPrototypeOf(Pokedex)).apply(this, arguments));
  }

  _createClass(Pokedex, [{
    key: "render",

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
    value: function render() {
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
        React.createElement(
          "main",
          { className: "home" },
          React.createElement(SearchBar
          // onChange={(event) => this.handleChangeSearch(event)}
          // value={this.state.search_value}
          , null),
          React.createElement(SearchButtons, null)
        )
      );
    }
  }]);

  return Pokedex;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      // Search bar html
      return React.createElement(
        "section",
        { className: "search-bar" },
        React.createElement("img", { src: "./imgs/pokeball.svg", alt: "pokeball background image", className: "bg-img" }),
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
            React.createElement("input", {
              type: "search",
              placeholder: "Search pokemon",
              onChange: this.props.onChange,
              value: this.props.value
            })
          )
        )
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var SearchButtons = function (_React$Component3) {
  _inherits(SearchButtons, _React$Component3);

  function SearchButtons() {
    _classCallCheck(this, SearchButtons);

    return _possibleConstructorReturn(this, (SearchButtons.__proto__ || Object.getPrototypeOf(SearchButtons)).apply(this, arguments));
  }

  _createClass(SearchButtons, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        { className: "search-buttons regular-width" },
        React.createElement(
          "div",
          { "class": "separator" },
          React.createElement(
            "svg",
            { "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1200 120", preserveAspectRatio: "none" },
            React.createElement("path", { d: "M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z", "class": "shape-fill" })
          )
        ),
        React.createElement(SearchButton, { value: "search", pokecolor: "grass" }),
        React.createElement(SearchButton, { value: "location", pokecolor: "fire" }),
        React.createElement(SearchButton, { value: "moves and habilities", pokecolor: "water" })
      );
    }
  }]);

  return SearchButtons;
}(React.Component);

var SearchButton = function (_React$Component4) {
  _inherits(SearchButton, _React$Component4);

  function SearchButton() {
    _classCallCheck(this, SearchButton);

    return _possibleConstructorReturn(this, (SearchButton.__proto__ || Object.getPrototypeOf(SearchButton)).apply(this, arguments));
  }

  _createClass(SearchButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { className: "btn round", pokecolor: this.props.pokecolor },
        this.props.value,
        React.createElement("img", {
          src: "./imgs/" + this.props.value.replaceAll(" ", "-") + "-btn.svg",
          className: "regular"
        })
      );
    }
  }]);

  return SearchButton;
}(React.Component);

// render button


var domContainer = document.querySelector("#root");
var root = ReactDOM.createRoot(domContainer);
root.render(e(Pokedex));