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

    function Details() {
        _classCallCheck(this, Details);

        return _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).apply(this, arguments));
    }

    _createClass(Details, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "section",
                { className: "details" },
                React.createElement(
                    "div",
                    { className: "buttons" },
                    React.createElement(DetailsButton, {
                        buttonType: "left",
                        text: "About",
                        pokemonType: this.props.pokemonType,
                        activeButton: "About"
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "center",
                        text: "Stats",
                        pokemonType: this.props.pokemonType,
                        activeButton: "About"
                    }),
                    React.createElement(DetailsButton, {
                        buttonType: "right",
                        text: "Moves",
                        pokemonType: this.props.pokemonType,
                        activeButton: "About"
                    })
                )
            );
        }
    }]);

    return Details;
}(React.Component);

function DetailsButton(props) {
    var className = void 0;
    if (props.activeButton == props.text) {
        className = "btn pokemon-details no-box-shadow text-shadow " + props.buttonType + " active";
    } else {
        className = "btn pokemon-details no-box-shadow text-shadow " + props.buttonType;
    }

    return React.createElement(
        "button",
        {
            className: className,
            pokecolor: props.pokemonType
        },
        React.createElement(
            "span",
            null,
            props.text
        )
    );
}