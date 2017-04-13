module.exports = {
    getFullMonth: (date) => {
        let month = date.getMonth() + 1;
        return month < 10 ? ('0' + month) : month;
    },
    getFullDate: (date) => {
        let d = date.getDate();
        return d < 10 ? ('0' + d) : d;
    },
    nextDate: (date) => {
        let oneDay = 3600 * 24 * 1000;
        return new Date(date.getTime() + oneDay);
    }
};