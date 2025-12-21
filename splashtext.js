export function kisaluline(){
    const kisalulines = [
    "hewwo :3"
   ,"meow mrrp mrrreeeow nya"
   ,"even though i meow, i'm not a cat!"
   ,"big number..."
   ,"am i allowed to pet you?"
   ,"whats a... 'kijetesantakalu'?"
   ,"Value UP!! resets everything before it..."
   ,"this world runs on <a href='https://github.com/Patashu/break_eternity.js' target='_blank'>break_eternity.js</a>!<br>wait did i just break the 4th wall"
   ,"how many Values are there?"
   ,"cats are cool"
   ,"the limit is 10^^1e308... <br>maybe you'll get there, someday?"
   ,"i say a new thing every 10 minutes or so..."
   ,"meowmeowmeowmeowmeowmeow..."
   ,"meowwww mrrrrrrrrrp meow meow!!"
   ,"buy something!"
   ,"up to 16... 1.00e16..."
   ,"why am i called <b>Kisa</b>lu if i'm not a cat?"
   ,"big numbers are cool :3"
   ,"toki pona? what's that?"
]
  if (Math.random() < 0.01){return "<span style='color: #00ff00;'>green</span>? random board game?<br>sorry, i don't know who or what that is..."}
  return kisalulines[Math.floor(Math.random()*kisalulines.length)]
}
export function catgodline() {
  const catgodlines = [
     "meow mrrp :3"
    ,"meeeeow meow meow..."
    ,"meow meow, meow!!"
    ,"purrr meow... meow meow..."
    ,"meow!! meow!!!"
    ,"<b>meowww!! :3</b>"
    ,"meow meow meow meow!!"
    ,"meow meow mrrrp meow meow!! :3"
    ,"purrr purr... meow!"
    ,"meow."
    ,"kisalu is such a silly cat<br>wait- they aren't a cat?"
    ,"catnip tastes good"
    ,"so many cats... so many meows..."
    ,"catspace keeps growing..."
    ,"all cats will be pat..."
    ,"just so you know,<br>catspace upgrades divide your catspace"
    ,"nya~"
    ,"without any upgrades,<br>catspace will slow down at 1e100..."
  ]
  if (Math.random() < 0.001){return "<span class='rainbow'>meow~</span>"}
  return catgodlines[Math.floor(Math.random()*catgodlines.length)]
}
export function meowmeowmeow() {
  const meows = ["meow ","mrrp ","nya ","purr "]
  let result = ""
  for(let i = 0; i < 4; i++){
  result += meows[Math.floor(Math.random()*meows.length)]
  }
  return result
}