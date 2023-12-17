import { Personaje } from "./Personaje.js";

export class Innovador extends Personaje {
    stunChance;

    constructor(idn) {
        super(idn);
        this.stunChance = 40;
        this.targetKind = 2;
    }

    special(target) {
        let total = 0;
        this.currentCombat.addInfo("special", this.name + " está decidido a vencer con su ingenio.\n", this, null);
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            let thisTarg = this.currentCombat.enemyTeam[i];
            if(thisTarg.living) {
                total += thisTarg.sufferDamage(this.atk);
                if(this.getRandomInt(100) < this.stunChance) {
                    thisTarg.stun();
                }
                thisTarg.checkAlive();
            }
        }
        this.currentCombat.addInfo("special", this.name + " hizo un total de " + total + " daño.\n", this, null);
        this.endTurn();
    }
}