export function SearchButtons(props) {
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
      React.createElement(SearchButton, { value: "types", pokecolor: "grass" }),
      React.createElement(SearchButton, { value: "location", pokecolor: "fire" }),
      React.createElement(SearchButton, { value: "moves and habilities", pokecolor: "water" })
    )
  );
}

function SearchButton(props) {
  return React.createElement(
    "button",
    { className: "btn round animate", pokecolor: props.pokecolor },
    props.value,
    React.createElement("img", {
      src: "./imgs/" + props.value.replaceAll(" ", "-") + "-btn.svg",
      className: "regular"
    })
  );
}