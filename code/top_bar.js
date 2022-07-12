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
  } else if (["types"].includes(props.currentScreen)) {
    // Only TopBar for filter pages
    return React.createElement(
      "section",
      { className: "search-bar" },
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
    return React.createElement(TopBarType, {
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
    { className: "search-bar" },
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

function TopBarType(props) {
  // Search
  return React.createElement(
    "section",
    { className: "search-bar" },
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
  return React.createElement(
    "div",
    { className: "return", onClick: props.onClick },
    React.createElement("img", { src: "./imgs/arrow.svg", alt: "go back icon", className: "return-icon" }),
    React.createElement(
      "h2",
      { className: "section-title" },
      props.sectionTitle
    )
  );
}