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
        this.currentCombat.addInfo("special", this.name + " is preparing a sapping strike!", this, null);
        damag =  myTarget.sufferDamage(this.atk);
        this.currentCombat.addInfo("attack", damag, this, myTarget);
        this.currentCombat.addInfo("special", this.name + " split the stolen health among their allies.");
        myTarget.checkAlive();
        for(i = 0; i < this.currentCombat.teamSize; i++) {
            if(this.currentCombat.playerTeam[i].living) {
                this.currentCombat.playerTeam[i].heal((damag / 4) * this.healFactor)
            }
        }
        this.endTurn();
    }
}