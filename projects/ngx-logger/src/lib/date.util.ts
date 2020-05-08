export function formatDate(date: Date, format: Intl.DateTimeFormat): string {
    const [{value: month}, , {value: day}, , {value: year}] = format.formatToParts(date);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milis = date.getMilliseconds();
    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}.${milis}`;
}
