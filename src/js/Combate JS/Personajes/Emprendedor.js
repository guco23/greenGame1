import { Personaje } from "./Personaje.js";

export class Emprendedor extends Personaje {

    attakMod;
    growth;

    constructor(idn) {
        super(idn);
        this.targetKind = 0;
        this.attakMod = 1.5;
        this.growth = 1.1;
    }

    special(target) {
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk * this.attakMod), this, myTarget);
        myTarget.checkAlive();
        console.log(this.atk);
        this.atk = this.atk * this.growth;
        console.log(this.atk);
        this.currentCombat.addInfo("special", this.name + " se motivó tanto que aumentó su ataque.\n", this, null);
        this.endTurn();
    }
}