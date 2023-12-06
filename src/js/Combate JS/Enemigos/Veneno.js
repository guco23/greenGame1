import { Enemigo } from "./Enemigos/Enemigo.js";

export class Veneno extends Enemigo {
    poison; //Valor de veneno que aplica al atacar

    constructor(idn, combatManager) {
        super(idn, combatManager);
        this.aplicarDot = this.atk / 5;
    }

    attack(playerTeam) {
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
        let target = 0;
        //En target se genera un número aleatorio
        console.log(selecion[target].name);
        if(this.critChance()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
            selecion[target].applyDot(poison * 3);
            this.currentCombat.addInfo("poison", poison * 3, this, selecion[target]);
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
            selecion[target].applyDot(poison);
            this.currentCombat.addInfo("poison", poison, this, selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }
}