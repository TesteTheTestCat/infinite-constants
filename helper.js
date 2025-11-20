export function valuecost(valnum,buys){
    return new Decimal(10).pow(new Decimal(2).pow(valnum)).pow(buys.plus(1))
}
export function levelupupgradecost(buys){
    return new Decimal(10).pow(new Decimal(14).times(new Decimal(1.6).pow(buys)))
}