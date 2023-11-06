export class Enemigo {
    id; //Identificador

    maxHp; 
    currentHp;
    atk;
    def; //Numero entre 0.01 y 1 por el cual se modifica el daño sufrido. En la representación, corresponden a 99 y 0 DEF. Se hará siempre un mínimo de 1 de daño

    critChance;

    prefType; //Tipo preferido para atacar (más posibilidades de que ataque)

    living; //Booleano para la vida, true si esta vivo, false si no
    stunned; //Booleano de aturdimiento, true si está aturdido false si no

    currentCombat;

    imgLink; //String con un link a la imagen
    
    constructor() {

    }

    startCombat(combatManager) {
        this.currentCombat = combatManager;
    }

    endTurn() {
        combatManager.nextTurn();
    }

    stun() {
        stunned = true;
    }

    sufferDamage(dmg) {
        if(dmg * def < 1) {
            this.currentHp--;
        }
        else {
            this.currentHp -= Math.floor(dmg * this.def);
        }
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            living = false;
        }
    }

    attack(playerTeam) {
        let length = 0;
        let selecion = new Array(8);
        for(i = 0; i < playerTeam.length; i++) {
            if(playerTeam[i].living) {
                if(playerTeam[i].type === this.prefType) {
                    selecion[length] = playerTeam[i];
                    length++;
                }
                selecion[length] = playerTeam;
                length++;
            }
        }
        let target;
        //En target se genera un número aleatorio
        selecion[target].sufferDamage(this.atk);
        //Animación, llamada a evento y llamada posterior a acabar turno. Por ahora hago llamada directa por falta de animaciones
        this.endTurn();
    }

    takeTurn(combatManager) {
        if(stunned === false) {
            this.attack(combatManager.playerTeam);
        }
        else {
            stunned = false;
            this.endTurn();
        }
    }
}