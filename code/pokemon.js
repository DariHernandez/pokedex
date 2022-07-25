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
            var pokemonData = _this.state;

            // Get data from api and save it
            pokemonData.baseExperience = data.base_experience;
            pokemonData.height = data.height;
            pokemonData.weight = data.weight;
            pokemonData.name = data.name;
            pokemonData.sprite = data.sprites.front_default;
            pokemonData.type = data.types[0].type.name;
            pokemonData.pokemonId = data.id;

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
            pokemonData = _this.state;

            // Stop loading if all api calls are done
            if ("baseHappiness" in pokemonData) {
                // Stop loading
                newState["isLoading"] = false;
            }

            _this.setState(newState);
        };

        _this.updatePokemonDataSpacies = function (data) {

            // Get component current data
            var pokemonData = _this.state;

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
            pokemonData = _this.state;

            // Stop loading if all api calls are done
            if ("baseExperience" in pokemonData) {
                // Stop loading
                newState["isLoading"] = false;
            }

            _this.setState(newState);
        };

        _this.state = {
            isLoading: true,
            pokemonId: props.pokemonId
        };
        return _this;
    }

    _createClass(Pokemon, [{
        key: "goPokemon",
        value: function goPokemon() {
            var goTo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            // Go to next pokemon in pokedex

            // Update pokemon id
            var pokemonId = this.state.pokemonId;
            pokemonId += goTo;

            // set sprite image to loading
            var sprites = document.querySelectorAll(".sprites > img");
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sprites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var sprite = _step.value;

                    sprite.setAttribute("src", "./imgs/loading.gif");
                }

                // Update component
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

            getPokemon(this.updatePokemonData, pokemonId);
            getPokemonSpecies(this.updatePokemonDataSpacies, pokemonId);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            getPokemon(this.updatePokemonData, this.state.pokemonId);
            getPokemonSpecies(this.updatePokemonDataSpacies, this.state.pokemonId);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

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
                        pokemonType: this.state.type
                    }),
                    React.createElement(ArrowButton, {
                        arrowType: "back",
                        onClick: function onClick() {
                            return _this2.goPokemon(-1);
                        },
                        pokemonId: this.state.pokemonId
                    }),
                    React.createElement(ArrowButton, {
                        arrowType: "next",
                        onClick: function onClick() {
                            return _this2.goPokemon(+1);
                        },
                        pokemonId: this.state.pokemonId
                    }),
                    React.createElement(Name, {
                        pokemonName: this.state.name,
                        pokemonId: this.state.pokemonId,
                        pokemonType: this.state.type
                    }),
                    React.createElement(Sprite, {
                        sprite: this.state.sprite
                    }),
                    React.createElement(TypeTag, {
                        pokemonType: this.state.type
                    }),
                    React.createElement(Details, {
                        pokemonType: this.state.type,
                        pokemonDescription: this.state.description,
                        pokemonHeight: this.state.height,
                        pokemonWeight: this.state.weight,
                        pokemonBaseExperience: this.state.baseExperience,
                        pokemonBaseHappiness: this.state.baseHappiness,
                        pokemonCaptureRate: this.state.captureRate,
                        pokemonStats: this.state.stats,
                        pokemonMoves: this.state.moves
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
    var disbale_button = false;
    if (props.pokemonId == 898 && props.arrowType == "next") {
        disbale_button = true;
    } else if (props.pokemonId == 1 && props.arrowType == "back") {
        disbale_button = true;
    }
    return React.createElement(
        "button",
        {
            className: "btn arrow pokemon " + props.arrowType,
            onClick: props.onClick,
            disabled: disbale_button
        },
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

var Sprite = function (_React$Component2) {
    _inherits(Sprite, _React$Component2);

    function Sprite() {
        _classCallCheck(this, Sprite);

        return _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).apply(this, arguments));
    }

    _createClass(Sprite, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // Set image height
            var sprites = document.querySelectorAll(".sprites > img");
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = sprites[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var sprite = _step2.value;

                    var width = sprite.style.width;
                    sprite.style.height = width;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            // Show the pokemon image
            return React.createElement(
                "div",
                { className: "sprites" },
                React.createElement("img", {
                    src: this.props.sprite,
                    className: "main"
                }),
                React.createElement("img", {
                    src: this.props.sprite,
                    className: "back"
                })
            );
        }
    }]);

    return Sprite;
}(React.Component);

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

var Details = function (_React$Component3) {
    _inherits(Details, _React$Component3);

    function Details(props) {
        _classCallCheck(this, Details);

        var _this4 = _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).call(this, props));

        _this4.state = {
            activeButton: "About"
        };
        return _this4;
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
            var _this5 = this;

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
                            return _this5.handleUpdateActiveButton(newButton);
                        }
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "center",
                        value: "Stats",
                        pokemonType: this.props.pokemonType,
                        activeButton: this.state.activeButton,
                        onClick: function onClick(newButton) {
                            return _this5.handleUpdateActiveButton(newButton);
                        }
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "right",
                        value: "Moves",
                        pokemonType: this.props.pokemonType,
                        activeButton: this.state.activeButton,
                        onClick: function onClick(newButton) {
                            return _this5.handleUpdateActiveButton(newButton);
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