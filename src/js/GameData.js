export default class GameData {
    party;     //El equipo actual
    defeated; //Array con los ids de los enemigos que ya han sido derrotados
    objects;  //Array de objetos clave

    constructor() {
        //this.scene.add.existing(this);
        this.defeated = [];  //Array de enemigos derrotados (empieza vacío)
        this.objects = [];
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
        this.AñadeObjetoClave = function (aux) {
            console.log("tocame uwu");
            this.objects[aux].Pillado = true;
        }
        this.CheckObjetoClave = function (aux) {
            console.log(this.objects[aux].Pillado);
        }
    }

    AñadeObjetoClave(aux) {
        this.objects[aux].Pillado = true;
    }
    CheckObjetoclave(aux) {
        return this.objects[aux].Pillado; //ponle true si falla kbron
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
}