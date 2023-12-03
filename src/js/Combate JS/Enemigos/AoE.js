import { Enemigo } from "./Enemigos/Enemigo.js";

export class AoE extends Enemigo {

    areaAttack() {
        let target = currentCombat.playerTeam;
        for(i = 0; i < currentCombat.teamSize; i++) {
            if(target.living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].checkAlive();
            }
        }
        this.endTurn();
    }

    selectAction() {
        let rand; //Hacer algo random entre 1 y 3
        if(this.currentHP < this.maxHp / 2) {
            if(rand === 0) {
                this.attack();
            }
            else {
                this.areaAttack();
            }
        }
        else {
            if(rand === 2) {
                this.areaAttack();
            }
            else {
                this.attack();
            }
        }
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