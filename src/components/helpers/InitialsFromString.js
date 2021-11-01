const InitialsFromString = (...val) =>{
    let valArr = val.filter(i => i).filter(String).filter(Boolean).join(' ').split(' ');
    let firstStrCapitalized = valArr[0].toUpperCase().charAt(0);
    let secondStrCapitalized = "";
    if(valArr.length > 1){
        secondStrCapitalized = valArr[1].toUpperCase().charAt(0);
    }
    return `${firstStrCapitalized}${secondStrCapitalized}`;
}
export default InitialsFromString;