import { Enemigo } from "./Enemigo.js";

export class Veneno extends Enemigo {
    poison; //Valor de veneno que aplica al atacar

    constructor(idn, combatManager) {
        super(idn, combatManager);
        this.poison = Math.floor(this.atk / 5);
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
        let target =  this.getRandomInt(length);
        if(this.getCrit()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
            selecion[target].applyDot(this.poison * 3);
            this.currentCombat.addInfo("poison", this.poison * 3, this, selecion[target]);
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
            selecion[target].applyDot(this.poison);
            this.currentCombat.addInfo("poison", this.poison, this, selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }
}