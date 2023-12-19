import { Personaje } from "./Personaje.js";

export class Aventurero extends Personaje {

    attakMod;
    dotApply;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.dotAplly = Math.floor(this.atk / 2);
        this.attakMod = 1.2;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("special", this.name + " va a experimentar un poco con un" + myTarget.name + ".\n", this, null);
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk * this.attakMod), this, myTarget);
        myTarget.applyDot(this.dotAplly);
        myTarget.checkAlive();
        this.currentCombat.addInfo("poison", this.dotAplly, this, myTarget);
        this.endTurn();
    }
}