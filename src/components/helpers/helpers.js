export const currencyFormat = (number) => {
    return new Intl.NumberFormat('en-US').format(number)
}

export const Capitalize = string => {
    string = string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
    return string;
};