import { Personaje } from "./Personaje.js";

export class Animador extends Personaje {

    stunChance;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.stunChance = 1;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("special", this.name + " está bailando entusiasmadamente.\n", this, null);
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk * this.attakMod), this, myTarget);
        if(this.getRandomInt(100) < this.stunChance) {
            myTarget.stun();
        }
        myTarget.checkAlive();
        this.endTurn();
    }
}