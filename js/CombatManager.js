import Enemigo from "./Enemigo";

export class CombatManager {

    enemyTeam = new Array(4); //Array que contiene a los objetos 'Enemigos'
    enemySize;
    playerTeam = new Array(4); //Array que contiene a los objetos 'Personajes'
    teamSize;
    current; //Apunta al personaje o enemigo que tiene el turno
    target; //Objetivo de parte del jugador
    whoseTurn; //Booleano, 0 para jugadores y 1 para enemigos
    spPoints; //Puntos de habilidad especial

    takeTurn() {
        if(this.whoseTurn === 0) {
            if(current < this.teamSize) {
                /*Comprobamos si está vivo
                if() {
                    LLamamos al método de turno independiente
                }*/
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 1;
            }
        }
        else {
            if (this.current < this.enemySize) {
                if(this.enemyTeam[this.current].living) {
                    this.enemyTeam[this.current].act(this);
                }
            }
        }
    }

    shiftRight() {
        if (this.whoseTurn == 0 && target < 3) {
            target++;
        }
    }

    shiftLeft() {
        if (this.whoseTurn == 0 && target > 0) {
            target--;
        }
    }
}