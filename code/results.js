var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { getPokemon } from "./pokeapi.js";

export function ResultsGrid(props) {

    // Create a card for each pokemon
    var cards = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = props.pokemons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pokemon_data = _step.value;

            cards.push(React.createElement(ResultCard, { pokemon: pokemon_data, key: pokemon_data.entry_number.toString() }));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (cards.length > 0) {
        // Render pokemons
        return React.createElement(
            "section",
            { className: "results-grid regular-width" },
            cards
        );
    } else {
        // Render error screen
        var kaomojis = ["ಠ_ಠ", "ಠ▃ಠ", "ノಠ_ಠノ", "(┳◇┳)", "(ó﹏ò｡)", "(;´д｀)", "（￣s￣；"];
        var kaomoji = kaomojis[Math.floor(Math.random() * kaomojis.length)];
        return React.createElement(
            "section",
            { className: "results-grid error regular-width" },
            React.createElement(
                "div",
                { className: "kaomoji" },
                kaomoji
            ),
            React.createElement(
                "h3",
                null,
                "Not pokemon found"
            )
        );
    }
}

var ResultCard = function (_React$Component) {
    _inherits(ResultCard, _React$Component);

    function ResultCard(props) {
        _classCallCheck(this, ResultCard);

        var _this = _possibleConstructorReturn(this, (ResultCard.__proto__ || Object.getPrototypeOf(ResultCard)).call(this, props));

        _this.updatePokemonData = function (data) {
            // Update state
            _this.setState({
                pokemonData: data
            });
        };

        _this.state = {
            pokemonCode: _this.props.pokemon.entry_number,
            pokemonName: _this.props.pokemon.pokemon_species.name,
            pokemonData: {}
        };
        return _this;
    }

    _createClass(ResultCard, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // Query data for current pokemon
            getPokemon(this.updatePokemonData, this.state.pokemonCode);
        }
    }, {
        key: "render",
        value: function render() {

            // Check if image is loaded from api
            var image = void 0;
            var pokemon_image = void 0;
            var pokemon_type = void 0;
            if (this.state.pokemonData.sprites && this.state.pokemonData.types) {
                // Render pokemon image
                image = this.state.pokemonData.sprites.front_default;
                if (image != null) {
                    // Api image
                    pokemon_image = React.createElement("img", { src: image, alt: "pokemon image" });
                } else {
                    pokemon_image = React.createElement("img", { src: "./imgs/pokemon-not-found.png", alt: "pokemon image not found" });
                }

                // Render pokemon code color
                pokemon_type = this.state.pokemonData.types[0].type.name;
            } else {
                // Render default image
                image = "./imgs/loading.gif";
                pokemon_image = React.createElement("img", { src: image, alt: "loading image" });

                // Normal as default pokemon type
                pokemon_type = "normal";
            }

            return React.createElement(
                "article",
                { className: "card btn round" },
                React.createElement(
                    "span",
                    {
                        className: "pokemonCode text-shadow",
                        pokecolor: pokemon_type
                    },
                    "#",
                    this.state.pokemonCode
                ),
                pokemon_image,
                React.createElement(
                    "h3",
                    null,
                    this.state.pokemonName
                )
            );
        }
    }]);

    return ResultCard;
}(React.Component);