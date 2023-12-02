import { Enemigo } from "./Enemigos/Enemigo.js";

export class AoE extends Enemigo {

    areaAttack() {
        target = currentCombat.playerTeam;
        for(i = 0; i < currentCombat.teamSize; i++) {
            if(target.living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].checkAlive();
            }
        }
    }

    selectAction() {

    }

    takeTurn() {
        if(this.stunned === false) {
            this.attack(this.currentCombat.playerTeam);
        }
        else {
            this.stunned = false;
            this.currentCombat.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
}