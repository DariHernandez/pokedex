export class Paginator extends React.Component {

    constructor (props) {
        super (props)
    }

    render () {
        let buttons = []
        const currentPage = this.props.currentPage
        const totalPages = this.props.totalPages
        const pokemonsNum = this.props.pokemonsNum

        // Hide pagination with no pokemons or no more pages
        if (pokemonsNum == 0 || totalPages == 1) {
            return (
                <ul className="paginator">
                </ul>
            )
        }
    
        // Add back button
        if (currentPage > 1) {
            buttons.push (
                <li onClick={this.props.clickBackPage} key="back">
                    <img src="./imgs/arrow-dark.svg"/>
                </li>
            )
        }
    
        // Current page
        buttons.push (
            <li key="current">
                Page {currentPage}
            </li>
        )
    
        // Add next button
        if (currentPage < totalPages) {
            buttons.push (
                <li onClick={this.props.clickNextPage} key="next">
                    <img src="./imgs/arrow-dark.svg"/>
                </li>
            )
        }    
    
        return (
            <ul className="paginator">
                {buttons}
            </ul>
        )
    }

}