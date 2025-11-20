import {format, formatWhole} from "./formatting.js";
import {valuecost} from "./helper.js"
let player = {
    version: "alpha0.03",
    lasttick: Date.now(),
    m_number: new Decimal(10),
    m_values: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    m_valuebuys: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}
gel("overlay").style.display = "none"
gel("loading").style.display = "none"
let lastvaluelength = 0
const maxticks = 10000 //the maximum amount of ticks before ticksize increases
const gel = (name) => document.getElementById(name)
const tickspersecond = 20
function makevalues(list,meow){
   let kije = ""
   for(let i = 0; i < list.length; i++){
     kije += `
        <tr style="width: 100%">
          <td style="width: 15%">Value ${i+1}</td>
          <td style="width: 35%">Level <span id="m_valuelevel${i}"></span></td>
          <td style="width: 30%"><span id="m_valueamount${i}"></span></td>
          <td style="width: 20%"><button id="m_buybutton${i}" onclick="console.log('meow')">${format(new Decimal(10).pow(i+1))}</button></td>
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
        j.onclick = () => {buyvalue(i)}
      }
   }
   for (let i = 0; i < lastvaluelength; i++){
      gel(`m_valueamount${i}`).textContent = format(player.m_values[i])
      gel(`m_valuelevel${i}`).textContent = `${formatWhole(player.m_valuebuys[i])}/10 (*${formatWhole(new Decimal(2).pow(player.m_valuebuys[i]))})`
      gel(`m_buybutton${i}`).textContent = format(valuecost(i,player.m_valuebuys[i]))
   }
}
function buyvalue(i){
  if(player.m_number.gte(valuecost(i,player.m_valuebuys[i])) && player.m_valuebuys[i].lt(10)){
   player.m_number = player.m_number.minus(valuecost(i,player.m_valuebuys[i]))
   player.m_values[i] = player.m_values[i].plus(1)
   player.m_valuebuys[i] = player.m_valuebuys[i].plus(1)
  }
}
let deltatime = 0
setInterval(() => {
   deltatime += (Date.now() - player.lasttick)/1000 //this is needed. trust me.
   let ticksize = 1/tickspersecond
   if (deltatime/tickspersecond >= maxticks) {ticksize = deltatime/maxticks}
   if (deltatime/ticksize > 500){gel("loading").style.display = "inline"}
   while (deltatime >= ticksize){
    for(let i = 0; i < player.m_values.length-1; i++){
       player.m_values[i] = player.m_values[i].add(player.m_values[i+1].times(ticksize).times(new Decimal(2).pow(player.m_valuebuys[i+1])))
    }
    player.m_number = player.m_number.add(player.m_values[0].times(ticksize).times(new Decimal(2).pow(player.m_valuebuys[0])))
    deltatime -= ticksize
   }
   gel("loading").style.display = "none"
    gel("m_number").textContent = format(player.m_number,8)
    gel("m_numberps").textContent = format(player.m_values[0].times(new Decimal(2).pow(player.m_valuebuys[0])),6)+"/s"
    setupvalues()
   player.lasttick = Date.now()
}, 1000/tickspersecond);