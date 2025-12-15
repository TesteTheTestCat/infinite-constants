import {format, formatWhole} from "./formatting.js";
import {valuecost,levelupupgradecost, valueupupgradecost, constructvalues,levelpowerupgradecost,catspacesoftcat,catspacemulti} from "./helper.js"
import {kisaluline} from "./splashtext.js";
let player = {
    version: "beta0.4",
    lasttick: Date.now(),
    m_number: new Decimal(10),
    m_values: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    m_valuebuys: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    u_levelup: new Decimal(0),
    u_levelpowerup: new Decimal(0),
    u_unlockcatspace: new Decimal(0),
    c_catspace: new Decimal(1)
}
const hardreset = exportsave(player)
let lastvaluelength = 0
const maxticks = 10000 //the maximum amount of ticks before ticksize increases
const gel = (name) => document.getElementById(name)
const tickspersecond = 20
function exportsave(meow) {
   return btoa(JSON.stringify(meow)) //i'll keep it like this for now
}
function importsave(meow) {
   if (meow == null){console.log("what"); return}
   let playerdata = JSON.parse(atob(meow))
   for (const i in playerdata) {try{player[i] = new Decimal(playerdata[i])}catch{console.log("oops!")}};
   player.m_valuebuys = []
   for (let i = 0; i < playerdata.m_valuebuys.length; i++) {player.m_valuebuys.push(new Decimal(playerdata.m_valuebuys[i]))};
   player.m_values = []
   for (let i = 0; i < playerdata.m_values.length; i++) {player.m_values.push(new Decimal(playerdata.m_values[i]))};
   player.version = playerdata.version
   player.lasttick = playerdata.lasttick
}
function savesave() {localStorage.setItem("infinite-saves",exportsave(player))}
function loadload() {importsave(localStorage.getItem("infinite-saves"))}
function makevalues(list,otherlist){
   let kije = ""
   for(let i = 0; i < list.length; i++){
     kije += `
        <tr style="width: 100%">
          <td style="width: 15%">Value ${i+1}</td>
          <td style="width: 35%">Level <span id="m_valuelevel${i}"></span></td>
          <td style="width: 30%"><span id="m_valueamount${i}"></span></td>
          <td style="width: 20%"><button id="m_buybutton${i}" onclick="console.log('meow')">${format(new Decimal(10).pow(i+1))}</button></td>
        </tr>`
     
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
      gel(`m_valuelevel${i}`).textContent = `${formatWhole(player.m_valuebuys[i])}/${formatWhole(new Decimal(10).plus(player.u_levelup))} (*${formatWhole(new Decimal(2).plus(new Decimal(0.1).times(player.u_levelpowerup)).pow(player.m_valuebuys[i]))})`
      gel(`m_buybutton${i}`).textContent = format(valuecost(i,player.m_valuebuys[i]))
   }
   gel("u_levelupcost").textContent = format(levelupupgradecost(player.u_levelup))
   gel("u_valueupcost").textContent = `Level 2 Value ${formatWhole(player.m_values.length)}, ${format(valueupupgradecost(player.m_values.length))}`
   gel("u_levelpowerupcost").textContent = format(levelpowerupgradecost(player.u_levelpowerup))
   if (player.u_unlockcatspace.lt(1)){
      gel("u_unlockcatspace").style.display = "inline"
      gel("tabbutton2").style.display = "none"
   } else {
      gel("u_unlockcatspace").style.display = "none"
      gel("tabbutton2").style.display = "inline"
   }
   gel("c_catspace").textContent = format(player.c_catspace,3)
   gel("c_catspaceps").textContent = format(player.c_catspace.times(new Decimal(1.01).pow(new Decimal(1).divide(catspacesoftcat(player.c_catspace)))).minus(player.c_catspace),5)
   if (catspacesoftcat(player.c_catspace).gte(1)){
      gel("c_catsoftcat").textContent = `Your catspace is being ${format(catspacesoftcat(player.c_catspace),5)}-rooted!!`
   }
   gel("c_catmulti").textContent = `Your catspace is *${format(catspacemulti(player.c_catspace),5)}-ing your Values!`
}
function buyvalue(i){
  if(player.m_number.gte(valuecost(i,player.m_valuebuys[i])) && player.m_valuebuys[i].lt(new Decimal(10).plus(player.u_levelup))){
   player.m_number = player.m_number.minus(valuecost(i,player.m_valuebuys[i]))
   player.m_values[i] = player.m_values[i].plus(1)
   player.m_valuebuys[i] = player.m_valuebuys[i].plus(1)
  }
}
function settab(i){
   for(let j = -1; j < 3; j++){
      gel(`tab${j}`).style.display = "none"
   }
   gel(`tab${i}`).style.display = "inline"
}
function buylevelup(){
   if (player.m_number.gte(levelupupgradecost(player.u_levelup))){
      player.m_number = player.m_number.minus(levelupupgradecost(player.u_levelup))
      player.u_levelup = player.u_levelup.plus(1)
   }
}
function buyvalueup(){
   let originallength = player.m_values.length
  if (player.m_number.gte(valueupupgradecost(player.m_values.length)) && player.m_valuebuys[player.m_values.length-1].gte(2)){
    player.m_values = constructvalues(originallength+1)
    player.m_valuebuys = constructvalues(originallength+1)
    player.m_number = new Decimal(10)
  }
}
function buylevelpowerup(){
  if (player.m_number.gte(levelpowerupgradecost(player.u_levelpowerup))){
   player.m_number = player.m_number.minus(levelpowerupgradecost(player.u_levelpowerup))
   player.u_levelpowerup = player.u_levelpowerup.plus(1)
  }
}
function buyunlockcatspace(){
   if (player.m_number.gte(1e24) && player.u_unlockcatspace.lt(1)){
      player.u_unlockcatspace = new Decimal(1)
      player.m_number = player.m_number.minus(1e24)
   }
}
function setbuttons(){
   for(let j = -1; j < 3; j++){
      gel(`tabbutton${j}`).onclick = () => {settab(j)}
   }
   gel("u_levelup").onclick = () => {buylevelup()}
   gel("u_valueup").onclick = () => {buyvalueup()}
   gel("u_levelpowerup").onclick = () => {buylevelpowerup()}
   gel("u_unlockcatspace").onclick = () => {buyunlockcatspace()}
   gel("u_kisalu").onclick = () => {gel("u_kisalutext").innerHTML = kisaluline()}
   gel("o_save").onclick = () => {savesave()}
   gel("o_hardreset").onclick = () => {importsave(hardreset); savesave()}
}
function updatesplashtexts(){
   gel("u_kisalutext").innerHTML = kisaluline() //lets me do cool things
}
loadload()
settab(0)
setbuttons()
let deltatime = 0
let deltasplashtext = 0 //reset to 0 at 600
let deltasave = 0 //save every 3 minutes or so
gel("loading").style.display = "none"
updatesplashtexts()
setInterval(() => {
   let dt = (Date.now() - player.lasttick)/1000
   deltatime += dt //this is needed. trust me.
   deltasplashtext += dt
   deltasave += dt
   if (deltasplashtext >= 600){deltasplashtext %= 600; updatesplashtexts()}
   if (deltasave >= 180){deltasave = 0; savesave()}
   let ticksize = 1/tickspersecond
   if (deltatime/tickspersecond >= maxticks) {ticksize = deltatime/maxticks}
   if (deltatime/ticksize > 500){gel("loading").style.display = "inline"}
   let numberpersecond = player.m_values[0].times(new Decimal(2).plus(new Decimal(0.1).times(player.u_levelpowerup)).pow(player.m_valuebuys[0])).times(catspacemulti(player.c_catspace))
   while (deltatime >= ticksize){
    for(let i = 0; i < player.m_values.length-1; i++){
       player.m_values[i] = player.m_values[i].add(player.m_values[i+1].times(ticksize).times(new Decimal(2).plus(new Decimal(0.1).times(player.u_levelpowerup)).pow(player.m_valuebuys[i+1])).times(catspacemulti(player.c_catspace)))
    }
    player.m_number = player.m_number.add(numberpersecond.times(ticksize))
    if (player.u_unlockcatspace.gte(1)) {
      player.c_catspace = player.c_catspace.times(new Decimal(1.01).pow(ticksize).pow(new Decimal(1).divide(catspacesoftcat(player.c_catspace))))
   }
    deltatime -= ticksize
   }
   gel("loading").style.display = "none"
    gel("m_number").textContent = format(player.m_number,8)
    gel("m_numberps").textContent = format(numberpersecond,6)+"/s"
    setupvalues()
   player.lasttick = Date.now()
}, 1000/tickspersecond);