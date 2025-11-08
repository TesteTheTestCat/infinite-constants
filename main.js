import {format} from "./formatting.js";
let player = {
    version: "alpha0.03",
    m_number: new Decimal(10),
    m_values: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(1)],
    m_valuebuys: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}
const gel = (name) => document.getElementById(name)
const tickspersecond = 20
function makevalues(list){
   let kije = ""
   for(let i = 0; i < list.length; i++){
     kije += `
        <tr>
          <td>Value ${i}</td>
          <td>Level 0/10 (*1)</td>
          <td>${format(list[i],4)}</td>
          <td><button>${format(new Decimal(10).pow(i+1))}</button></td>
        </tr><br>`
   }
   return kije
}
setInterval(() => {
    for(let i = 0; i < player.m_values.length-1; i++){
       player.m_values[i] = player.m_values[i].add(player.m_values[i+1].divide(tickspersecond).times(new Decimal(2).pow(player.m_valuebuys[i+1])))
    }
    player.m_number = player.m_number.add(player.m_values[0].divide(tickspersecond).times(new Decimal(2).pow(player.m_valuebuys[0])))
    gel("m_number").textContent = format(player.m_number,6)
    gel("m_values").innerHTML = makevalues(player.m_values)
}, 1000/tickspersecond);