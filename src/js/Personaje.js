export class Personaje {
    name;
    id;

    baseHp;
    baseAtk;
    baseDef;

    maxHp;
    currentHp;
    
    equipAtk;
    equipDef;

    atk;
    def;

    escudo;

    living; //Booleano para la vida, 0 si esta vivo, 1 si no
    stunned; //Booleano de aturdimiento, 1 si está aturdido 0 si no

    //Cosas de flujo de combate y eventos

    currentCombat;

    status; //Estado del menu del jugador: 0 es el inicial, 1 es el menú de targeteo del ataque normal, 2 es el menú de targeteo del ataque especial
    accion; //Número entre 0 y 2. 0 es atacar, 1 especial, 2 defender;

    targetKind; //Determina el tipo de targeteo para la habilidad. 0 un enemigo, 1 un aliado, 2 todo enemigo, 2 todo aliado

    ableToAct; //Booleano que le da el control al jugador para que pueda meter input en su turno, en cuyo caso será 0

    endTurn() {

    }

    gainShield(shield) {
        this.escudo += shield;
    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }

    shiftAction(direction) {
        if(direction < 0 && this.action > 0) {
            this.action--;
        }
        else if (direction > 0 && this.accion < 2) {
            this.action++;
        }
    }

    selectAction() {
        if(this.accion === 0) {

        }
        else if (this.accion === 1) {

        }
        else if (this.accion === 2) {
            this.gainShield(def * 100);
        }
    }

    takeTurn(combatManager) {
        if(stunned === 0) {
            ableToAct = 0;
        }
        else {
            stunned = 0;
            combatManager.nextTurn();
        }
    }

    eventHandler(event) {
        if(this.ableToAct === 0) {
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

            }      
            else if(this.status === 2) {

            }
        }
    }
}