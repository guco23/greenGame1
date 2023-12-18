import { Enemigo } from "../Enemigo.js";

export class Libra extends Enemigo {

    balance;    //Referencia a la otra libra.
    allies;     //Referencia a todos su aliados

    healing(){
        let healAmount = (this.balance.currentHp - this.currentHp);
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].living) {
                this.allies[i].heal(healAmount);
            }
        }
        this.currentCombat.addInfo("aoeHeal", 0, this, null);
        this.endTurn();
    }

    judgement() {
        let target = this.currentCombat.playerTeam;
        let damage = Math.floor((this.currentHp - this.balance.currentHp)/5) + this.atk;
        this.currentCombat.addInfo("special", "'¡Sereis juzgados por vuestros pecados!'\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(damage), this, target[i]);
                target[i].checkAlive();
            }
        }
        this.endTurn();
    }

    takeTurn() {
        if(this.currentHp >= this.balance.currentHp) {
            if(this.currentHp < (this.maxHp / 2)) {
                this.judgement();
            }
            else {
                let rand = this.getRandomInt(3)
                if(rand === 0) {
                    this.judgement();
                }
                else {
                    this.attack(this.currentCombat.playerTeam);
                }
            }
        }
        else {
            if(this.currentHp < (this.maxHp / 2)) {
                this.healing();
            }
            else {
                let rand = this.getRandomInt(3)
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
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(this.allies[i].name == this.name && this != this.allies[i]) {
                this.balance = this.allies[i];
                console.log(this.balance);
            }
        }
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
        this.allies = this.currentCombat.enemyTeam;
        this.searchBalance();
    }
}