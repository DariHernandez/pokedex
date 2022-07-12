export function TopBar (props) {
  if (props.currentScreen == "home") {
    // Home search bar
    return (
        <TopBarHome 
            handleChangeSearch={props.handleChangeSearch}
            handleClickSearch={props.handleClickSearch}
            searchValue={props.searchValue}
            sectionTitle = {props.currentScreen}
            handleClickGoBack={props.handleClickGoBack}
        />
    )
  } else if (["types"].includes(props.currentScreen)) {
    // Only TopBar for filter pages
    return (
      <section className="top-bar">
        <div className="content regular-width">
          <TopBarGoBack
            onClick={props.handleClickGoBack}
            sectionTitle={props.currentScreen}
          />
        </div>
      </section>
    )
  } else {
    // Search bar for results page 
    return (
      <TopBarType 
          handleChangeSearch={props.handleChangeSearch}
          handleClickSearch={props.handleClickSearch}
          searchValue={props.searchValue}
          sectionTitle = {props.currentScreen}
          handleClickGoBack={props.handleClickGoBack}
      />
    )
  }
} 

function TopBarHome (props) {

    // Search bar html
    return (
      <section className="top-bar">
        <div className="bg-img-wrapper">
          <img src="./imgs/pokeball.svg" alt="pokeball background image" className="bg-img"></img>
        </div>
  
        <div className="content regular-width">
          <h1 className="title">Find your <br/> favorite pokemon</h1>
          <label>
            <img src="./imgs/search.svg" alt="Serach icon"></img>
            <TopBarInputSearch 
              onChange={props.handleChangeSearch}
              value={props.searchValue}
            />
            <TopBarButtonSearch
              onClick={props.handleClickSearch}
              disabled={props.searchValue.length > 0 ? false : true}
            />
            
          </label>
        </div>
      </section> 
    )
  }
  
function TopBarType (props) {
    // Search
    return (
      <section className="top-bar">
        <div className="content regular-width">
          <TopBarGoBack
            sectionTitle = {props.sectionTitle}
            onClick={props.handleClickGoBack}
          />
          <label>
            <img src="./imgs/search.svg" alt="Serach icon"></img>
            <TopBarInputSearch 
              onChange={props.handleChangeSearch}
              value={props.searchValue}
            />            
          </label>
        </div>
      </section> 
    )
  }
  
  function TopBarInputSearch (props) {
    return (
      <input
        type="search"
        placeholder="Search pokemon"
        onChange={props.onChange}
        value={props.value}
      ></input>
    )
  }
  
  function TopBarButtonSearch (props) {
    return (
      <input
        type="button"
        value="search"
        onClick={props.onClick}
        disabled={props.disabled}
        className="btn round"
      ></input>
    )
  }
  
  function TopBarGoBack (props) {
    return (
      <div className="return" onClick={props.onClick}>
        <img src="./imgs/arrow.svg" alt="go back icon" className="return-icon"/>
        <h2 className="section-title">{props.sectionTitle}</h2>
      </div>
    )
  }