export default function convertDateText(date:Date):string{
    if (date instanceof Date) {
        return date.toLocaleDateString('sv-SE');
    } else {
        return new Date(date).toLocaleDateString('sv-SE');
    }
}