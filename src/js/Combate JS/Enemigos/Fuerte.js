import { Enemigo } from "./Enemigo.js";

export class Fuerte extends Enemigo {
    strongAttack() {
        let length = 0;
        console.log(playerTeam[0].name);
        let selecion = new Array(8);
        for(let i = 0; i < playerTeam.length; i++) {
            if(playerTeam[i].living) {
                if(playerTeam[i].personality === this.prefType) {
                    selecion[length] = playerTeam[i];
                    length++;
                }
                selecion[length] = playerTeam[i];
                console.log(playerTeam[i].name + " " + selecion[length].name);
                length++;
            }
        }
        let target = this.getRandomInt(length);
        //En target se genera un número aleatorio
        console.log(selecion[target].name);
        if(this.getCrit()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 6), this, selecion[target]);
            this.currentCombat.addInfo("crit", 0, this, null);
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 2), this, selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }

    selectAction() {
        let rand = this.getRandomInt(3);
        if(this.currentHP < this.maxHp / 2) {
            if(rand === 0) {
                this.attack();
            }
            else {
                this.strongAttack();
            }
        }
        else {
            if(rand === 2) {
                this.strongAttack();
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