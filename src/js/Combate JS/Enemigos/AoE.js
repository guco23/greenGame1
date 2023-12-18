import { Enemigo } from "./Enemigo.js";

export class AoE extends Enemigo {

    areaAttack() {
        let target = this.currentCombat.playerTeam;
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].checkAlive();
            }
        }
        this.endTurn();
    }

    selectAction() {
        let rand = this.getRandomInt(3);
        if(this.currentHp < (this.maxHp / 2)) {
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
            this.selectAction();
        }
        else {
            this.stunned = false;
            this.currentCombat.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
}