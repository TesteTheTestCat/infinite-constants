export function valuecost(valnum,buys){
    return new Decimal(10).pow(new Decimal(2).pow(valnum)).pow(buys.plus(1))
}
export function levelupupgradecost(buys){
    return new Decimal(10).pow(new Decimal(14).times(new Decimal(1.6).pow(buys)))
}
export function valueupupgradecost(i){
    return new Decimal(10).pow(new Decimal(2).pow(i))
}
export function levelpowerupgradecost(i){
    return new Decimal(10).pow(new Decimal(22).times(new Decimal(1.65).pow(i)))
}
export function catspacesoftcat(c){
  if (c.lt(1e100)){
    return 1 //-root
  }
  return c.log10().minus(100).pow(2) //-root
}
export function constructvalues(len){
    let list = []
    for(let j = 0; j < len; j++){
        list.push(new Decimal(0))
    }
    return list
}