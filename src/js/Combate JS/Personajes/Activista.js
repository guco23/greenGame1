import { Personaje } from "./Personaje.js";

export class Activista extends Personaje {

    healMod;
    buffMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.healMod = 0.2;
        this.buffMod = 1.1;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " está aumentando la moral de su equipo.\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            let ally = this.currentCombat.playerTeam[i];
            if(ally.living) {
                ally.heal(this.maxHp * this.healMod);
            }
        }
        ally.modifyStat(true, this.buffMod, 1);
        if(ally != this) {
            this.currentCombat.addInfo("special", ally.name + " fue especialmente inspirado\n", this, null);
            this.currentCombat.addInfo("special", "por sus palabras.\n", this, null);
        }
        else {
            this.currentCombat.addInfo("special", this.name + "se motivó con su propio discurso.\n", this, null);
        }
        this.endTurn();
    }
}