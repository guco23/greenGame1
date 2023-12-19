import { Personaje } from "./Personaje.js";

export class Virtuoso extends Personaje {

    buffMod;
    healMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 4;
        this.buffMod = 1.25;
        this.healMod = 0.1;
    }

    special(target) {
        this.currentCombat.addInfo("special", "La curiosidad de " + this.name + " le está haciendo más fuerte.\n", this, null);
        this.atk = this.atk * this.buffMod;
        this.heal(this.maxHp * this.healMod);
        this.currentCombat.addInfo("special", this.name + " está listo para ensuciarse las manos.\n", this, null);
        this.endTurn();
    }
}