export function convertToHumanReadableString(ms) {
    const delimiter = ' : ';
    const showWith0 = value => (value < 10 ? `0${value}` : value);
    const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
    const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = showWith0(Math.floor((ms / 1000) % 60));

    return `${hours}${delimiter}${minutes}${delimiter}${seconds}`;
}
