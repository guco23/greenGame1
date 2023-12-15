import { Personaje } from "./Personaje.js";

export class Logista extends Personaje {

    defMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 3;
        this.defMod = 0.1;
    }

    special(target) {
        let extra = this.defMod * this.def;
        for(i = 0; i < this.currentCombat.teamSize; i++) {
            let boost = this.currentCombat.playerTeam[i];
            if(boost.living) {
                boost.modifyStat(false, 0, extra);
            }
        }
    }
}