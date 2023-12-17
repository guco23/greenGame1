import { Personaje } from "./Personaje.js";

export class Activista extends Personaje {
    healMod;
    buffMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.healMod = 0.1;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " está aumentando la moral de su equipo.\n", this, null);
        for(i = 0; i < this.currentCombat.teamSize; i++) {
            let ally = this.currentCombat.playerTeam[i];
            if(ally.living) {
                ally.heal(this.maxHp * this.healMod);
            }
        }
        ally.modifyStat(true, this.buffMod, 1);
        this.currentCombat.addInfo("special", ally.name + " fue especialmente inspirado por sus palabras.\n", this, null);
        this.endTurn();
    }
}