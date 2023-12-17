import { Personaje } from "./Personaje.js";

export class Mediador extends Personaje {
    healMod;

    constructor(idn) {
        super(idn);
        this.targetKind = 1;
        this.healMod = 0.2;
    }

    special(target) {
        let ally = this.currentCombat.playerTeam[target];
        this.currentCombat.addInfo("special", this.name + " le está dando un tratamiento especial a " + ally.name, this, null);
        ally.heal(this.maxHp * this.healMod);
        if(ally.dot > 0) {
            ally.dot = -5;
        }
        else {
            ally.applyDot(-3);
        }
        this.currentCombat.addInfo("special", ally.name + " se siente tan bien que ahora también cuida de sí mismo", this, null);
        this.endTurn();
    }
}