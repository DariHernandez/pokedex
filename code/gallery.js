var splide = new Splide( '.splide', {
    type: 'loop'
} );

splide.mount();

window.onresize = function () {
    if (window.matchMedia ("(min-width: 600px)").matches) {
        splide.options = {
            padding: '5rem'        
        }
    } else {
        splide.options = {
            padding: '0rem'        
        }
    }
}
