import Enemigo from "./Enemigo";

export class CombatManager {

    enemyTeam = new Array(4); //Array que contiene a los objetos 'Enemigos'
    enemySize;
    playerTeam = new Array(4); //Array que contiene a los objetos 'Personajes'
    teamSize;

    current; //Apunta al personaje o enemigo que tiene el turno
    whoseTurn; //Booleano, 0 para jugadores y 1 para enemigos

    target; //Objetivo de parte del jugador
    whereAim; //Booleano para el targeteo, 0 para equipo aliado (curas y bufos), 1 para los enemigos
    targetAll; //Booleano que indica 

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
                current++;
            }
            else {
                current = 0;
                this.whoseTurn = 0;
            }
        }
    }
}