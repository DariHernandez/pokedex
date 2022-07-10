var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Paginator = function (_React$Component) {
    _inherits(Paginator, _React$Component);

    function Paginator(props) {
        _classCallCheck(this, Paginator);

        return _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));
    }

    _createClass(Paginator, [{
        key: "render",
        value: function render() {
            var buttons = [];
            var currentPage = this.props.currentPage;
            var totalPages = this.props.totalPages;
            var pokemonsNum = this.props.pokemonsNum;

            // Hide pagination with no pokemons or no more pages
            if (pokemonsNum == 0 || totalPages == 1) {
                return React.createElement("ul", { className: "paginator" });
            }

            // Add back button
            if (currentPage > 1) {
                buttons.push(React.createElement(
                    "li",
                    { onClick: this.props.clickBackPage, key: "back" },
                    React.createElement("img", { src: "./imgs/arrow-dark.svg" })
                ));
            }

            // Current page
            buttons.push(React.createElement(
                "li",
                { key: "current" },
                "Page ",
                currentPage
            ));

            // Add next button
            if (currentPage < totalPages) {
                buttons.push(React.createElement(
                    "li",
                    { onClick: this.props.clickNextPage, key: "next" },
                    React.createElement("img", { src: "./imgs/arrow-dark.svg" })
                ));
            }

            return React.createElement(
                "ul",
                { className: "paginator" },
                buttons
            );
        }
    }]);

    return Paginator;
}(React.Component);