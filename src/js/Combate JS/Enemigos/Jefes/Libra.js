import { Enemigo } from "./Enemigos/Enemigo.js";

export class Libra extends Enemigo {

    balance;    //Referencia a la otra libra.
    allies;     //Referencia a todos su aliados

    healing(){
        let healAmount = (this.balance.currentHp - this.currentHp);
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].living) {
                this.allies[i].heal(healAmount);
            }
        }
        this.currentCombat.addInfo("aoeHeal", 0, this, null);
    }

    judgement() {
        let target = currentCombat.playerTeam;
        let damage = (this.currentHp - this.balance.currentHp) + this.atk;
        this.currentCombat.addInfo("special", "You will be judged for your sins!\n", this, null);
        for(i = 0; i < currentCombat.teamSize; i++) {
            if(target.living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(damage), this, target[i]);
                target[i].checkAlive();
            }
        }
        this.endTurn();
    }

    takeTurn() {
        if(this.currentHp > this.balance.currentHp) {
            if(this.currentHp < this.maxHp / 2) {
                this.judgement();
            }
            else {
                let rand = this.getRandomInt(2)
                if(rand === 0) {
                    this.judgement();
                }
                else {
                    this.attack(this.currentCombat.playerTeam);
                }
            }
        }
        else {
            if(this.currentHp < this.maxHp / 2) {
                this.healing();
            }
            else {
                let rand = this.getRandomInt(2)
                if(rand === 0) {
                    this.healing();
                }
                else {
                    this.attack(this.currentCombat.playerTeam);
                }
            }
        }
    }

    searchBalance() {
        for(i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].name == this.name) {
                this.balance = this.allies[i];
            }
        }
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
        this.allies = this.currentCombat.enemyTeam;
    }
}