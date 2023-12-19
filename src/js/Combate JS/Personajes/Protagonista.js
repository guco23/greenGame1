import { Personaje } from "./Personaje.js";

export class Protagonista extends Personaje {

    healFactor;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.healFactor = 1.2;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("special", this.name + " prepara un ataque drenador.\n", this, null);
        let damag =  myTarget.sufferDamage(this.atk);
        this.currentCombat.addInfo("attack", damag, this, myTarget);
        this.currentCombat.addInfo("special", this.name + " repartió la salud robada entre sus aliados.\n");
        myTarget.checkAlive();
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(this.currentCombat.playerTeam[i].living) {
                this.currentCombat.playerTeam[i].heal((damag / this.currentCombat.teamSize) * this.healFactor)
            }
        }
        this.endTurn();
    }
}