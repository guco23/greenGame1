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



    takeTurn() {
        if(stunned === 0) {

        }
        else {
            stunned = 0;
        }
    }
}