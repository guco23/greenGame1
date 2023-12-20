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

    endCombatVictory;  //Booleano que comprueba si todos los enemigos han muerto, lo que significa que el combate ha terminado como victoria
    endCombatDerrota;  //Booleano que comprueba si todos los aliados han muerto, lo que significa que el combate ha terminado como derrota
    endCombat;          //Booleano que indica el final del combate
    current;    //Apunta al personaje o enemigo que tiene el turno
    whoseTurn;  //Booleano, true para jugadores y false para enemigos

    //Otros parámetros

    waitingConfirmation;    //Espera a que el jugador pulse A (mensajes en pantalla)
    actInfo;             //Info del resultado de cada acción

    combatScene;

    constructor(enmyTeam, playrTeam, partySize, scene) {
        this.enemyTeam = enmyTeam;
        this.enemySize = enmyTeam.length;
        this.livingEnemies = this.enemySize;

        this.playerTeam = playrTeam;
        this.teamSize = partySize;
        this.livingParty = this.teamSize;
        
        this.endCombatVictory = false;
        this.endCombatDerrota = false;
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
        else if (this.spPoints > this.teamSize + 1) this.spPoints = this.teamSize;
    }

    addInfo(action, value, from, to) {
        if (action === "attack") {
            this.actInfo += from.name + " atacó a " + to.name + " e hizo " + value + " de daño.\n";
        }
        if(action === "aoeHeal") {
            this.actInfo += from.name + " curó a sus aliados.\n";
        }
        if(action === "crit") {
            this.actInfo += "¡Fue un impacto crítico!\n";
        }
        if (action === "defend") {
            this.actInfo += from.name + " defendió y ganó " + value + " de escudo.\n";
        }
        if (action === "die") {
            this.actInfo += "¡" + from.name + " murió!\n"
        }
        if (action === "dot") {
            this.actInfo += from.name + " sufrió " + value + " de daño por efectos dañinos.\n"
        }
        if (action === "regen") {
            this.actInfo += from.name + " regeneró vida.\n";
        }
        if (action === "poison") {
            this.actInfo += from.name + " aplicó " + value + " de efectos dañinos a " + to.name + ".\n";
        }
        if (action === "stunned") {
            this.actInfo += from.name + " fue confundido.\n";
        }
        if (action === "stun") {
            this.actInfo += from.name + " estaba tan confuso que no pudo actuar.\n"
        }
        if (action === "special") {
            this.actInfo += value;
        }
    }

    showInfo() {
        return this.actInfo;
    }

    nextTurn() {
        if (this.endCombatVictory || this.endCombatDerrota) {
            this.endCombat = true;
            this.endTurn();
        }
        else {
            if (this.whoseTurn === true) {
                if (this.current < this.teamSize) {
                    if (this.playerTeam[this.current].living) {
                        //Está feo el manipular la escena desde aquí 
                        this.combatScene.selectorAcciones.mostrar();
                        this.combatScene.selectorAcciones.activar();
                        this.combatScene.menuActual = this.combatScene.selectorAcciones;
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
                    this.nextTurn();
                }
            }
            else {
                if (this.current < this.enemySize) {
                    if (this.enemyTeam[this.current].living) {
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
                    this.nextTurn();
                }
            }
        }
    }

    hasDied(friendly) {
        if(friendly) {
            this.livingParty--;
            if(this.livingParty == 0) {
                this.endCombatDerrota = true;
            }
        }
        else {
            this.livingEnemies--;
            if(this.livingEnemies == 0) {
                this.endCombatVictory = true;
            }
        }
    }

    endTurn() {
        this.current++;
        this.combatScene.ActualizarEscena(this.actInfo);
        this.actInfo = "";
    }

    specialRequestInfo() {
        return this.playerTeam[this.current].targetKind; //Targeteo para la habilidad. 0 un enemigo, 1 un aliado, 2 todo enemigo, 3 todo aliado
    }

    doAction(action, target) {
        if (action === 0) { //Ataque
            this.changeSp(1);
            this.playerTeam[this.current].attack(target);
        }
        else if (action === 1) { //Especial
            this.changeSp(-1);
            this.playerTeam[this.current].special(target);
        }
        else if(action === 2) { //Defensa
            this.changeSp(1);
            this.playerTeam[this.current].defend();
        }
    }
}