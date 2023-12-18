import { Personaje } from "./Personaje.js";

export class Abogado extends Personaje {

    healMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.healMod = 0.1;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " está comprobando si " + ally.name + " está bien.\n", this, null);
        ally.gainShield(this.def);
        ally.heal(this.maxHp * this.healMod);
        this.currentCombat.addInfo("special", "Gracias a " + this.name + ", " + ally.name + " se siente mucho mejor.\n", this, null);
        this.endTurn();
    }
}