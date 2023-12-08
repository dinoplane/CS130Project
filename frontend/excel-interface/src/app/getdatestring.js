/**
 * @module getDateTodayString
 */
// https://www.geeksforgeeks.org/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript/#

/**
 * Returns a string representing today's date in MM/DD/YYYY format.
 * @returns {String} a string of today's date(MM/DD/YYYY)
 */
export default function getDateTodayString() {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    dd = (dd < 10 ? '0' : '') + dd;
    mm = (mm < 10 ? '0' : '') + mm;

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}
