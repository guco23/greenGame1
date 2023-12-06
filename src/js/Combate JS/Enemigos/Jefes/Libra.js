import { Enemigo } from "./Enemigos/Enemigo.js";

export class Libra extends Enemigo {
    balance; //Referencia a la otra libra.

    searchBalance() {
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.currentCombat.enemyTeam[i].name == this.name) {
                this.balance = this.currentCombat.enemyTeam[i];
            }
        }
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }
}