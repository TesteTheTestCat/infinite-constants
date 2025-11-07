let player = {
    version: "alpha0.03",
    m_number: 10,
    m_values: [0,0,0,0],
    m_valuebuys: [0,0,0,0]
}
const tickspersecond = 20
const constants = {
    m_levelmult: 2
}
setInterval(() => {
    for(let i = 0; i < player.m_values.length-1; i++){
       player.m_values[i] += player.m_values[i+1]/tickspersecond * 2**player.m_valuebuys[i+1]
    }
    player.m_number += player.m_values[1]/tickspersecond * 2**player.m_valuebuys[1]
}, 1000/tickspersecond);