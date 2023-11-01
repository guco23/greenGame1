import Enemigo from "./Enemigo";

export class CombatManager {

    enemyTeam = new Array(4); //Array que contiene a los objetos 'Enemigos'
    enemySize;
    livingEnemies; //Numero que comprueba los enemigos que siguen vivos
    playerTeam = new Array(4); //Array que contiene a los objetos 'Personajes'
    teamSize;
    livingParty; //Numero que comprueba los personajes que sigues vivos

    endCombat; //Booleano que comprueba si todo un equipo ha muerto, causando el final del combate. 0 continua el combate, 1 lo acaba

    current; //Apunta al personaje o enemigo que tiene el turno
    whoseTurn; //Booleano, 0 para jugadores y 1 para enemigos

    target; //Objetivo de parte del jugador. -1 para cuando no esté targeteando (tema de renderizado)
    whereAim; //Booleano para el targeteo, 0 para equipo aliado (curas y bufos), 1 para los enemigos
    targetAll; //Booleano que indica si targetea a todos o no. 0 single 1 area

    spPoints; //Puntos de habilidad especial

    constructor() {
        
    }

    setTarget(aim, all) {
        this.whereAim = aim;
        this.targetAll = all;
    }

    cancelTarget() {
        target = -1;
    }

    nextTurn() {
        if(this.whoseTurn === 0) {
            if(current < this.teamSize) {
                if(this.playerTeam[this.current].living === 0) {
                    this.playerTeam[this.current].takeTurn();
                }
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 1;
                this.livingEnemies = 0;
                if(this.livingParty === 0) {
                    this.endCombat = 1;
                }
                this.takeTurn();
            }
        }
        else {
            if (this.current < this.enemySize) {
                if(this.enemyTeam[this.current].living) {
                    this.enemyTeam[this.current].takeTurn(this);
                    this.livingEnemies++;
                }
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 0;
                if(this.livingEnemies === 0) {
                    this.endCombat = 1;
                }
                this.takeTurn();
            }
        }
        if(this.endCombat === 1) {
            //Método para acabar el combate, dar recompensas, volver a la pantalla principal, etc.
        }
    }
}