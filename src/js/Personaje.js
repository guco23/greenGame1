export class Personaje {
    name;
    id;

    maxHp;
    currentHp;

    //Parámetros de combate.

    atk;
    def;

    escudo; //Valor que sirve como vida extra. Tiene como máximo maxHp;

    living; //Booleano para la vida
    stunned; //Booleano de aturdimiento

    dot; //Valor del daño por veneno y eso

    //Cosas de flujo de combate y eventos

    currentCombat;

    status; //Estado del menu del jugador: 0 es el inicial, 1 es el menú de targeteo del ataque normal, 2 es el menú de targeteo del ataque especial
    accion; //Número entre 0 y 2. 0 es atacar, 1 especial, 2 defender;

    //targetKind; //Determina el tipo de targeteo para la habilidad. 0 un enemigo, 1 un aliado, 2 todo enemigo, 2 todo aliado
    //Probablemente este parámetro no sea necesario una vez tengamos los heredados pero lo dejo porque a lo mejor nos puede resultar útil en terminos generales por ahora.

    ableToAct; //Booleano que le da el control al jugador para que pueda meter input en su turno, en cuyo caso será 0

    constructor(namer, iden, attk, defs, hpMax, hp, combatManager) {
        this.name = namer;
        this.id = iden;

        this.atk = attk;
        this.def = defs;
        this.maxHp = hpMax;
        this.currentHp = hp;

        this.escudo = 0;
        this.living = true;
        this.stunned = false;
        this.dot = 0;
        this.status = 0;
        this.accion = 0;

        this.currentCombat = combatManager;
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }
    
    gainShield(shield) {
        this.escudo += shield;
        if(this.escudo > this.maxHp) {
            this.escudo = this.maxHp;
        }
    }
    
    checkAlive() {
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
        }
    }
    
    endTurn() {
        this.currentHp -= this.dot;
        this.checkAlive();    
        this.status = 0;
        this.accion = 0;
        return;
    }

    heal(heal) {
        this.currentHp += heal;
        if(this.currentHp > this.maxHp) {
            this.currentHp = this.maxHp;
        }
    }

    sufferDamage(dmg) {
        if(dmg * this.def < 1) {
            this.currentHp--;
        }
        else {
            this.currentHp -= Math.floor(dmg * this.def);
        }
        this.checkAlive();
    }
    
    shiftAction(direction) {
        if(direction < 0 && this.action > 0) {
            this.action--;
        }
        else if (direction > 0 && this.accion < 2) {
            this.action++;
        }
    }

    attack() {
        this.ableToAct = false;
        this.currentCombat.enemyTeam[this.currentCombat.target].sufferDamage(this.atk);
        this.endTurn();
        return;
    }

    selectAction() {
        if(this.accion === 0) {
            this.status = 1;
            this.currentCombat.setTarget(false, false);
        }
        else if (this.accion === 1) {
            this.status = 2;
        }
        else if (this.accion === 2) {
            this.ableToAct = false;
            this.gainShield(this.def * 100);
            this.currentCombat.changeSp(1);
            this.endTurn();
        }
    }

    takeTurn() {
        if(this.stunned === false) {
            this.ableToAct = true;
        }
        else {
            this.stunned = false;
            this.endTurn();
        }
    }

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
}