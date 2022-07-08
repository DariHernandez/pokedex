export function SearchBar(props) {
  if (props.current_screen == "home") {
    return React.createElement(SearchBarHome, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      search_value: props.search_value,
      sectionTitle: props.current_screen,
      handleClickGoBack: props.handleClickGoBack
    });
  } else {
    return React.createElement(SearchBarType, {
      handleChangeSearch: props.handleChangeSearch,
      handleClickSearch: props.handleClickSearch,
      search_value: props.search_value,
      sectionTitle: props.current_screen,
      handleClickGoBack: props.handleClickGoBack
    });
  }
}

function SearchBarHome(props) {

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
        React.createElement(SearchBarInput, {
          onChange: props.handleChangeSearch,
          value: props.search_value
        }),
        React.createElement(SearchBarButton, {
          onClick: props.handleClickSearch,
          disabled: props.search_value.length > 0 ? false : true
        })
      )
    )
  );
}

function SearchBarType(props) {
  // Search bar html
  return React.createElement(
    "section",
    { className: "search-bar" },
    React.createElement(
      "div",
      { className: "content regular-width" },
      React.createElement(SearchBarGoBack, {
        sectionTitle: props.sectionTitle,
        onClick: props.handleClickGoBack
      }),
      React.createElement(
        "label",
        null,
        React.createElement("img", { src: "./imgs/search.svg", alt: "Serach icon" }),
        React.createElement(SearchBarInput, {
          onChange: props.handleChangeSearch,
          value: props.value
        })
      )
    )
  );
}

function SearchBarInput(props) {
  return React.createElement("input", {
    type: "search",
    placeholder: "Search pokemon",
    onChange: props.onChange,
    value: props.value
  });
}

function SearchBarButton(props) {
  return React.createElement("input", {
    type: "button",
    value: "search",
    onClick: props.onClick,
    disabled: props.disabled,
    className: "btn round"
  });
}

function SearchBarGoBack(props) {
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