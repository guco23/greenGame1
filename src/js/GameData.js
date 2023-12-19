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
        this.items = [];
        this.party = [];
        this.allies = [];
        this.partySize = 0;
        this.NMCoins = 0; //Contador de monedas de nuevos ministerios
        let coins = this.NMCoins;

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

        this.AñadeObjetoClave = function (aux) {
            console.log("tocame uwu");
            this.objects[aux].Pillado = true;
        }
        this.CheckObjetoClave = function (aux) {
            //console.log(this.objects[aux].Pillado);
            return this.objects[aux].Pillado;
        }
        this.AñadeMonedasNM = function (aux) {
            //console.log(this.objects[aux].Pillado);
            coins = coins + aux;
        }
        this.GetMonedasNM = function () {
            //console.log(this.objects[aux].Pillado);
            return coins;
        }
        this.Interactablehitboxes = [];
        this.Interactablehitboxes[0] = false;
        this.Interactablehitboxes[1] = false;
        this.Interactablehitboxes[2] = false;
        this.Interactablehitboxes[3] = 0;
        this.Interactablehitboxes[4] = false;
    }

    //Metodos que añaden o desbloquean objetos

    AñadeObjetoClave(aux) {
        this.objects[aux].Pillado = true;
    }

    /**
     * Añade un item a la lista de items
     * @param {Item} item 
     * @returns {boolean} devuelve true si lo ha añadido y false si ya estaba y por tanto no lo ha añadido
     */
    AñadeItemEquipable(item) {
        let encontrado = this.items.includes(item);
        if (!encontrado) {
            this.items.push(item);
        }
        return encontrado;
    }

    AñadeMonedasNM(aux) {
        NMCoins = NMcoins + aux;
    }

    GetMonedasNM() {
        return this.NMCoins;
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

    /**
     * Limpia la lista de personajes derrotados. Por tanto "revive" a todos los enemigos.
     */
    VaciarListaDefeated() {
        this.defeated = [];
    }

    /**
     * Añade un personaje a los aliados comprobando si ya está (en cuyo caso no lo añade)
     * @param {*} personaje El personaje a añadir
     */
    AddCharacter(personaje) {
        if (!this.CheckCharacter(personaje)) {
            if (this.partySize < 4) {
                this.party[this.partySize] = personaje;
                this.partySize++;
            }
            this.allies.push(personaje);
        }
    }

    /**
     * Comprueba si el personaje ya está en la lista de personajes añadidos.
     * @param {*} personaje El personaje buscado
     * @returns true si el personaje está ya entre los aliados. False en caso contrario.
     */
    CheckCharacter(personaje) {
        let i = 0;
        let encontrado = false;
        while (!encontrado && i < this.allies.length) {
            if (this.allies[i].name === personaje.name) {
                encontrado = true;
            }
            i++;
        }
        return encontrado;
    }

    /**
     * Comprueba si el personaje está en la party y devuelve su índice
     * @returns El indice del personaje en la party, -1 si no está en la party
     */
    IsInParty(personaje) {
        let i = 0;
        let encontrado = false;
        while (!encontrado && i < this.party.length) {
            if (this.party[i].name === personaje.name) {
                encontrado = true;
            }
            i++;
        }
        if (encontrado)
            return i;
        else
            return -1;
    }

    /**
     * Cambia la posición de un personaje, ya sea del menu de aliados a la party o de la party por otro de la party
     * @param {*} first El índice personaje seleccionado de la party
     * @param {*} second El índice personaje seleccionado de los allies
     */
    SwapCharacter(first, second) {
        let partyIndex = this.IsInParty(this.allies[second]);
        if (partyIndex === -1) {
            this.party[first] = this.allies[second];
        } else {
            let aux = this.party[first];
            this.party[first] = this.party[second];
            this.party[second] = aux;
        }
        console.log(this.party);
    }
}