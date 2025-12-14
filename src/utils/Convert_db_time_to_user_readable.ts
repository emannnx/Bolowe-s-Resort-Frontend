export function convertDbTimeToReadable (db_time:string) {
    let newDate = new Date(db_time);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let dateInString = `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
    let timeString = newDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let timeInString = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()} ${timeString.slice(-2)}`
    return [dateInString,timeInString];
}