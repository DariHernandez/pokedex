export function TypeButtons(props) {

    var pokemonTypes = props.pokemonTypes;
    var buttons = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = pokemonTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pokemonType = _step.value;

            buttons.push(React.createElement(TypeButton, {
                pokemonType: pokemonType,
                handleUpdateFilter: props.handleUpdateFilter,
                key: pokemonType
            }));
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

    return React.createElement(
        "section",
        { className: "types-buttons regular-width" },
        buttons
    );
}

function TypeButton(props) {
    return React.createElement(
        "button",
        {
            className: "pokemon-type btn round text-shadow",
            onClick: function onClick(pokemonType) {
                return props.onClick(pokemonType);
            },
            pokecolor: props.pokemonType
        },
        props.pokemonType,
        React.createElement(
            "div",
            { className: "wrapper-img" },
            React.createElement("img", {
                src: "./imgs/types-assets/" + props.pokemonType + ".png"
            })
        )
    );
}