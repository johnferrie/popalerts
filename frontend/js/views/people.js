import $ from 'jquery';
import PeopleController from '../controllers/PeopleController';

class People {

    constructor() {
        this.$people = $('.people');
        this.controller = new PeopleController();

        this.setEvents();
        this.controller.setInfiniteScroll();
    }

    setEvents() {
        this.$people.on('click', '.person-edit', this.controller.editPerson.bind(this));
        this.$people.on('click', '.person-save', this.controller.savePerson.bind(this));
        this.$people.on('click', '.person-delete', this.controller.deletePerson.bind(this));
    }

}

module.exports = People;
