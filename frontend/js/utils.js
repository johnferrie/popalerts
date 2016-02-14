let Utils = {

    getCookie(cookie) {
        return (document.cookie.indexOf(cookie) > -1);
    },

    setCookie(cookie, value) {
        let date = this.expiresDate(new Date(), 7);
        document.cookie = `${cookie}=${value}; expires=${date}; path=/`;
        return;
    },

    removeCookie(cookie) {
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        return;
    },

    expiresDate(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        return dateObj;
    }

};

module.exports = Utils;
