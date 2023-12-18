import { Enemigo } from "../../src/js/Combate JS/Enemigos/Enemigo.js"
import { Veneno } from "../../src/js/Combate JS/Enemigos/Veneno.js"
import { Healer } from "../../src/js/Combate JS/Enemigos/Healer.js"
import { AoE } from "../../src/js/Combate JS/Enemigos/AoE.js"
import { Fuerte } from "../../src/js/Combate JS/Enemigos/Fuerte.js"
import {Aturdidor} from "../../src/js/Combate JS/Enemigos/Aturdidor.js"
import { Libra } from "../../src/js/Combate JS/Enemigos/Jefes/Libra.js"

export var enemies = {
    botella: {class: Enemigo, name:"Flipper", maxHp:60, atk: 30, def: 15, prefType: "", imgLink: "enemigoMercadonaBotella.png", crit: 10},

    calamar: {class: Veneno, name:"H", maxHp:70, atk: 20, def: 10, prefType: "", imgLink: ""}, crit: 10,

    cocacola: {class: Enemigo, name:"Julián", maxHp:60, atk: 35, def: 10, prefType: "", imgLink: "enemigoMercadonaBotella.png", crit: 10},
        
    dragon: {class: Enemigo, name:"Doragon", maxHP:60, atk:20, def: 15, prefType:"",  imgLink: "", crit: 10},

    libra: {class: Libra, name:"Libra", maxHp:500, atk: 45, def: 30, prefType: "", imgLink: "", crit: 5},

    magdalena: {class: Healer, name:"María Magdalena", maxHp:80, atk: 20, def: 15, prefType: "", imgLink: "", crit: 10},
    
    pan: {class: Enemigo, name:"Pan-theon", maxHp:150, atk: 25, def: 20, prefType: "", imgLink: "", crit: 10},

    platano: {class: Enemigo, name:"Estaaa", maxHp:60, atk: 30, def: 15, prefType: "", imgLink: "", crit: 10},

    pollo: {class: AoE, name:"Poyo", maxHp:40, atk: 30, def: 5, prefType: "", imgLink: "enemigoMercadonaBotella.png", crit: 15},

    salchicha: {class: Fuerte, name:"Salchineitor", maxHp:50, atk: 40, def: 5, prefType: "", imgLink: "", crit: 10},

    sardina: {class: Aturdidor, name:"Cap. Sardinez", maxHp:600, atk: 20, def: 10, prefType: "", imgLink: "", crit: 5}
}