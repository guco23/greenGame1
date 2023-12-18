export default class GameData {
    party; //Los personajes activos, sólo puede haber cuatro
    partySize; //Indica el tamaño de la party
    defeated; //Array con los ids de los enemigos que ya han sido derrotados
    objects;  //Array de objetos clave
    allies; //Todos los personajes desbloqueados, se irán añadiendo según progrese el juego
    
    constructor() {
        //this.scene.add.existing(this);
        this.defeated = [];  //Array de enemigos derrotados (empieza vacío)
        this.objects = [];
        this.itemsEquip = [];
        this.party = [];
        this.allies = [];
        this.partySize = 0;
        this.NMCoins = 0; //Contador de monedas de nuevos ministerios

        this.objects[0] = {
            'Nombre': "Nota1",
            'Pillado': false,
        };
        this.objects[1] = {
            'Nombre': "Nota2",
            'Pillado': false,
        };
        this.objects[2] = {
            'Nombre': "Nota3",
            'Pillado': false,
        };
        this.objects[3] = {
            'Nombre': "ValeCajaFuerte",
            'Pillado': false,
        };
        this.objects[4] = {
            'Nombre': "CajaDeHerramientas",
            'Pillado': false,
        };
        this.objects[5] = {
            'Nombre': "Madera",
            'Pillado': false,
        };
        this.objects[6] = {
            'Nombre': "PlanosPuente",
            'Pillado': false,
        };
        this.objects[7] = {
            'Nombre': "BilleteTren1",
            'Pillado': false,
        };
        this.objects[8] = {
            'Nombre': "BilleteTren2",
            'Pillado': false,
        };

        //Objetos equipables
        //Madera
        this.itemsEquip[0] = {
            'Nombre': "Escudo de madera",
            'Descripcion': "Aumenta la vida y el daño en 35 y 15 puntos respectivamente",
            'VidaEx': 35,
            'AtaqEx': 15,
            'Pillado': false,
        }
        this.itemsEquip[1] = {
            'Nombre': "Guante de cuero",
            'Descripcion': "Aumenta la vida y el daño en 15 y 35 puntos respectivamente",
            'VidaEx': 15,
            'AtaqEx': 35,
            'Pillado': false,
        }
        this.itemsEquip[2] = {
            'Nombre': "Chaleco de cuero",
            'Descripcion': "Aumenta la vida y el daño en 30 puntos",
            'VidaEx': 30,
            'AtaqEx': 30,
            'Pillado': false,
        }
        this.itemsEquip[3] = {
            'Nombre': "Armadura de madera",
            'Descripcion': "Aumenta la vida y el daño en 45 puntos",
            'VidaEx': 45,
            'AtaqEx': 45,
            'Pillado': false,
        }
        //Bronce
        this.itemsEquip[4] = {
            'Nombre': "Escudo de bronce",
            'Descripcion': "Aumenta la vida y el daño en 45 y 25 puntos respectivamente",
            'VidaEx': 45,
            'AtaqEx': 25,
            'Pillado': false,
        }
        this.itemsEquip[5] = {
            'Nombre': "Guante de cuero +",
            'Descripcion': "Aumenta la vida y el daño en 25 y 45 puntos respectivamente",
            'VidaEx': 25,
            'AtaqEx': 45,
            'Pillado': false,
        }
        this.itemsEquip[6] = {
            'Nombre': "Chaleco de bronce",
            'Descripcion': "Aumenta la vida y el daño en 35 puntos",
            'VidaEx': 35,
            'AtaqEx': 35,
            'Pillado': false,
        }
        this.itemsEquip[7] = {
            'Nombre': "Armadura de bronce",
            'Descripcion': "Aumenta la vida y el daño en 45 puntos",
            'VidaEx': 45,
            'AtaqEx': 45,
            'Pillado': false,
        }
        //Hierro
        this.itemsEquip[8] = {
            'Nombre': "Escudo de hierro",
            'Descripcion': "Aumenta la vida y el daño en 65 y 35 puntos respectivamente",
            'VidaEx': 65,
            'AtaqEx': 35,
            'Pillado': false,
        }
        this.itemsEquip[9] = {
            'Nombre': "Guante de hierro",
            'Descripcion': "Aumenta la vida y el daño en 35 y 65 puntos respectivamente",
            'VidaEx': 35,
            'AtaqEx': 65,
            'Pillado': false,
        }
        this.itemsEquip[10] = {
            'Nombre': "Chaleco de hierro",
            'Descripcion': "Aumenta la vida y el daño en 50 puntos",
            'VidaEx': 50,
            'AtaqEx': 50,
            'Pillado': false,
        }
        this.itemsEquip[11] = {
            'Nombre': "Armadura de hierro",
            'Descripcion': "Aumenta la vida y el daño en 45 puntos",
            'VidaEx': 65,
            'AtaqEx': 65,
            'Pillado': false,
        }
        //Diamante
        this.itemsEquip[12] = {
            'Nombre': "Escudo de diamante",
            'Descripcion': "Aumenta la vida y el daño en 85 y 55 puntos respectivamente",
            'VidaEx': 85,
            'AtaqEx': 55,
            'Pillado': false,
        }
        this.itemsEquip[13] = {
            'Nombre': "Guante de diamante",
            'Descripcion': "Aumenta la vida y el daño en 55 y 85 puntos respectivamente",
            'VidaEx': 55,
            'AtaqEx': 85,
            'Pillado': false,
        }
        this.itemsEquip[14] = {
            'Nombre': "Chaleco de diamante",
            'Descripcion': "Aumenta la vida y el daño en 70 puntos",
            'VidaEx': 70,
            'AtaqEx': 70,
            'Pillado': false,
        }
        this.itemsEquip[15] = {
            'Nombre': "Armadura de diamante",
            'Descripcion': "Aumenta la vida y el daño en 100 puntos",
            'VidaEx': 100,
            'AtaqEx': 100,
            'Pillado': false,
        }

        this.AñadeObjetoClave = function (aux) {
            console.log("tocame uwu");
            this.objects[aux].Pillado = true;
        }
        this.CheckObjetoClave = function (aux) {
            console.log(this.objects[aux].Pillado);
        }
        this.Interactablehitboxes = [];
        this.Interactablehitboxes[0] = false;
        this.Interactablehitboxes[1] = false;
        this.Interactablehitboxes[2] = false;
    }

    //Metodos que añaden o desbloquean objetos

    AñadeObjetoClave(aux) {
        this.objects[aux].Pillado = true;
    }

    AñadeItemEquipable(aux) {
        this.itemsEquip[aux].Pillado = true;
    }

    AñadeMonedasNM() {
        this.NMCoins++;
    }

    //Metodos que comprueban estado de los objetos

    CheckObjetoClave(aux) {
        return this.objects[aux].Pillado;
    }

    CheckItemEquipable(aux) {
        return this.itemsEquip[aux].Pillado;
    }

    CheckMonedasNM(aux) {
        return this.NMCoins > aux;
    }

    //Método provisional para meter equipo en gameData
    SetParty(party) {
        this.party = party;
    }

    /**
     * Tras derrotar a un enemigo, se añade su id en la lista para no ser regenerado
     * @param {El id del slime derrotado} id 
     */
    AddDefeated(id) {
        this.defeated.push(id);
    }

    /**
     * Busca si el slime ha sido derrotado a partir de su id
     * 
     * @param {string} id - el id del slime a buscar 
     * @returns true si ha encontrado que el slime fue derrotado
     */
    CheckDefeated(id) {
        let i = 0;
        let encontrado = false;
        while (!encontrado && i < this.defeated.length) {
            if (this.defeated[i] === id)
                encontrado = true;
            i++;
        }
        return encontrado;
    }

    VaciarListaDefeated() {
        this.defeated = [];
    }
    
    AddCharacter(personaje) {
        if(this.partySize < 4) {
            this.party[this.partySize] = personaje;
            this.partySize++;
        }
        this.allies.push(personaje);
        console.log(this.allies);
    }
}