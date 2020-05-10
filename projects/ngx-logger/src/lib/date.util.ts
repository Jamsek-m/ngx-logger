export function formatDate(date: Date, format: Intl.DateTimeFormat): string {
    let [{value: month}, , {value: day}, , {value: year}] = format.formatToParts(date);
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    year = year.padStart(4, "0");
    const hour = date.getHours().toString(10).padStart(2, "0");
    const minutes = date.getMinutes().toString(10).padStart(2, "0");
    const seconds = date.getSeconds().toString(10).padStart(2, "0");
    const milis = date.getMilliseconds().toString(10).padStart(3, "0");
    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}.${milis}`;
}
