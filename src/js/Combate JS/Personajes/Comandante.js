import { Personaje } from "./Personaje.js";

export class Comandante extends Personaje {
    areaMod;
    debufMod;

    constructor(idn) {
        super(idn);
        this.areaMod = 0.8;
        this.debufMod = 0.9;
        this.targetKind = 2;
    }

    special(target) {
        let total = 0;
        this.currentCombat.addInfo("special", this.name + " ordena a sus aliados avanzar\n", this, null);
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            let thisTarg = this.currentCombat.enemyTeam[i];
            if(thisTarg.living) {
                total += thisTarg.sufferDamage(this.atk);
                thisTarg.modifyStat(true, this.debufMod, 1);
                thisTarg.checkAlive();
            }
        }
        this.currentCombat.addInfo("special", this.name + " hizo un total de " + total + " daño\n");
        this.currentCombat.addInfo("special", "y aterrorizó a los enemigos.\n");
        this.endTurn();
    }
}