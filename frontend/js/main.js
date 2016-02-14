import App from './views/app';
import People from './views/people';
import attachFastClick from 'fastclick';

class PopAlerts {

    constructor() {
        let path = window.location.pathname.replace('/', ''),
            notPeople = ['privacy', 'terms', 'logout'];


        new App();

        // Do not instantiate People if route does not contain people.
        if (notPeople.indexOf(path) === -1) {
            new People();
        }

        // Will not attach on non touch devices.
        // Removes 300ms touch delay.
        attachFastClick(document.body);
    }

}

new PopAlerts();
