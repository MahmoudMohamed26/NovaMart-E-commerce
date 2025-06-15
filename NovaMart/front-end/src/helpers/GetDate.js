export default function GetDate(date) {
    const selectedDate = new Date(date); // Corrected this line
    const getYear = selectedDate.getFullYear();
    const getMonth = selectedDate.getMonth() + 1; // getMonth() returns 0-indexed months (0 = January)
    const getDay = selectedDate.getDate(); // getDate() gets the day of the month
    return `${getMonth}-${getDay}-${getYear}`;
}