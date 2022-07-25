var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { getPokemon, getPokemonSpecies } from "./pokeapi.js";

export var Pokemon = function (_React$Component) {
    _inherits(Pokemon, _React$Component);

    function Pokemon(props) {
        _classCallCheck(this, Pokemon);

        var _this = _possibleConstructorReturn(this, (Pokemon.__proto__ || Object.getPrototypeOf(Pokemon)).call(this, props));

        _this.updatePokemonData = function (data) {

            // Get component current data
            var pokemonData = _this.state.pokemonData;

            // Get data from api and save it
            pokemonData.baseExperience = data.base_experience;
            pokemonData.height = data.height;
            pokemonData.weight = data.weight;
            pokemonData.name = data.name;
            pokemonData.sprite = data.sprites.front_default;
            pokemonData.type = data.types[0].type.name;

            // Get and format moves
            pokemonData.moves = {};
            data.moves.map(function (moveElem) {

                // Get move name and learng type
                var move_name = moveElem.move.name;
                var move_details_last = moveElem.version_group_details[moveElem.version_group_details.length - 1];
                var move_learn_type = move_details_last.move_learn_method.name;
                var move_learn_level = move_details_last.level_learned_at;
                var move_learn = void 0;
                if (move_learn_type == "level-up") {
                    move_learn = "level " + move_learn_level;
                } else {
                    move_learn = "machine";
                }

                // Save in object
                pokemonData.moves[move_name] = move_learn;
            });

            // Get and format stats
            pokemonData.stats = {};
            data.stats.map(function (statElem) {
                var value = statElem.base_stat;
                var name = statElem.stat.name;

                // Short stat name
                if (name == "attack") {
                    name = "atk";
                } else if (name == "defense") {
                    name = "def";
                } else if (name == "special-attack") {
                    name = "satk";
                } else if (name == "special-defense") {
                    name = "sdef";
                } else if (name == "speed") {
                    name = "spd";
                }

                pokemonData.stats[name] = value;
            });

            // Update state
            var newState = {};
            newState["pokemonData"] = pokemonData;
            pokemonData = _this.state.pokemonData;

            // Stop loading if all api calls are done
            if ("baseHappiness" in pokemonData) {
                // Stop loading
                newState["isLoading"] = false;
            }

            _this.setState(newState);
        };

        _this.updatePokemonDataSpacies = function (data) {

            // Get component current data
            var pokemonData = _this.state.pokemonData;

            // Get data from api and save it
            pokemonData.baseHappiness = data.base_happiness;
            pokemonData.captureRate = data.capture_rate;

            // Get las pokemon description in english
            var englishEntries = data.flavor_text_entries.filter(function (textEntry) {
                if (textEntry.language.name == "en") {
                    return true;
                }
            });
            pokemonData.description = englishEntries[englishEntries.length - 1].flavor_text;

            // Update state
            var newState = {};
            newState["pokemonData"] = pokemonData;
            pokemonData = _this.state.pokemonData;

            // Stop loading if all api calls are done
            if ("baseExperience" in pokemonData) {
                // Stop loading
                newState["isLoading"] = false;
            }

            _this.setState(newState);
        };

        _this.state = {
            isLoading: true,
            pokemonData: {
                pokemonId: 10
            }
        };
        return _this;
    }

    _createClass(Pokemon, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            getPokemon(this.updatePokemonData, this.state.pokemonData.pokemonId);
            getPokemonSpecies(this.updatePokemonDataSpacies, this.state.pokemonData.pokemonId);
        }
    }, {
        key: "render",
        value: function render() {
            // Show loading spinner
            if (this.state.isLoading) {
                return React.createElement(
                    "section",
                    { className: "pokemon" },
                    React.createElement("img", {
                        className: "loading",
                        src: "./imgs/loading.gif"
                    })
                );
            } else {

                // Show pokemon dat
                return React.createElement(
                    "section",
                    { className: "pokemon" },
                    React.createElement(Background, {
                        pokemonType: this.state.pokemonData.type
                    }),
                    React.createElement(ArrowButton, {
                        arrowType: "back"
                    }),
                    React.createElement(ArrowButton, {
                        arrowType: "next"
                    }),
                    React.createElement(Name, {
                        pokemonName: this.state.pokemonData.name,
                        pokemonId: this.state.pokemonData.pokemonId,
                        pokemonType: this.state.pokemonData.type
                    }),
                    React.createElement(Sprite, {
                        sprite: this.state.pokemonData.sprite
                    }),
                    React.createElement(TypeTag, {
                        pokemonType: this.state.pokemonData.type
                    }),
                    React.createElement(Details, {
                        pokemonType: this.state.pokemonData.type,
                        pokemonDescription: this.state.pokemonData.description,
                        pokemonHeight: this.state.pokemonData.height,
                        pokemonWeight: this.state.pokemonData.weight,
                        pokemonBaseExperience: this.state.pokemonData.baseExperience,
                        pokemonBaseHappiness: this.state.pokemonData.baseHappiness,
                        pokemonCaptureRate: this.state.pokemonData.captureRate,
                        pokemonStats: this.state.pokemonData.stats,
                        pokemonMoves: this.state.pokemonData.moves
                    })
                );
            }
        }
    }]);

    return Pokemon;
}(React.Component);

function Background(props) {
    // Background with pokeball and separator
    return React.createElement(
        "div",
        { className: "background" },
        React.createElement("div", { className: "top", pokecolor: props.pokemonType }),
        React.createElement("img", { className: "pokeball", src: "./imgs/pokeball-white.svg" }),
        React.createElement(
            "div",
            { className: "separator" },
            React.createElement(
                "svg",
                { "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1200 120", preserveAspectRatio: "none" },
                React.createElement("path", { d: "M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z", className: "shape-fill" })
            )
        ),
        React.createElement("div", { className: "bottom", pokecolor: props.pokemonType })
    );
}

function ArrowButton(props) {
    // Button for go to the next or last pokemon
    return React.createElement(
        "button",
        { className: "btn arrow pokemon " + props.arrowType },
        React.createElement("img", { src: "./imgs/arrow-dark.svg" })
    );
}

function Name(props) {
    // Format pokemon id number for use 3 digits
    var id_formated = props.pokemonId;
    if (id_formated.length == 1) {
        id_formated = "#00" + id_formated;
    } else if (id_formated.length == 2) {
        id_formated = "#0" + id_formated;
    } else if (id_formated.length == 3) {
        id_formated = "#" + id_formated;
    }

    // Show pokemon name
    return React.createElement(
        "h1",
        { className: "pokemon-name", pokecolor: props.pokemonType },
        React.createElement(
            "span",
            { className: "name" },
            props.pokemonName
        ),
        React.createElement(
            "span",
            { className: "id" },
            id_formated
        )
    );
}

function Sprite(props) {
    // Show the pokemon image
    return React.createElement(
        "div",
        { className: "sprites" },
        React.createElement("img", {
            src: props.sprite,
            className: "main"
        }),
        React.createElement("img", {
            src: props.sprite,
            className: "back"
        })
    );
}

function TypeTag(props) {
    // Show the pokemon name
    return React.createElement(
        "div",
        { className: "type-tag" },
        React.createElement(
            "span",
            { className: "text-shadow", pokecolor: props.pokemonType },
            props.pokemonType
        )
    );
}

var Details = function (_React$Component2) {
    _inherits(Details, _React$Component2);

    function Details(props) {
        _classCallCheck(this, Details);

        var _this2 = _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).call(this, props));

        _this2.state = {
            activeButton: "About"
        };
        return _this2;
    }

    _createClass(Details, [{
        key: "handleUpdateActiveButton",
        value: function handleUpdateActiveButton(newButton) {
            // Update the current active button and the info to show
            this.setState({
                activeButton: newButton
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            // Select correct info to show
            var info = void 0;
            if (this.state.activeButton == "About") {
                info = React.createElement(InfoAbout, {
                    description: this.props.pokemonDescription,
                    height: this.props.pokemonHeight,
                    weight: this.props.pokemonWeight,
                    baseExperience: this.props.pokemonBaseExperience,
                    baseHappiness: this.props.pokemonBaseHappiness,
                    captureRate: this.props.pokemonCaptureRate

                });
            } else if (this.state.activeButton == "Stats") {
                info = React.createElement(InfoStats, {
                    stats: this.props.pokemonStats,
                    pokemonType: this.props.pokemonType
                });
            } else if (this.state.activeButton == "Moves") {
                info = React.createElement(InfoMoves, {
                    moves: this.props.pokemonMoves
                });
            }

            return React.createElement(
                "section",
                { className: "details" },
                React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(DetailsButton, {
                        buttonType: "left",
                        value: "About",
                        pokemonType: this.props.pokemonType,
                        activeButton: this.state.activeButton,
                        onClick: function onClick(newButton) {
                            return _this3.handleUpdateActiveButton(newButton);
                        }
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "center",
                        value: "Stats",
                        pokemonType: this.props.pokemonType,
                        activeButton: this.state.activeButton,
                        onClick: function onClick(newButton) {
                            return _this3.handleUpdateActiveButton(newButton);
                        }
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "right",
                        value: "Moves",
                        pokemonType: this.props.pokemonType,
                        activeButton: this.state.activeButton,
                        onClick: function onClick(newButton) {
                            return _this3.handleUpdateActiveButton(newButton);
                        }
                    })
                ),
                info
            );
        }
    }]);

    return Details;
}(React.Component);

function DetailsButton(props) {
    // Buton in the info section (for change the content of the section)

    var className = void 0;
    if (props.activeButton == props.value) {
        className = "btn pokemon-details no-box-shadow " + props.buttonType + " active";
    } else {
        className = "btn pokemon-details no-box-shadow " + props.buttonType;
    }

    return React.createElement(
        "button",
        {
            className: className,
            pokecolor: props.pokemonType,
            onClick: function onClick() {
                return props.onClick(props.value);
            }
        },
        React.createElement(
            "span",
            null,
            props.value
        )
    );
}

function InfoAbout(props) {
    // General info of the pokemon
    return React.createElement(
        "div",
        { className: "info about" },
        React.createElement(
            "p",
            { className: "description" },
            props.description.replaceAll("\\n", " ").replaceAll("\\u000", " ")
        ),
        React.createElement(
            "div",
            { className: "grid" },
            React.createElement(
                "p",
                { className: "header" },
                "Height"
            ),
            React.createElement(
                "p",
                null,
                Math.round(props.height / 10 * 100) / 100,
                " m"
            ),
            React.createElement(
                "p",
                null,
                Math.round(props.height / 10 * 3.28084 * 100) / 100,
                " ft"
            ),
            React.createElement(
                "p",
                { className: "header" },
                "Weight"
            ),
            React.createElement(
                "p",
                null,
                Math.round(parseInt(props.weight) / 10 * 100) / 100,
                " kg"
            ),
            React.createElement(
                "p",
                null,
                Math.round(parseInt(props.weight) / 10 * 2.20462 * 100) / 100,
                " lbs"
            ),
            React.createElement(
                "p",
                { className: "header columns-2" },
                "Base experience"
            ),
            React.createElement(
                "p",
                null,
                props.baseExperience
            ),
            React.createElement(
                "p",
                { className: "header columns-2" },
                "Base happiness"
            ),
            React.createElement(
                "p",
                null,
                props.baseHappiness
            ),
            React.createElement(
                "p",
                { className: "header columns-2" },
                "Capture rate"
            ),
            React.createElement(
                "p",
                null,
                props.captureRate
            )
        )
    );
}

function InfoStats(props) {
    // Stats with progress bars

    var stats_bars = [];
    for (var stat_name in props.stats) {

        // Set the with for each bar
        var bar_width = {
            "width": props.stats[stat_name] * 100 / 200 + "%"

            // Save stat bar
        };stats_bars.push(React.createElement(
            "label",
            { key: stat_name, className: "stat " + stat_name },
            React.createElement(
                "p",
                null,
                stat_name
            ),
            React.createElement(
                "div",
                { className: "bar" },
                React.createElement("div", {
                    className: "bar-inner",
                    style: bar_width,
                    pokecolor: props.pokemonType }),
                React.createElement("div", { className: "bar-bg" })
            ),
            React.createElement(
                "p",
                null,
                props.stats[stat_name]
            )
        ));
    }
    return React.createElement(
        "div",
        { className: "info stats" },
        stats_bars
    );
}

function InfoMoves(props) {
    // List of moves
    var moves_details = [];
    for (var move_name in props.moves) {
        var move_learning = props.moves[move_name];
        moves_details.push(React.createElement(
            "li",
            { className: "move", key: move_name },
            move_name,
            " (",
            move_learning,
            ")"
        ));
    }
    return React.createElement(
        "ul",
        { className: "info moves" },
        moves_details
    );
}