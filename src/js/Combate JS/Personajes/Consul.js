import { Personaje } from "./Personaje.js";

export class Consul extends Personaje {

    buffMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.buffMod = 0.1;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " está dando un cursillo rápido a " + ally.name + ".\n", this, null);
        ally.modifyStat(false, this.atk * this.buffMod, this.def * this.buffMod);
        this.currentCombat.addInfo("special", ally.name + " está listo para la batalla gracias a su ayuda.\n", this, null);
        this.endTurn();
    }
}