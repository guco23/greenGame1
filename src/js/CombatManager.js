import Enemigo from "./Enemigo";
import { Personaje } from "./Personaje";

export class CombatManager {

    enemyTeam = new Array(4); //Array que contiene a los objetos 'Enemigos'
    enemySize;
    livingEnemies; //Numero que comprueba los enemigos que siguen vivos
    playerTeam = new Array(4); //Array que contiene a los objetos 'Personajes'
    teamSize;
    livingParty; //Numero que comprueba los personajes que sigues vivos

    endCombat; //Booleano que comprueba si todo un equipo ha muerto, causando el final del combate. false continua el combate, true lo acaba

    current; //Apunta al personaje o enemigo que tiene el turno
    whoseTurn; //Booleano, true para jugadores y false para enemigos

    target; //Objetivo de parte del jugador. -1 para cuando no esté targeteando (tema de renderizado)
    whereAim; //Booleano para el targeteo, true para equipo aliado (curas y bufos), false para los enemigos
    targetAll; //Booleano que indica si targetea a todos o no. 

    spPoints; //Puntos de habilidad especial

    constructor() {
        
    }

    changeSp(shift) {
        this.spPoints += shift;
        if(this.spPoints < 0) this.spPoints = 0;
        else if (this.spPoints > this.teamSize) this.spPoints = this.teamSize;
    }

    tryTarget(num, dir) {
        if(this.whereAim) {
            if (num < this.teamSize && num >= 0) {
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
        else if(num < this.enemySize && num >= 0) {

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

    nextTurn() {
        if(this.whoseTurn === 0) {
            if(current < this.teamSize) {
                if(this.playerTeam[this.current].living === 0) {
                    this.livingParty++;
                    this.playerTeam[this.current].takeTurn();
                }
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 1;
                this.livingEnemies = 0;
                if(this.livingParty === 0) {
                    this.endCombat = true;
                }
            }
        }
        else {
            if (this.current < this.enemySize) {
                if(this.enemyTeam[this.current].living) {
                    this.livingEnemies++;
                    this.enemyTeam[this.current].takeTurn(this);
                }
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 0;
                this.livingParty = 0;
                if(this.livingEnemies === 0) {
                    this.endCombat = true;
                }
            }
        }
        if(this.endCombat === true) {
            //Método para acabar el combate, dar recompensas, volver a la pantalla principal, etc.
        }
        else {
            this.takeTurn();
        }
    }
}