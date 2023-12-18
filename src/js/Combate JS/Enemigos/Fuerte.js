import { Enemigo } from "./Enemigo.js";

export class Fuerte extends Enemigo {
    strongAttack() {
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
        console.log(rand);
        if(this.currentHp < (this.maxHp / 2)) {
            console.log("balls");
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