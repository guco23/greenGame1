import { Enemigo } from "../../src/js/Combate JS/Enemigos/Enemigo.js"
import { Veneno } from "../../src/js/Combate JS/Enemigos/Veneno.js"
import { Healer } from "../../src/js/Combate JS/Enemigos/Healer.js"
import { AoE } from "../../src/js/Combate JS/Enemigos/AoE.js"
import { Fuerte } from "../../src/js/Combate JS/Enemigos/Fuerte.js"
import {Aturdidor} from "../../src/js/Combate JS/Enemigos/Aturdidor.js"
import { Libra } from "../../src/js/Combate JS/Enemigos/Jefes/Libra.js"

export var enemies = {

    //Mercadona

    botella: {class: Enemigo, name:"Botella de agua mineral", maxHp:50, atk: 25, def: 15, prefType: "", imgLink: "Botella1.png", crit: 10},

    calamar: {class: Veneno, name:"Calamarín", maxHp:70, atk: 20, def: 10, prefType: "", imgLink: "Calamar.png", crit: 10},

    cocacola: {class: Enemigo, name:"CocaCola Espuma", maxHp:60, atk: 25, def: 10, prefType: "", imgLink: "CocaCola.png", crit: 10},

    magdalena: {class: Healer, name:"María Magdalena", maxHp:70, atk: 20, def: 15, prefType: "", imgLink: "Magdalena.png", crit: 10},
    
    pan: {class: Enemigo, name:"Pan-theon", maxHp:150, atk: 15, def: 20, prefType: "", imgLink: "Pan.png", crit: 10},

    platano: {class: Enemigo, name:"Mr Banana", maxHp:60, atk: 25, def: 15, prefType: "", imgLink: "Platano.png", crit: 10},

    pollo: {class: AoE, name:"Pollón", maxHp:60, atk: 30, def: 5, prefType: "", imgLink: "Pollo.png", crit: 15},

    salchicha: {class: Fuerte, name:"Sr Salchichón", maxHp:60, atk: 30, def: 5, prefType: "", imgLink: "Salchicha.png", crit: 10},

    sardina: {class: Aturdidor, name:"Cap. Sardinez", maxHp:60, atk: 20, def: 10, prefType: "", imgLink: "Sardina.png", crit: 5},
    
    libra: {class: Libra, name:"Libra", maxHp:300, atk: 20, def: 30, prefType: "", imgLink: "libra_boss.png", crit: 5},

    //Playa

    botella2: {class: Enemigo, name:"Botella de agua salada", maxHp:80, atk: 35, def: 15, prefType: "", imgLink: "Botella2.png", crit: 10},

    pezGlobo: {class: Veneno, name:"Sr. Puff", maxHp:80, atk: 30, def: 10, prefType: "", imgLink: "PezGlobo.png", crit: 10},

    pepsi: {class: Enemigo, name:"Pepsi Max", maxHp:80, atk: 35, def: 10, prefType: "", imgLink: "Pepsi.png", crit: 10},

    pezPayaso: {class: Healer, name:"Eu payaso", maxHp:90, atk: 30, def: 15, prefType: "", imgLink: "PezPayaso.png", crit: 10},
    
    cangrejo: {class: Enemigo, name:"Don Crustáceo", maxHp:250, atk: 25, def: 20, prefType: "", imgLink: "Cangrejo.png", crit: 10},

    platanoMaduro: {class: Enemigo, name:"Banana Master", maxHp:80, atk: 35, def: 15, prefType: "", imgLink: "PlatanoMaduro.png", crit: 10},

    pirania: {class: AoE, name:"Piraña", maxHp:90, atk: 35, def: 5, prefType: "", imgLink: "Pirania.png", crit: 15},

    langosta: {class: Fuerte, name:"Tiririiiii", maxHp:90, atk: 35, def: 5, prefType: "", imgLink: "Langosta.png", crit: 10},

    medusa: {class: Aturdidor, name:"Medusa Pica Pica", maxHp:90, atk: 30, def: 10, prefType: "", imgLink: "Medusa.png", crit: 5},
    
    acuarius: {class: Libra, name:"Acuarius mamadísimo", maxHp:600, atk: 30, def: 30, prefType: "", imgLink: "acuarius_boss.png", crit: 5},

    //Nuevos Ministerios

    botella3: {class: Enemigo, name:"Botella de agua contaminada", maxHp:100, atk: 45, def: 15, prefType: "", imgLink: "Botella3.png", crit: 10},

    aceite: {class: Veneno, name:"Aceite aceitoso", maxHp:100, atk: 40, def: 10, prefType: "", imgLink: "Aceite.png", crit: 10},

    fanta: {class: Enemigo, name:"Fanta caducada", maxHp:100, atk: 45, def: 10, prefType: "", imgLink: "Fanta.png", crit: 10},

    chocoMagdalena: {class: Healer, name:"Choco Magdalena", maxHp:110, atk: 40, def: 15, prefType: "", imgLink: "ChocoMagdalena.png", crit: 10},
    
    escombro: {class: Enemigo, name:"Escombro", maxHp:350, atk: 35, def: 20, prefType: "", imgLink: "Escombro.png", crit: 10},

    platanoRojo: {class: Enemigo, name:"Platano encabronado", maxHp:100, atk: 45, def: 15, prefType: "", imgLink: "PlatanoRojo.png", crit: 10},

    meteoro: {class: AoE, name:"Meteoro", maxHp: 120, atk: 45, def: 5, prefType: "", imgLink: "Meteoro.png", crit: 15},

    cono: {class: Fuerte, name: "Cono", maxHp:120, atk: 45, def: 5, prefType: "", imgLink: "Cono.png", crit: 10},

    sardinaFuego: {class: Aturdidor, name:"Sardina tostada", maxHp: 110, atk: 40, def: 10, prefType: "", imgLink: "SardinaFuego.png", crit: 5},
    
    finalBoss: {class: Libra, name:"Judas", maxHp:1000, atk: 35, def: 30, prefType: "", imgLink: "final_boss.png", crit: 5}

}