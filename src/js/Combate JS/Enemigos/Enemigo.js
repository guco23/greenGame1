export class Enemigo {
    name; //Identificador

    maxHp; 
    currentHp;
    atk;
    def; //Numero entre 0.01 y 1 por el cual se modifica el daño sufrido. En la representación, corresponden a 99 y 0 DEF. Se hará siempre un mínimo de 1 de daño

    critChance; //No me acuerdo de haber puesto esto aquí lol. Mejor lo dejamos para una subclase

    prefType; //Tipo preferido para atacar (más posibilidades de que ataque)

    living; //Booleano para la vida, true si esta vivo, false si no
    stunned; //Booleano de aturdimiento, true si está aturdido false si no

    currentCombat;

    dot;

    imgLink; //String con un link a la imagen
    
    applyDot(value) {
        this.dot += value;
    }

    checkAlive() {
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
            this.currentCombat.hasDied(false);
            this.currentCombat.addInfo("die", 0, this, null);
        }
    }

    constructor(idn) {
        this.name = idn.name;
        this.maxHp = idn.maxHp;
        this.currentHp = idn.maxHp;
        this.atk = idn.atk;
        this.def = idn.def;
        this.prefType = idn.prefType;
        this.imgLink = idn.imgLink;

        this.living = true;
        this.stunned = false;
        this.dot = 0;
        this.critChance = idn.crit;
    }

    
    modifyStat(mode, atkmod, defmod) {
        if (mode) {
            this.atk = this.atk * atkmod;
            this.def = this.def * defmod;
        }
        else {
            this.atk += atkmod;
            this.def += defmod;
        }
        if(this.def >= 100) {
            this.def = 99;
        }
        if(this.def < 1) {
            this.def = 1;
        }
        if(this.atk < 1) {
            this.atk = 1;
        }
    }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    getCrit() {
        let crit = this.getRandomInt(100);
        return (crit < this.critChance);
    }
    
    
    endTurn() {
        if(this.dot != 0) {
            this.currentHp -= this.dot;
            this.currentCombat.addInfo("dot", this.dot, this, null);
            this.checkAlive(); 
        }
        this.currentCombat.endTurn();
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }
    
    stun() {
        this.stunned = true;
        this.currentCombat.addInfo("stunned", 0, this, null);
    }
    
    sufferDamage(dmg) {
        let damage = Math.floor(dmg * ((100 - this.def) / 100));
        if(damage < 1) {
            this.currentHp--;
            return 1;
        }
        else {
            this.currentHp -= damage;
            return damage;
        }
    }
    
    heal(heal) {
        this.currentHp += heal;
        if(this.currentHp > this.maxHp) {
            this.currentHp = this.maxHp;
        }
    }

    //Mover a cada enemigo individual
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
        if(this.getCrit()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
            this.currentCombat.addInfo("crit", 0, this, null);
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }

    takeTurn() {
        if(this.stunned === false) {
            this.attack();
        }
        else {
            this.stunned = false;
            this.currentCombat.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
}