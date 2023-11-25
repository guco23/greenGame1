export class Enemigo {
    name; //Identificador

    maxHp; 
    currentHp;
    atk;
    def; //Numero entre 0.01 y 1 por el cual se modifica el daño sufrido. En la representación, corresponden a 99 y 0 DEF. Se hará siempre un mínimo de 1 de daño

    //critChance; No me acuerdo de haber puesto esto aquí lol. Mejor lo dejamos para una subclase

    prefType; //Tipo preferido para atacar (más posibilidades de que ataque)

    living; //Booleano para la vida, true si esta vivo, false si no
    stunned; //Booleano de aturdimiento, true si está aturdido false si no

    currentCombat;

    dot;

    imgLink; //String con un link a la imagen
    
    /*constructor(iden, hpMax, atk, def, type, iLink, combatManager) {
        this.id = iden;
        this.maxHp = hpMax;
        this.currentHp = this.maxHp;
        this.atk = atk;
        this.def = def;
        this.prefType = type;
        this.imgLink = iLink;

        this.living = true;
        this.stunned = false;

        this.currentCombat = combatManager;
    }*/

    constructor(idn, combatManager) {
        this.id = idn.name;
        this.maxHp = idn.maxHp;
        this.currentHp = idn.hpMax;
        this.atk = idn.atk;
        this.def = (100 - idn.def) / 100;
        this.prefType = idn.type;
        this.imgLink = idn.imgLink;

        this.living = true;
        this.stunned = false;

        this.currentCombat = combatManager;
    }

    /*startCombat(combatManager) {
        this.currentCombat = combatManager;
    }*/

    critChance() {

    }

    checkAlive() {
        if(this.currentHp <= 0) {
            this.currentHp = 0;
            this.living = false;
            this.currentCombat.addInfo("die", 0, this, null);
        }
    }

    endTurn() {
        if(this.dot != 0) {
            this.currentHp -= this.dot;
            this.currentCombat.addInfo("dot", this.dot, this, null);
            this.checkAlive(); 
        }
        this.currentCombat.endTurn();
    }

    stun() {
        this.stunned = true;
    }

    sufferDamage(dmg) {
        let damage = Math.floor(dmg * this.def);
        if(damage < 1) {
            this.currentHp--;
            return 1;
        }
        else {
            this.currentHp -= damage;
            return damage;
        }
    }

    //Mover a cada enemigo individual
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
        if(this.critChance()) {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk * 3), this, selecion[target]);
            selecion[target].checkAlive();
        }
        else {
            this.currentCombat.addInfo("attack", selecion[target].sufferDamage(this.atk), this, selecion[target]);
            selecion[target].checkAlive();
        }
        this.endTurn();
    }

    takeTurn(combatManager) {
        if(stunned === false) {
            this.attack(combatManager.playerTeam);
        }
        else {
            stunned = false;
            combatManager.addInfo("stun", 0, this,  null);
            this.endTurn();
        }
    }
}