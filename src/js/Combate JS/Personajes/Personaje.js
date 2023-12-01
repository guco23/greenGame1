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

    status;     //Estado del menu del jugador: 0 es el inicial, 1 es el menú de targeteo del ataque normal, 2 es el menú de targeteo del ataque especial
    accion;     //Número entre 0 y 2. 0 es atacar, 1 especial, 2 defender.

    targetKind; //Determina el tipo de targeteo para la habilidad. 0 un enemigo, 1 un aliado, 2 todo enemigo, 3 todo aliado

    //ableToAct;  //Booleano que le da el control al jugador para que pueda meter input en su turno, en cuyo caso será 0

    imgLink;    

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

        //this.currentCombat = combatManager;
    }

    /*constructor(idn, combatManager) {
        this.name = idn.name;

        this.atk = idn.atk;
        this.def = idn.def;
        this.maxHp = idn.maxHp;
        this.currentHp = this.maxHp;

        this.escudo = 0;
        this.living = true;
        this.stunned = false;
        this.dot = 0;
        this.status = 0;
        this.accion = 0;

        this.currentCombat = combatManager;
    }*/

    applyDot(value) {
        this.dot += value;
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
        this.endTurn();
    }
    
    checkAlive() {
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
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
            this.currentHp--;
            return 1;
        }
        else {
            this.currentHp -= damage;
            return damage;
        }
        //this.checkAlive();
    }
    
    /*shiftAction(direction) {
        if(direction < 0 && this.action > 0) {
            this.action--;
        }
        else if (direction > 0 && this.accion < 2) {
            this.action++;
        }
    }*/

    attack(target) {
        //this.ableToAct = false;
        let myTarget = this.currentCombat.enemyTeam[target];
        this.currentCombat.addInfo("attack", myTarget.sufferDamage(this.atk), this, myTarget);
        myTarget.checkAlive();
        this.endTurn();
    }

    /*selectAction() {
        if(this.accion === 0) {
            this.status = 1;
            this.currentCombat.setTarget(false, false);
        }
        else if (this.accion === 1) {
            this.status = 2;
        }
        else if (this.accion === 2) {
            //this.ableToAct = false;
            this.gainShield(this.def * 100);
            this.currentCombat.changeSp(1);
            this.endTurn();
        }
    }*/

    special(target) {
        //Definido en subclases
    }

    takeTurn() {
        if(this.stunned === true) {
            this.stunned = false;
            combatManager.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
/*
    eventHandler(event) {
        if(this.ableToAct === true) {
            if(this.status === 0) {
                if(event === 'up') {
                    this.shiftAction(-1);
                }
                else if(event === 'down') {
                    this.shiftAction(1);
                }
                else if(event === 'select') {
                    this.selectAction();
                }
            }   
            else if(this.status === 1) {
                if(event === 'right') {
                    this.currentCombat.shiftTarget(1);
                }
                else if(event === 'left') {
                    this.currentCombat.shiftTarget(-1);
                }
                else if(event === 'select') {
                    this.attack();
                }
                else if (event === 'back') {
                    this.status === 0;
                }
            }      
            else if(this.status === 2) {
                if (event === 'back') {
                    this.status === 0;
                }
            }
        }
    }
    */
}