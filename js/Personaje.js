export class Personaje {
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

    status; //Estado del menu del jugador: 0 es el inicial, 1 es el menú de targeteo del ataque normal, 2 es el menú de targeteo del ataque especial
    accion; //Número entre 0 y 2. 0 es atacar, 1 especial, 2 defender;

    shiftAction(direction) {
        if(direction < 0 && this.staus > 0) {
            this.status--;
        }
        else if (direction > 0 && this.status < 2) {
            this.status++;
        }
    }

    takeTurn(combatManager) {
        if(stunned === 0) {
            //Como esperar un input????
        }
        else {
            stunned = 0;
            combatManager.nextTurn();
        }
    }
}