import $ from 'jquery';
import AppController from '../controllers/AppController';

class App {

    constructor() {
        this.controller = new AppController();

        this.jsEnabled();
        this.setEvents();
    }

    jsEnabled() {
        let isTouchDevice = 'ontouchstart' in document.documentElement,
            touchClass = isTouchDevice ? 'touch' : 'no-touch';

        $('html').addClass(`js ${touchClass}`);
    }

    setEvents() {
        $('#toggle-theme').on('click', this.controller.setTheme.bind(this));
        $('#toggle').on('touchstart', this.controller.toggleMenu.bind(this));
    }

}

module.exports = App;
