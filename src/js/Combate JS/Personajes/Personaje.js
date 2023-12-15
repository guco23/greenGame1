export class Personaje {
    name;

    personality;

    maxHp;
    currentHp;

    //Parámetros de combate.

    atk;
    def;

    escudo;     //Valor que sirve como vida extra. Tiene como máximo maxHp;

    living;     //Booleano para la vida
    stunned;    //Booleano de aturdimiento

    dot;        //Valor del daño por veneno y eso

    //Cosas de flujo de combate y eventos

    currentCombat;

    targetKind; //Determina el tipo de targeteo para la habilidad. 0 un enemigo, 1 un aliado, 2 todo enemigo, 3 todo aliado

    //ableToAct;  //Booleano que le da el control al jugador para que pueda meter input en su turno, en cuyo caso será 0

    imgLink; //La imagen del personaje durante el combate
    idleImageLink; //La imagen del personaje en el menú de selección

    /*
    constructor(namer, attk, defs, hpMax, hp) {
        this.name = namer;
        
        this.atk = attk;
        this.def = (100 - defs) / 100;
        this.maxHp = hpMax;
        this.currentHp = hp;

        this.escudo = 0;
        this.living = true;
        this.stunned = false;
        this.dot = 0;
        this.status = 0;
        this.accion = 0;

        this.targetKind = 0;

        this.personality = "Green";
    }*/
  
    constructor(idn) {
        this.name = idn.name;

        this.atk = idn.atk;
        this.def = (100 - idn.def) / 100;
        this.maxHp = idn.maxHp;
        this.currentHp = idn.maxHp;
        this.imgLink = idn.imgLink;
        this.idleImageLink = idn.idleImageLink;
        this.escudo = 0;
        this.living = true;
        this.stunned = false;
        this.dot = 0;
        this.personality = idn.personality;

    }

    applyDot(value) {
        this.dot += value;
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
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    stun() {
        this.stunned = true;
        this.currentCombat.addInfo("stunned", 0, this, null);
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }

    endTurn() {
        if(this.dot != 0) {
            this.currentHp -= this.dot;
            this.currentCombat.addInfo("dot", this.dot, this, null);
            this.checkAlive();    
        }
        this.status = 0;
        this.accion = 0;
        this.currentCombat.endTurn();
    }
    
    gainShield(shield) {
        if(this.escudo + shield > this.maxHp) {
            this.currentCombat.addInfo("defend", this.maxHp - this.escudo, this, null);
            this.escudo = this.maxHp;
        }
        else {
            this.currentCombat.addInfo("defend", shield, this, null);
            this.escudo += shield;
        }
    }
    
    checkAlive() {
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
            this.currentCombat.hasDied(true);
            this.currentCombat.addInfo("die", 0, this, null);
        }
    }

    heal(heal) {
        this.currentHp += heal;
        if(this.currentHp > this.maxHp) {
            this.currentHp = this.maxHp;
        }
    }

    sufferDamage(dmg) {
        let damage = Math.floor(dmg * this.def)
        if(damage < 1) {
            if(this.escudo > 0) {
                this.escudo--;
            }
            else {
                this.currentHp--;
            }
            return 1;
        }
        else {
            if(this.escudo > 0) {
                this.escudo -= damage;
                if(this.escudo < 0) {
                    this.currentHp -= this.escudo;
                    this.escudo = 0;
                }
            }
            else{
                this.currentHp -= damage;
            }
            return damage;
        }
    }

    attack(target) {
        //this.ableToAct = false;
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk), this, myTarget);
        myTarget.checkAlive();
        this.endTurn();
    }

    special(target) {
        //Definido en subclases
    }

    defend() {
        this.gainShield(this.def);
        this.endTurn();
    }

    takeTurn() {
        if(this.stunned === true) {
            this.stunned = false;
            combatManager.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
}