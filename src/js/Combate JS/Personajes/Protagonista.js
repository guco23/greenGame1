import { Personaje } from "./Personaje.js";

export class Protagonista extends Personaje {

    healFactor;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.healFactor = 1;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk), this, myTarget);
        myTarget.checkAlive();
        for(i = 0; i < this.currentCombat.teamSize; i++) {
            if(this.currentCombat.playerTeam[i].living) {
                this.currentCombat.playerTeam[i].heal((this.maxHp / 10) * this.healFactor)
            }
        }
        this.endTurn();
    }
}