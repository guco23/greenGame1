import { Personaje } from "./Personaje.js";

export class Ejecutivo extends Personaje {

    grwoth;

    constructor(idn) {
        super(idn);
        this.targetKind = 3;
        this.grwoth = 1.1;
    }

    special(target) {
        this.currentCombat.addInfo("special", this.name + " llamó a sus aliados para que se prepasen.\n");
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            let boost = this.currentCombat.playerTeam[i];
            if(boost.living) {
                boost.modifyStat(true, this.grwoth, 1);
            }
        }
        this.endTurn();
    }
}