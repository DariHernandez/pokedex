export function TopBar(props) {
  if (props.currentScreen == "home") {
    // Home search bar
    return React.createElement(TopBarHome, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      sectionTitle: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    });
  } else if (["types", "generations", "egg groups", "colors", "habitats", "pokemon"].includes(props.currentScreen)) {
    // Only TopBar for filter pages
    return React.createElement(
      "section",
      { className: "top-bar" },
      React.createElement(
        "div",
        { className: "content regular-width" },
        React.createElement(TopBarGoBack, {
          onClick: props.handleClickGoBack,
          sectionTitle: props.currentScreen
        })
      )
    );
  } else {
    // Search bar for results page 
    return React.createElement(TopBarFilter, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      searchValue: props.searchValue,
      sectionTitle: props.currentScreen,
      handleClickGoBack: props.handleClickGoBack
    });
  }
}

function TopBarHome(props) {

  // Search bar html
  return React.createElement(
    "section",
    { className: "top-bar" },
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
        React.createElement(TopBarInputSearch, {
          onChange: props.handleChangeSearch,
          value: props.searchValue
        }),
        React.createElement(TopBarButtonSearch, {
          onClick: props.handleClickSearch,
          disabled: props.searchValue.length > 0 ? false : true
        })
      )
    )
  );
}

function TopBarFilter(props) {
  // Search
  return React.createElement(
    "section",
    { className: "top-bar" },
    React.createElement(
      "div",
      { className: "content regular-width" },
      React.createElement(TopBarGoBack, {
        sectionTitle: props.sectionTitle,
        onClick: props.handleClickGoBack
      }),
      React.createElement(
        "label",
        null,
        React.createElement("img", { src: "./imgs/search.svg", alt: "Serach icon" }),
        React.createElement(TopBarInputSearch, {
          onChange: props.handleChangeSearch,
          value: props.searchValue
        })
      )
    )
  );
}

function TopBarInputSearch(props) {
  return React.createElement("input", {
    type: "search",
    placeholder: "Search pokemon",
    onChange: props.onChange,
    value: props.value
  });
}

function TopBarButtonSearch(props) {
  return React.createElement("input", {
    type: "button",
    value: "search",
    onClick: props.onClick,
    disabled: props.disabled,
    className: "btn round"
  });
}

function TopBarGoBack(props) {

  // Format title parts
  var titleParts = props.sectionTitle.replace("-", " ").split(" ");
  var titleSpans = [];
  titleSpans.push(React.createElement(
    "span",
    { key: "first" },
    titleParts[0]
  ));
  if (titleParts.length > 1) {
    titleSpans.push(React.createElement(
      "span",
      { key: "second" },
      titleParts[titleParts.length - 1]
    ));
  } else {
    titleSpans.push(React.createElement(
      "span",
      { key: "second" },
      titleParts[1]
    ));
  }

  // Class for titles in upper case
  var upperClass = props.sectionTitle.includes("generation") ? "upper" : "title";

  return React.createElement(
    "div",
    { className: "return", onClick: props.onClick },
    React.createElement("img", { src: "./imgs/arrow.svg", alt: "go back icon", className: "return-icon" }),
    React.createElement(
      "h2",
      { className: "section-title " + upperClass },
      titleSpans
    )
  );
}