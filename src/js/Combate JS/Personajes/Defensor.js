import { Personaje } from "./Personaje.js";

export class Defensor extends Personaje {

    buffMod;
    shieldMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.buffMod = 0.2;
        this.shieldMod = 1.5;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " está lista para defender a " + ally.name + ".\n", this, null);
        ally.modifyStat(false, 0, this.def * this.buffMod);
        ally.gainShield(this.def * this.shieldMod);
        this.currentCombat.addInfo("special", ally.name + " se siente imparable gracias a su ayuda.\n", this, null);
        this.endTurn();
    }
}