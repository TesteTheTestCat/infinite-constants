import {format, formatWhole} from "./formatting.js";
let player = {
    version: "alpha0.03",
    m_number: new Decimal(10),
    m_values: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    m_valuebuys: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}
let lastvaluelength = 0
const gel = (name) => document.getElementById(name)
const tickspersecond = 20
function makevalues(list,meow){
   let kije = ""
   for(let i = 0; i < list.length; i++){
     kije += `
        <tr style="width: 100%">
          <td>Value ${i+1}</td>
          <td>Level ${formatWhole(meow[i])}/10 (*${new Decimal(2).pow(meow[i])})</td>
          <td><span id="m_valueamount${i}"></span></td>
          <td><button id="m_buybutton${i}" onclick="console.log('meow')">${format(new Decimal(10).pow(i+1))}</button></td>
        </tr><br>`
     
   }
   return kije
}
function setupvalues(){
   if (lastvaluelength != player.m_values.length){
      gel("m_values").innerHTML = makevalues(player.m_values,player.m_valuebuys)
      lastvaluelength = player.m_values.length
      for (let i = 0; i < lastvaluelength; i++){
        let j = gel(`m_buybutton${i}`)
        j.onclick = () => {console.log('meow')}
   }
   }
   for (let i = 0; i < lastvaluelength; i++){
      gel(`m_valueamount${i}`).textContent = format(player.m_values[i])
   }
}
setInterval(() => {
    for(let i = 0; i < player.m_values.length-1; i++){
       player.m_values[i] = player.m_values[i].add(player.m_values[i+1].divide(tickspersecond).times(new Decimal(2).pow(player.m_valuebuys[i+1])))
    }
    player.m_number = player.m_number.add(player.m_values[0].divide(tickspersecond).times(new Decimal(2).pow(player.m_valuebuys[0])))
    gel("m_number").textContent = format(player.m_number,6)
    gel("m_values").innerHTML = makevalues(player.m_values,player.m_valuebuys)
    setupvalues()
}, 1000/tickspersecond);