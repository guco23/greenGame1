import { Enemigo } from "./Enemigo.js";

export class Aturdidor extends Enemigo {
    
    aturdir(target) {
        let chance = getRandomInt(100);
        if (chance < Math.floor((target.currentHp / target.maxHp) * 100)) {
            target.stun();
        }
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
        let target = this.getRandomInt(length);
        //En target se genera un número aleatorio
        console.log(selecion[target].name);
        if(this.getCrit()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
            this.currentCombat.addInfo("crit", 0, this, null);
            selecion[target].stun();
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
            this.aturdir(selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }
}