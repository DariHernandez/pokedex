import { pokemonTypes, pokemonGenerations, pokemonEggs } from "./pokeapi.js";

export function FilterButtons(props) {

    // Select data for show different filter buttons
    var currentScreen = props.currentScreen;
    var buttonsData = void 0;
    var useImage = false;
    if (currentScreen == "types") {
        buttonsData = pokemonTypes;
        useImage = true;
    } else if (currentScreen == "generations") {
        buttonsData = pokemonGenerations;
    } else if (currentScreen == "egg group") {
        buttonsData = pokemonEggs;
    }

    // Generate buttons
    var buttons = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = buttonsData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var buttonData = _step.value;


            // Set color for button
            var color = "default";
            if (currentScreen == "types" || currentScreen == "egg group") {
                color = buttonData;
            }

            buttons.push(React.createElement(FilterButton, {
                buttonData: buttonData,
                key: buttonData,
                onClick: props.handleFilter,
                currentScreen: props.currentScreen,
                color: color,
                useImage: useImage
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
        { className: currentScreen + " filter-buttons regular-width" },
        buttons
    );
}

function FilterButton(props) {

    return React.createElement(
        "button",
        {
            className: props.currentScreen + " button btn round text-shadow",
            onClick: function onClick() {
                return props.onClick(props.buttonData);
            },
            pokecolor: props.color
        },
        props.buttonData.replaceAll("-", " "),
        props.useImage && React.createElement(
            "div",
            { className: "wrapper-img" },
            React.createElement("img", {
                src: "./imgs/types-assets/" + props.buttonData + ".png",
                alt: "pokemon type image"
            })
        )
    );
}