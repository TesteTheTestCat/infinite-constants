export function valuecost(valnum,buys){
    return new Decimal(10).pow(new Decimal(2).pow(valnum)).pow(buys.plus(1))
}