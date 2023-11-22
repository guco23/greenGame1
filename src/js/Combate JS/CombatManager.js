import Enemigo from "./Enemigo";
import { Personaje } from "./Personaje";

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

    target;     //Objetivo de parte del jugador. -1 para cuando no esté targeteando (tema de renderizado)
    whereAim;   //Booleano para el targeteo, true para equipo aliado (curas y bufos), false para los enemigos
    targetAll;  //Booleano que indica si targetea a todos o no. 

    //Otros parámetros

    spPoints;   //Puntos de habilidad especial
    dropId;     //Item dropeado al finalizar el combate
    dropChance; //Probabilidad de dropear el objeto

    waitingConfirmation;    //Espera a que el jugador pulse A (mensajes en pantalla)
    actInfo;             //Info del resultado de cada acción

    constructor(combatInfo, partyInfo) {
        //Mamá sacame de javascript xd
        this.enemySize = combatInfo.participants;
        this.livingEnemies = this.enemySize;
        this.enemyTeam = new Array(this.enemySize);
        for(i = 0; i < this.enemySize; i++){
            let e = "e" + i;
            enemy = combatInfo.e;
            this.enemyTeam[i] = new enemy.class(enemy, this);
        }

        this.teamSize = partyInfo.number;
        this.livingParty = this.teamSize;
        this.playerTeam = new Array(this.teamSize);
        for(i = 0; i < this.teamSize; i++) {
            let p = "p" + i;
            player = partyInfo.p;
            this.playerTeam[i] = new p.class(p, this);
        }

        this.endCombat = false;
        this.whereAim = false;
        this.targetAll = false;

        this.spPoints = Math.floor(this.teamSize/2);
        this.dropId = combatInfo.itemId;
        this.dropChance = combatInfo.dropChance;
    }

    changeSp(shift) {
        this.spPoints += shift;
        if(this.spPoints < 0) this.spPoints = 0;
        else if (this.spPoints > this.teamSize) this.spPoints = this.teamSize;
    }

    tryTarget(num, dir) {
        if(this.whereAim) {
            if (num >= this.teamSize && num < 0) {
                return false;
            }
            else if(this.playerTeam[num].living === true) {
                this.target = num;
                return true;
            }
            else {
                return this.tryTarget(num + dir, dir);
            }
        }
        else  {
            if(num >= this.enemySize && num < 0) {
                return false;
            }
            else if(this.enemyTeam[num].living === true) {
                this.target = num;
                return true;
            }
            else {
                return this.tryTarget(num + dir, dir);
            }
        }
    }

    setTarget(aim, all) {
        this.whereAim = aim;
        this.targetAll = all;
        this.tryTarget(0);
    }

    shiftTarget(direction) {
        this.tryTarget(this.target, direction);
    }

    cancelTarget() {
        target = -1;
    }

    addInfo(action, value, from, to) {
        if(action === "attack") {
            this.actInfo += from.name + " attacked " + to.name + " for " + value + " damage.\n";
        }
        if(action === "defend") {
            this.actInfo += from.name + " defended and added " + value + " shield.\n";
        }
        if(action === "die") {
            this.actInfo += from.name + " died!\n"
        }
        if(action === "dot") {
            this.actInfo += from.name + " suffered " + value + " damage due to negative effects."
        }
        if(action === "stun") {
            this.actInfo += from.name + " was stunned and couldn't act"
        }
    }

    showInfo() {
        return this.actInfo;
    }

    nextTurn() {
        if(this.endCombat === true) {
            //Método para acabar el combate, dar recompensas, volver a la pantalla principal, etc.
        }
        else {
            if(this.whoseTurn === true) {
                if(this.current < this.teamSize) {
                    if(this.playerTeam[this.current].living === 0) {
                        this.livingParty++;
                        this.playerTeam[this.current].takeTurn();
                        this.current++;
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
                    if(this.livingParty === 0) {
                        this.endCombat = true;
                    }
                    this.nextTurn();
                }
            }
            else {
                if (this.current < this.enemySize) {
                    if(this.enemyTeam[this.current].living) {
                        this.livingEnemies++;
                        this.current++;
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
                    if(this.livingEnemies === 0) {
                        this.endCombat = true;
                    }
                    this.nextTurn();
                }
            }
        }
    }

    endTurn(){
        //Do stuff with scene 
        this.waitingConfirmation = true;
    }

    eventHandler(event) {
        if(this.waitingConfirmation && event === "D") {
            this.actInfo = "";
            this.waitingConfirmation = false;
            this.nextTurn();
        }
        else if (this.whoseTurn) {

        }
    }
}