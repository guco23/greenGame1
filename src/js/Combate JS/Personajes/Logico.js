import { Personaje } from "./Personaje.js";

export class Logico extends Personaje {
    dotAplly;

    constructor(idn) {
        super(idn);
        this.dotAplly = Math.floor(this.atk / 5);
        this.targetKind = 2;
    }

    special(target) {
        let total = 0;
        this.currentCombat.addInfo("special", this.name + " encontro una debilidad de los enemigos.\n", this, null);
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            let thisTarg = this.currentCombat.enemyTeam[i];
            if(thisTarg.living) {
                total += thisTarg.sufferDamage(this.atk);
                thisTarg.applyDot(this.dotAplly);
            }
        }
        this.currentCombat.addInfo("special", this.name + " hizo un total de " + total + " daño y causó efectos perjudiciales.\n");
        this.endTurn();
    }
}