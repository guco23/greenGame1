import { Personaje } from "./Personaje.js";

export class Arquitecto extends Personaje {
    atkMod;

    constructor(idn) {
        super(idn);
        this.atkMod = 0.25;
        this.targetKind = 0;
    }

    special(target) {
        let total = 0;
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk * this.atkMod), this, myTarget);
        myTarget.checkAlive();
        this.currentCombat.addInfo("special", this.name + " ha planteado una emboscada.\n", this, null);
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            let thisTarg = this.currentCombat.enemyTeam[i];
            if(thisTarg.living) {
                total += thisTarg.sufferDamage(this.atk);
                thisTarg.checkAlive();
            }
        }
        this.currentCombat.addInfo("special", this.name + " hizo un total de " + total + " daño con su trampa.\n", this, null);
        this.endTurn();
    }
}