import $ from 'jquery';
import Utils from '../utils'

class AppController {

    constructor() {

    }

    setTheme(event) {
        let cookieName = 'theme',
            className = 'inverted';

        $('body').toggleClass(className);

        if(Utils.getCookie(cookieName)) {
            Utils.removeCookie(cookieName);
        } else {
            Utils.setCookie(cookieName, className);
        }

        event.preventDefault();
    }

    toggleMenu(event) {
        let $el = $(event.target);

        $el.next().toggleClass('is-open');
    }

}

module.exports = AppController;
