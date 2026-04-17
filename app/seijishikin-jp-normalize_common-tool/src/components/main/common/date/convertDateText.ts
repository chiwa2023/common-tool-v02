export default function convertDateText(date: Date | null): string {
    if (null === date || undefined === date) {
        return "";
    }
    if (date instanceof Date) {
        return date.toLocaleDateString('sv-SE');
    } else {
        return new Date(date).toLocaleDateString('sv-SE');
    }
}