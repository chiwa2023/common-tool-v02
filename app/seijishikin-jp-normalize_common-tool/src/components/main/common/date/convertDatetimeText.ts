export default function convertDatetimeText(date:Date|null):string{
    if (null === date || undefined === date) {
        return "";
    }
    if (date instanceof Date) {
        return date.toLocaleString('sv-SE');
    } else {
        return new Date(date).toLocaleString('sv-SE');
    }
}