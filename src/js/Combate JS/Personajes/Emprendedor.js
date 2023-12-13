import { Personaje } from "./Personaje.js";

export class Emprendedor extends Personaje {

    attakMod;
    growth;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.attakMod = 1.5;
        this.growth = 0.05;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk * this.attakMod), this, myTarget);
        this.currentCombat.addInfo("special", this.name + " hyped up and increased their attack!", this, null);
    }
}