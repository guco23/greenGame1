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
            this.attack();
        }
    }
}