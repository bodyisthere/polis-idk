export function convertTime(date) {
    const d = new Date(date);
    return[d.getHours(), d.getMinutes(), d.getSeconds()]
}

export function convertDate(date) {
    const result = new Date(date);
    return [result.getDate(), result.getMonth(), result.getFullYear()];
}