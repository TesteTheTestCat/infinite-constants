export function valuecost(valnum,buys){
    return new Decimal(10).pow(new Decimal(2).pow(valnum)).pow(buys.plus(1))
}
export function levelupupgradecost(buys){
    return new Decimal(10).pow(new Decimal(14).times(new Decimal(1.6).pow(buys)))
}
export function valueupupgradecost(i){
    return new Decimal(10).pow(new Decimal(2).pow(i))
}
export function makevalues(len){
    let list = []
    for(let j = 0; j < len; j++){
        list.push(new Decimal(0))
    }
    return list
}