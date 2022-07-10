export function SearchBar (props) {
    if (props.currentScreen == "home") {
        return (
            <SearchBarHome 
                handleChangeSearch={props.handleChangeSearch}
                handleClickSearch={props.handleClickSearch}
                searchValue={props.searchValue}
                sectionTitle = {props.currentScreen}
                handleClickGoBack={props.handleClickGoBack}
            />
        )
    } else {
        return (
            <SearchBarType 
                handleChangeSearch={props.handleChangeSearch}
                handleClickSearch={props.handleClickSearch}
                searchValue={props.searchValue}
                sectionTitle = {props.currentScreen}
                handleClickGoBack={props.handleClickGoBack}
            />
        )
    }
} 

function SearchBarHome (props) {

    // Search bar html
    return (
      <section className="search-bar">
        <div className="bg-img-wrapper">
          <img src="./imgs/pokeball.svg" alt="pokeball background image" className="bg-img"></img>
        </div>
  
        <div className="content regular-width">
          <h1 className="title">Find your <br/> favorite pokemon</h1>
          <label>
            <img src="./imgs/search.svg" alt="Serach icon"></img>
            <SearchBarInput 
              onChange={props.handleChangeSearch}
              value={props.searchValue}
            />
            <SearchBarButton
              onClick={props.handleClickSearch}
              disabled={props.searchValue.length > 0 ? false : true}
            />
            
          </label>
        </div>
      </section> 
    )
  }
  
function SearchBarType (props) {
    // Search bar html
    return (
      <section className="search-bar">
        <div className="content regular-width">
          <SearchBarGoBack
            sectionTitle = {props.sectionTitle}
            onClick={props.handleClickGoBack}
          />
          <label>
            <img src="./imgs/search.svg" alt="Serach icon"></img>
            <SearchBarInput 
              onChange={props.handleChangeSearch}
              value={props.searchValue}
            />            
          </label>
        </div>
      </section> 
    )
  }
  
  function SearchBarInput (props) {
    return (
      <input
        type="search"
        placeholder="Search pokemon"
        onChange={props.onChange}
        value={props.value}
      ></input>
    )
  }
  
  function SearchBarButton (props) {
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
  
  function SearchBarGoBack (props) {
    return (
      <div className="return" onClick={props.onClick}>
        <img src="./imgs/arrow.svg" alt="go back icon" className="return-icon"/>
        <h2 className="section-title">{props.sectionTitle}</h2>
      </div>
    )
  }