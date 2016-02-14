import $ from 'jquery';

class PeopleController {

    constructor() {
        this.$pagination = $('.pagination');
        this.nextDataUrl = this.$pagination.find('.pagination-next').attr('href');
        this.prevDataUrl = this.$pagination.find('.pagination-prev').attr('href');
        this.nextDataCache = undefined;
        this.prevDataCache = undefined;
        this.lastScroll = 0;
        this.isLoading = 0;
    }

    editPerson(event) {
        let $el = $(event.target).parents('.person');

        $el.addClass('is-editable')
            .find('.person-name')
            .attr('contenteditable', true)
            .focus()
            .end()
            .find('a').toggleClass('is-hidden');

        event.preventDefault();
    }

    savePerson(event) {
        let $el = $(event.target).parents('.person'),
            fullName = $.trim($el.find('.person-name').text()).split(' '),
            firstName = fullName.shift(),
            lastName = fullName.join(' ');

        $el.removeClass('is-editable')
            .find('.person-name')
            .removeAttr('contenteditable')
            .end()
            .find('a').toggleClass('is-hidden');

        $.ajax({
            url: '/person/' + $el.data('id'),
            method: 'PUT',
            data: {
                first_name: firstName,
                last_name: lastName,
                updated_at: new Date()
            }
        })
        .done(function() {
            let className = 'is-saved';
            $el.addClass(className);
            setTimeout(() => { $el.removeClass(className) }, 2000);
        })
        .fail(function(){
            console.log('fail on update');
        });

        event.preventDefault();
    }

    deletePerson(event) {
        let $el = $(event.target).parents('.person');

        $.ajax({
            url: '/person/' + $el.data('id'),
            method: 'DELETE'
        })
        .done(function() {
            $el.remove();
        })
        .fail(function(){
            console.log('fail on delete');
        });

        event.preventDefault();
    }

    setInfiniteScroll() {
        this.loadPrevious();

        $(window).scroll(() => {
            // handle scroll events to update content
            let scrollPos = $(window).scrollTop();

            if (scrollPos >= 0.9 * ($(document).height() - $(window).height())) {
                if (this.isLoading === 0) {
                    this.loadFollowing();
                }
            }

            if (scrollPos <= 0.9 * $('.people').offset().top) {
                if (this.isLoading === 0) {
                    this.loadPrevious();
                }
            }

            // Adjust the URL based on the top item shown
            // for reasonable amounts of items
            if (Math.abs(scrollPos - this.lastScroll) > $(window).height() * 0.1) {
                let self = this;
                this.lastScroll = scrollPos;
                $('.page').each(function(index) {
                    if (self.mostlyVisible(this)) {
                        history.replaceState(null, null, $(this).attr('data-url'));
                    }
                });
            }
        });
    }

    mostlyVisible(element) {
        // if ca 25% of element is visible
        let scrollPos = $(window).scrollTop();
        let windowHeight = $(window).height();
        let elTop = $(element).offset().top;
        let elHeight = $(element).height();
        let elBottom = elTop + elHeight;
        return ((elBottom - elHeight*0.25 > scrollPos) && (elTop < (scrollPos+0.5*windowHeight)));
    }

    loadPrevious() {
        if (this.prevDataUrl) {
            this.isLoading = 1;

            let showPrevious = (data) => {
                let page = $(data).find('.page')[0].outerHTML,
                    itemHeight = $('.page:first').height();

                $('.page:first').before(page);

                // adjust scroll
                window.scrollTo(0, $(window).scrollTop() + itemHeight);

                this.prevDataUrl = $(page).find('.pagination').find('.pagination-prev').attr('href');
                this.prevDataCache = false;

                // start loading the previous page.
                $.get(this.prevDataUrl,(previewData) => {
                    this.prevDataCache = previewData;
                });
            };

            if (this.prevDataCache) {
                showPrevious(this.prevDataCache);
                this.isLoading = 0;
            } else {
                $.get(this.prevDataUrl, (data) => {
                    showPrevious(data);
                    this.isLoading = 0;
                });
            }
        }
    }

    loadFollowing() {
        if (this.nextDataUrl) {
            this.isLoading = 1;

            let showFollowing = (data) => {
                let page = $(data).find('.page')[0].outerHTML;

                $('.page:last').after(page);

                this.nextDataUrl = $(page).find('.pagination').find('.pagination-next').attr('href');
                this.nextDataCache = false;

                // start loading the next page.
                $.get(this.nextDataUrl, (previewData) => {
                    this.nextDataCache = previewData;
                });
            };

            if (this.nextDataCache) {
                showFollowing(this.nextDataCache);
                this.isLoading = 0;
            } else {
                $.get(this.nextDataUrl, (data) => {
                    showFollowing(data);
                    this.isLoading = 0;
                });
            }
        }
    }

}

module.exports = PeopleController;
