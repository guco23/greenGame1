import { Enemigo } from "../Enemigo.js";

export class Acuarius extends Enemigo {

    allies;
    resurect;
    startingAtk;
    second = false;

    startCombat(combatManager) {
        this.currentCombat = combatManager;
        this.allies = this.currentCombat.enemyTeam;
        this.resurect = true;
        this.startingAtk = this.atk;
    }

    areaAttack() {
        let target = this.currentCombat.playerTeam;
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].checkAlive();
                if(!this.resurect) {
                    this.aturdir(target[i]);
                }
            }
        }
        if(this.second) {
            this.second = false;
            this.attack();
        }
        else {
            this.endTurn();
        }
    }

    attack() {
        let length = 0;
        let playerTeam = this.currentCombat.playerTeam;
        let selecion = new Array(8);
        for(let i = 0; i < playerTeam.length; i++) {
            if(playerTeam[i].living) {
                if(playerTeam[i].personality === this.prefType) {
                    selecion[length] = playerTeam[i];
                    length++;
                }
                selecion[length] = playerTeam[i];
                length++;
            }
        }
        let target = this.getRandomInt(length);
        if(selecion[target] != undefined) {
            if(this.getCrit()) {
                let damage = selecion[target].sufferDamage(this.atk * 3)
                this.currentCombat.addInfo("attack", damage, this, selecion[target]);
                this.currentCombat.addInfo("crit", 0, this, null);
                this.aturdir(selecion[target]);
                selecion[target].checkAlive();
            }
            else {
                let damage = selecion[target].sufferDamage(this.atk)
                this.currentCombat.addInfo("attack", damage, this, selecion[target]);
                this.aturdir(selecion[target]);
                selecion[target].checkAlive();
            }
            if(!this.revive) {
                this.currentCombat.addInfo("special", this.name + " robó la vida de su objetivo.\n", this, null);
                this.heal(damage);
            }
        }
        if(this.second) {
            this.second = false;
            this.attack();
        }
        else {
            this.endTurn();
        }
    }

    aturdir(target) {
        let chance = this.getRandomInt(100);
        if (chance < Math.floor((target.currentHp / target.maxHp) * 100)) {
            target.stun();
        }
    }

    checkRevive() {
        let result = -1;
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(!this.allies[i].living) {
                result++;
            }
        }
        let pete = this.getRandomInt(this.currentCombat.enemySize);
        console.log(pete);
        return pete <= result;
    }

    checkAlive() {
        if(this.currentHp <= 0) {
            if (this.revive) {
                this.currentHp = this.maxHp;
                this.resurect = false;
                this.dot = -25;
                this.atk = this.startingAtk + 10;
                this.currentCombat.addInfo("special", "¡" + this.name + " no se va a rendir!\n", this, null);
                this.currentCombat.addInfo("special", "¡Su furia lo mantiene en pie!\n", this, null);
            }
            else {
                this.currentHp = 0;
                this.living = false;
                this.currentCombat.hasDied(false);
                this.currentCombat.addInfo("die", 0, this, null);
            }
        }
    }

    selectAction() {
        if(this.resurect) {
            if(this.checkRevive()) {
                this.revive();
            } 
            else {
                let rand = this.getRandomInt(2);
                if(rand === 0) {
                    this.attack();
                }
                else {
                    this.areaAttack();
                }
            }
        }
        else{
            let rand = this.getRandomInt(2);
            if(this.currentHp < (this.maxHp / 3)) {
                this.second = true;
            }
            if(rand === 0) {
                this.attack();
            }
            else {
                this.areaAttack();
            }
        }
    }

    revive() {
        this.currentCombat.addInfo("special", this.name + " no deja a ningún soldado atrás.", this, null);
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            if(!this.allies[i].living) {
                this.allies[i].living = true;
                this.allies[i].heal(this.maxHp / 10);
                this.currentCombat.livingEnemies++;
            }
        }
        this.endTurn();
    }
}