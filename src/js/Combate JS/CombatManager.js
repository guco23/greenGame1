import { Personaje } from "./Personajes/Personaje.js";
import { Enemigo } from "./Enemigos/Enemigo.js";

export class CombatManager {
    //Parámetros para trackear a los combatientes

    enemyTeam;      //Array que contiene a los objetos 'Enemigos'
    enemySize;
    livingEnemies;  //Numero que comprueba los enemigos que siguen vivos
    playerTeam;     //Array que contiene a los objetos 'Personajes'
    teamSize;
    livingParty;    //Numero que comprueba los personajes que sigues vivos

    //Parámetros para trackear los turnos

    endCombat;  //Booleano que comprueba si todo un equipo ha muerto, causando el final del combate. false continua el combate, true lo acaba
    current;    //Apunta al personaje o enemigo que tiene el turno
    whoseTurn;  //Booleano, true para jugadores y false para enemigos

    //Parámetros para trackear el apuntado
    /*
    target;     //Objetivo de parte del jugador. [-1 para cuando no esté targeteando (tema de renderizado)]
    whereAim;   //Booleano para el targeteo, true para equipo aliado (curas y bufos), false para los enemigos
    targetAll;  //Booleano que indica si targetea a todos o no. 
    */
    //Otros parámetros

    spPoints;   //Puntos de habilidad especial
    dropId;     //Item dropeado al finalizar el combate
    dropChance; //Probabilidad de dropear el objeto

    waitingConfirmation;    //Espera a que el jugador pulse A (mensajes en pantalla)
    actInfo;             //Info del resultado de cada acción

    combatScene;
/*
    constructor(combatInfo, partyInfo, scene) {
        //Mamá sacame de javascript xd
        this.enemySize = combatInfo.participants;
        this.livingEnemies = this.enemySize;
        this.enemyTeam = new Array(this.enemySize);
        for (i = 0; i < this.enemySize; i++) {
            let e = "e" + i;
            enemy = combatInfo[e];
            this.enemyTeam[i] = new Enemigo(enemy, this);
        }

        this.teamSize = partyInfo.number;
        this.livingParty = this.teamSize;
        this.playerTeam = new Array(this.teamSize);
        for (i = 0; i < this.teamSize; i++) {
            let p = "p" + i;
            player = partyInfo[p];
            this.playerTeam[i] = new Personaje(p, this);
        }

        this.endCombat = false;
        this.whereAim = false;
        this.targetAll = false;

        this.spPoints = Math.floor(this.teamSize / 2);
        this.dropId = combatInfo.itemId;
        this.dropChance = combatInfo.dropChance;

        this.combatScene = scene;
    }
*/

    constructor(enmyTeam, enmySize, playrTeam, teamSze, scene) {
        this.enemyTeam = enmyTeam;
        this.enemySize = enmySize;
        this.playerTeam = playrTeam;
        this.teamSize = teamSze;

        this.endCombat = false;
        this.current = 0;
        this.whoseTurn = true;

        this.spPoints = Math.floor(this.teamSize / 2);
        //this.dropId = combatInfo.itemId;
        //this.dropChance = combatInfo.dropChance;

        this.combatScene = scene;  
        this.actInfo = "";
    }

    setTeams(enemyTeam, enemySize, playerTeam, teamSize){
        this.enemyTeam = enemyTeam;
        this.enemySize = enemySize;
        this.playerTeam = playerTeam;
        this.teamSize = teamSize;

        this.spPoints = Math.floor(this.teamSize / 2);
    }

    changeSp(shift) {
        this.spPoints += shift;
        if (this.spPoints < 0) this.spPoints = 0;
        else if (this.spPoints > this.teamSize) this.spPoints = this.teamSize;
    }

    addInfo(action, value, from, to) {
        if (action === "attack") {
            this.actInfo += from.name + " attacked " + to.name + " for " + value + " damage.\n";
        }
        if(action === "aoeHeal") {
            this.actInfo += from.name + " healed their allies!\n";
        }
        if(action === "crit") {
            this.actInfo += "It was a critical blow!\n";
        }
        if (action === "defend") {
            this.actInfo += from.name + " defended and added " + value + " shield.\n";
        }
        if (action === "die") {
            this.actInfo += from.name + " died!\n"
        }
        if (action === "dot") {
            this.actInfo += from.name + " suffered " + value + " damage due to negative effects.\n"
        }
        if (action === "poison") {
            this.actInfo += from.name + " applied " + value + " poison to " + to.name + "\n";
        }
        if (action === "stunned") {
            this.actInfo += from.name + " became stunned!\n";
        }
        if (action === "stun") {
            this.actInfo += from.name + " was stunned and couldn't act.\n"
        }
        if (action === "special") {
            this.actInfo += value;
        }
    }

    showInfo() {
        return this.actInfo;
    }

    nextTurn() {
        if (this.endCombat === true) {
            //Método para acabar el combate, dar recompensas, volver a la pantalla principal, etc.
        }
        else {
            if (this.whoseTurn === true) {
                if (this.current < this.teamSize) {
                    if (this.playerTeam[this.current].living) {
                        this.combatScene.selectorAcciones.mostrar();
                        this.combatScene.menuActual = this.combatScene.selectorAcciones;
                        this.livingParty++;
                        this.playerTeam[this.current].takeTurn();
                    }
                    else {
                        this.current++;
                        this.nextTurn();
                    }
                }
                else {
                    this.current = 0;
                    this.whoseTurn = false;
                    this.livingEnemies = 0;
                    if (this.livingParty === 0) {
                        this.endCombat = true;
                    }
                    this.nextTurn();
                }
            }
            else {
                if (this.current < this.enemySize) {
                    if (this.enemyTeam[this.current].living) {
                        this.livingEnemies++;
                        this.enemyTeam[this.current].takeTurn(this);
                    }
                    else {
                        this.current++;
                        this.nextTurn()
                    }
                }
                else {
                    this.current = 0;
                    this.whoseTurn = true;
                    this.livingParty = 0;
                    if (this.livingEnemies === 0) {
                        this.endCombat = true;
                    }
                    this.nextTurn();
                }
            }
        }
    }

    endTurn() {
        this.current++;
        this.combatScene.ActualizarEscena(this.actInfo);
        this.actInfo = "";
    }

    specialRequestInfo() {
        return this.playerTeam[this.current].targetKind;
    }

    doAction(action, target) {
        if (action === 0) { //Ataque
            this.playerTeam[this.current].attack(target);
        }
        else if (action === 1) { //Especial
            this.playerTeam[this.current].special(target);
        }
        else if(action === 2) { //Defensa
            this.playerTeam[this.current].gainShield;
        }
    }
}