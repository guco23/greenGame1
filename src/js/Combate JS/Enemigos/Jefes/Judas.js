import { Enemigo } from "../Enemigo.js";

export class Judas extends Enemigo {

    allies;
    evo;

    startCombat(combatManager) {
        this.currentCombat = combatManager;
        this.allies = this.currentCombat.enemyTeam;
    }

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

/*
    searchEv() {
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].name == "Judas del Zodíaco") {
                this.evo = this.allies[i];
                console.log(this.evo);
            }
        }
    }

    evolve() {
        this.evo.living = true;
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].name == "Judas del Zodíaco") {
                
            }
        }
        this.currentCombat.addInfo("special", "¡Judas resucitó gracias a\n los poderes del zodíaco!", this, null);
    }
*/

    checkAlive(){
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
            this.currentCombat.hasDied(false);
            this.currentCombat.addInfo("die", 0, this, null);
        }
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
}