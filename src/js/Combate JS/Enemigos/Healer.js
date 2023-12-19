import { Enemigo } from "./Enemigo.js";

export class Healer extends Enemigo {

    healing() {
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            let current = this.currentCombat.enemyTeam[i];
            if(current.living) {
                current.heal(Math.floor((this.maxHp / 10) + this.def));
            }
        }
        this.currentCombat.addInfo("aoeHeal", 0, this, null);
        this.endTurn();
    }

    teamHealth() {
        let wario = 0;
        let waluigi = 0;
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            let current = this.currentCombat.enemyTeam[i];
            if(current.living){
                if(current.currentHp < (current.maxHp / 2)) {
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
}