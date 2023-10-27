export class Enemigo {
    id; //Identificador

    maxHp; 
    currentHp;
    atk;
    def; //Numero entre 0.01 y 1 por el cual se modifica el daño sufrido. En la representación, corresponden a 99 y 0 DEF. Se hará siempre un mínimo de 1 de daño

    critChance;

    prefType; //Tipo preferido para atacar (más posibilidades de que ataque)

    living; //Booleano para la vida, 0 si esta vivo, 1 si no
    stunned; //Booleano de aturdimiento, 1 si está aturdido 0 si no

    imgLink; //String con un link a la imagen
    
    constructor() {

    }

    stun() {
        stunned = 1;
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
            living = 1;
        }
    }

    attack(playerTeam) {
        let length = 0;
        let selecion = new Array(8);
        for(i = 0; i < playerTeam.length; i++) {
            if(playerTeam[i].type == this.prefType) {
                selecion[length] = playerTeam[i];
                length++;
            }
            selecion[length] = playerTeam;
            length++;
        }
        //genera numero aleatorio
        let target;
        //ataca
        selecion[target].sufferDamage(this.atk);
    }

    takeTurn(combatManager) {
        if(stunned === 0) {
            this.attack(combatManager.playerTeam);
        }
        else {
            stunned = 0;
        }
        combatManager.nextTurn();
    }
}