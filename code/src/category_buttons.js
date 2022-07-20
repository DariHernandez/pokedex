export function CategoryButtons (props) {
  return (
    <section className="category-buttons">
      <div className="separator">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className="buttons regular-width">
        <FilterButton value="types" pokecolor="grass" onClick={() => props.handleCategory("types")}/>
        <FilterButton value="generations" pokecolor="fire" onClick={() => props.handleCategory("generations")}/>
        <FilterButton value="egg group" pokecolor="water" onClick={() => console.log ("click")}/>
        <FilterButton value="color" pokecolor="ghost" onClick={() => console.log ("click")}/>
        <FilterButton value="habitat" pokecolor="ground" onClick={() => console.log ("click")}/>
      </div>
    </section>
  )
}

function FilterButton (props) {
  return (
    <button 
      className="btn round animate text-shadow" 
      pokecolor={props.pokecolor} 
      onClick={props.onClick}>
      {props.value}
      <img 
        src={"./imgs/" + props.value.replaceAll (" ", "-") + "-btn.svg"}
        className="regular"
        />
    </button>
  )
}