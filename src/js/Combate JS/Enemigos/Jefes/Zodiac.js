import { Enemigo } from "../Enemigo.js";
import { Acuarius } from "./Acuarius.js";

export class Judas extends Enemigo {

    numActions;
    currentZodiac;
    aoedebuff;
    debuff;

    startCombat(combatManager) {
        this.currentCombat = combatManager;
        this.allies = this.currentCombat.enemyTeam;
        this.numActions = true;
        this.currentZodiac = false;
        this.aoedebuff = 0.95;
        this.debuff = 0.9;
    }

    aries() {        
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
        this.currentCombat.addInfo("special", "Aries carga contra " + selecion[target].name + ".\n", this, null);
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        selecion[target].modifyStat(true, debuff, 1);
        selecion[target].checkAlive();
        this.checkNext();
    }

    tauro() {
        let target = this.currentCombat.playerTeam;
        this.currentCombat.addInfo("special", "Tauro crea un terremoto.\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].checkAlive();
                this.aturdir(target[i]);
            }
        }
        this.checkNext();
    }

    geminis() {
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
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        selecion[target].checkAlive();

        this.currentCombat.addInfo("special", "Géminis permite atacar de nuevo.\n", this, null);

        length = 0;
        selecion = new Array(8);
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
        target = this.getRandomInt(length);
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        selecion[target].checkAlive();

        this.checkNext();
    }

    cancer() {
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
        this.currentCombat.addInfo("special", "Cancer alza su pinza.\n");
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
        selecion[target].checkAlive();
        this.checkNext();
    }

    leo() {
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
        this.currentCombat.addInfo("special", "Leo salta sobre " + selecion[target].name + ".\n", this, null);
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        selecion[target].modifyStat(true, 1, this.debuff);
        selecion[target].checkAlive();
        this.checkNext();
    }

    virgo() {
        for(let i = 0; i < this.currentCombat.enemySize; i++) {
            let current = this.currentCombat.enemyTeam[i];
            if(current.living) {
                current.heal(Math.floor((this.maxHp / 10) + this.def));
            }
        }
        this.currentCombat.addInfo("special", "Virgo recupera a sus aliados.\n", this, null);
        this.checkNext();
    }

    libra() {
        let target = this.currentCombat.playerTeam;
        this.currentCombat.addInfo("special", "Libra juzga a sus enemigos.\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].modifyStat(true, this.aoedebuff, 1);
                target[i].checkAlive();
            }
        }
        this.checkNext();
    }

    escorpio() {
        let poison = Math.floor(this.atk / 5);
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
        this.currentCombat.addInfo("special", "Escorpio ataca con su aguijón.\n");
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        selecion[target].applyDot(poison);
        this.currentCombat.addInfo("poison", poison, this, selecion[target]);
        selecion[target].checkAlive();
        this.checkNext();
    }

    sagitario() {
        this.currentCombat.addInfo("special", "Sagitario se restaura a sí mismo.\n");
        this.heal(Math.floor((this.maxHp / 5) + this.def * 2));
        this.checkNext();
    }

    capricornio() {
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
        this.currentCombat.addInfo("special", "Capricornio embiste a " + selecion[target].name + ".\n", this, null);
        this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
        this.aturdir(selecion[target]);
        selecion[target].checkAlive();
        this.checkNext();
    }

    acuario() {
        let poison = Math.floor(this.atk / 10);
        let target = this.currentCombat.playerTeam;
        this.currentCombat.addInfo("special", "Acuario envia olas putrefactas.\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].applyDot(poison);
                this.currentCombat.addInfo("poison", poison, this, target[i]);
                target[i].checkAlive();
            }
        }
        this.checkNext();
    }

    pisces() {
        let target = this.currentCombat.playerTeam;
        this.currentCombat.addInfo("special", "Piesces engulle a sus enemigos.\n", this, null);
        for(let i = 0; i < this.currentCombat.teamSize; i++) {
            if(target[i].living) {
                this.currentCombat.addInfo("attack", target[i].sufferDamage(this.atk / 2), this, target[i]);
                target[i].modifyStat(true, 1, this.aoedebuff);
                target[i].checkAlive();
            }
        }
        this.checkNext();
    }

    checkNext() {
        this.numActions--;
        if(this.numActions == 0) {
            this.endTurn;
        }
        else {
            this.nextZodiac;
        }
    }

    nextZodiac() {
        switch (this.currentZodiac) {
            case 0:
                this.aries();
                break;
            case 1:
                this.tauro();
                break;
            case 2:
                this.geminis();
                break;
            case 3:
                this.cancer();
                break;
            case 4:
                this.leo();
                break;
            case 5:
                this.virgo();
                break;
            case 6:
                this.libra();
                break;
            case 7:
                this.escorpio();
                break;
            case 8:
                this.sagitario();
                break;
            case 9:
                this.capricornio();
                break;
            case 10:
                this.acuario();
                break;
            case 11:
                this.pisces();
                break;
            case 12:
                this.currentZodiac = 0;
                this.nextZodiac();
        }
    }

    selectAction() {
        for (let i = 0; i < this.numActions; i++) {
            this.nextZodiac()
            this.currentZodiac++;
        }
        this.endTurn();
    }

    takeTurn() {
        this.atk = this.atk * 1.05;
        this.selectAction();
    }
}