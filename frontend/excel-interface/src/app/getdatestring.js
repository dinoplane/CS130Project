// https://www.geeksforgeeks.org/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript/#
export default function getDateTodayString() {
    let today = new Date()

    let dd = today.getDate()
    let mm = today.getMonth() + 1

    let yyyy = today.getFullYear()

    dd = (dd < 10 ? '0' : '') + dd
    mm = (mm < 10 ? '0' : '') + mm

    today = mm + '/' + dd + '/' + yyyy

    return today
}
