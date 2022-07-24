var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Pokemon = function (_React$Component) {
    _inherits(Pokemon, _React$Component);

    function Pokemon() {
        _classCallCheck(this, Pokemon);

        return _possibleConstructorReturn(this, (Pokemon.__proto__ || Object.getPrototypeOf(Pokemon)).apply(this, arguments));
    }

    _createClass(Pokemon, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "pokemon" },
                React.createElement(Background, {
                    pokemonType: "steel"
                }),
                React.createElement(ArrowButton, {
                    arrowType: "back"
                }),
                React.createElement(ArrowButton, {
                    arrowType: "next"
                }),
                React.createElement(Name, {
                    pokemonName: "steelix",
                    pokemonId: "208",
                    pokemonType: "steel"
                }),
                React.createElement(Sprite, {
                    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/208.png"
                }),
                React.createElement(TypeTag, {
                    pokemonType: "steel"
                }),
                React.createElement(Details, {
                    pokemonType: "steel"
                })
            );
        }
    }]);

    return Pokemon;
}(React.Component);

function Background(props) {
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
    return React.createElement(
        "button",
        { className: "btn arrow pokemon " + props.arrowType },
        React.createElement("img", { src: "./imgs/arrow-dark.svg" })
    );
}

function Name(props) {
    // Format pokemon id
    var id_formated = props.pokemonId;
    if (id_formated.length == 1) {
        id_formated = "#00" + id_formated;
    } else if (id_formated.length == 2) {
        id_formated = "#0" + id_formated;
    } else if (id_formated.length == 3) {
        id_formated = "#" + id_formated;
    }

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
            this.setState({
                activeButton: newButton
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            // Select correct info
            var info = void 0;
            if (this.state.activeButton == "About") {
                info = React.createElement(InfoAbout, {
                    description: "When several of\\nthese POK\xE9MON\\ngather, their\\u000celectricity could\\nbuild and cause\\nlightning storms.",
                    height: "7",
                    weight: "69",
                    base_experience: "64",
                    base_happiness: "50",
                    capture_rate: "45"

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
                Math.round(props.weight / 10 * 100) / 100,
                " kg"
            ),
            React.createElement(
                "p",
                null,
                Math.round(props.weight / 10 * 2.20462 * 100) / 100,
                " lbs"
            ),
            React.createElement(
                "p",
                { className: "header 2-columns" },
                "Base experience"
            ),
            React.createElement(
                "p",
                null,
                props.base_experience
            ),
            React.createElement(
                "p",
                { className: "header 2-columns" },
                "Base happiness"
            ),
            React.createElement(
                "p",
                null,
                props.base_happiness
            ),
            React.createElement(
                "p",
                { className: "header 2-columns" },
                "Capture rate"
            ),
            React.createElement(
                "p",
                null,
                props.capture_rate
            )
        )
    );
}