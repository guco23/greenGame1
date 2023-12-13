import { Personaje } from "./Personaje.js";

export class Comandante extends Personaje {
    areaMod;
    debufMod;

    constructor(idn) {
        super(idn);
        this.areaMod = 0.8;
        this.debuffMod = 0.95;
        this.targetKind = 2;
    }

    special(target) {
        let total = 0;
        this.currentCombat.addInfo("special", this.name + " ordered a march!", this, null);
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            let thisTarg = this.currentCombat.enemyTeam[i];
            if(thisTarg.living) {
                total += thisTarg.sufferDamage(this.atk);
                thisTarg.modifyStat(this.debufMod, 1);
            }
        }
        this.currentCombat.addInfo("special", this.name + " dealt a total of " + total + " damage and scared the enemies!");
    }
}