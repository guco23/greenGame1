import { Personaje } from "./Personaje.js";

export class Logista extends Personaje {

    healMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.healMod = 0.1;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " is making sure " + ally.name + " is okay!\n", this, null);
        ally.gainShield(this.def);
        ally.heal(this.maxHp * this.healMod);
        this.currentCombat.addInfo("special", "Thanks to them " + ally.name + " is now feeling better.\n", this, null);
    }
}