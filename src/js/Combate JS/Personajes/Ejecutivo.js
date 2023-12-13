import { Personaje } from "./Personaje.js";

export class Ejecutivo extends Personaje {

    grwoth;

    constructor(idn) {
        super(idn);
        this.targetKind = 3;
        this.grwoth = 1.05;
    }

    special(target) {
        this.currentCombat.addInfo("special", this.name + " ordered their allies to square up!");
        for(i = 0; i < this.currentCombat.teamSize; i++) {
            let boost = this.currentCombat.playerTeam[i];
            if(boost.living) {
                boost.modifyStat(this.grwoth, 1);
            }
        }
    }
}