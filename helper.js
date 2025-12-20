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
export function catspacesoftcat(c,meow=0){
  let cat = c.divide(new Decimal(1e10).pow(meow))
  if (cat.lt(1e100)){
    return new Decimal(1) //-root
  }
  return cat.log10().minus(100).pow(2).plus(1) //-root
}
export function catspacemulti(c){
    let a = c.log10().divide(100)
    if (c.lt(1)){a = new Decimal(0)}
    return a.plus(1)
}
export function catupcost(i){
    return new Decimal(10).pow(new Decimal(40).times(new Decimal(1.08).pow(i)))
}
export function meowupcost(i){
  let a = new Decimal(i).pow(2) // x^2
  let b = new Decimal(i).times(19) // 19x
  let c = a.plus(b).divide(2) // (x²+19x)/2
  return new Decimal(10).pow(c.plus(90)) // 10^(((x²+19x)/2)+90)
}
export function constructvalues(len){
    let list = []
    for(let j = 0; j < len; j++){
        list.push(new Decimal(0))
    }
    return list
}