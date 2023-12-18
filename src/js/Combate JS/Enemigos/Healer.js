import { enemies } from "../../../../assets/EnemyInfo/Enemies.js";
import { Enemigo } from "./Enemigos/Enemigo.js";

export class Healer extends Enemigo {

    healing() {
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            let current = this.currentCombat.enemyTeam[i];
            if(current.isLiving) {
                current.heal(Math.floor((this.maxHp / 10) + this.def));
            }
        }
        this.currentCombat.addInfo("aoeHeal", 0, this, null);
        this.endTurn();
    }

    teamHealth() {
        let wario = 0;
        let waluigi = 0;
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            let current = this.currentCombat.enemyTeam[i];
            if(current.isLiving){
                if(current.currentHP < current.maxHp / 2) {
                    waluigi++;
                }
                wario++;
            }
        }
        return (this.getRandomInt(wario) < waluigi);
    }

    selectAction() {
        if(this.teamHealth()) {
            this.healing();
        }
        else {
            this.attack(this.currentCombat.playerTeam);
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