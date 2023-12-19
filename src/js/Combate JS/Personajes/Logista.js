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
        this.currentCombat.addInfo("special", this.name + " está ayudando a sus aliados a organizar sus defensas.\n");
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            let boost = this.currentCombat.playerTeam[i];
            if(boost.living) {
                console.log(boost.name + " " + boost.def);
                boost.modifyStat(false, 0, extra);
                console.log(boost.def);
            }
        }
        this.endTurn();
    }
}