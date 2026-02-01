export default function convertDatetimeText(date:Date):string{
    if (date instanceof Date) {
        return date.toLocaleString('sv-SE');
    } else {
        return new Date(date).toLocaleString('sv-SE');
    }
}