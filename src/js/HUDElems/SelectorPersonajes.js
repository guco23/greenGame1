class SelectorEnem extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        //Construye un rectángulo hasta que tengamos un sprite de flecha
        this.rect = scene.add.rectangle(x, y, 50, 50, 0xffffff);
        this.unselect();
    }

    //Cambia la visibilidad de el objeto a que no se vea
    select() {
        this.rect.visible = true;
    }

    //Cambia la visibilidad de el objeto a que si se vea
    unselect() {
        this.rect.visible = false;
    }

}

export class SelectorPersonajes extends Phaser.GameObjects.Container {
    //Necesita el array de enemigos para saber si están vivos y conocer su ubicación en la escena
    constructor(scene, personajes) {
        super(scene);
        this.selection = 0;
        //Crea las flechas
        this.opciones = [];
        for(let i = 0; i < personajes.length; i++) {
            //El metodo dependera de como sean los enemigos. Si finalmente heredan de sprite de phaser esto funcionará.
            this.opciones.push(new SelectorEnem(scene, personajes[i].x - 100, personajes[i].y));
        }
        this.opciones[this.selection].select();
        this.singleSelectionMode = true; //Indica si la selección será de un unico objetivo
    }

    /**
     * Cambia la selección de accion a la siguiente
     */
    siguiente() {
        //Condición para evitar que se salga del array
        
        if (this.singleSelectionMode && this.selection < this.opciones.length - 1) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection + 1;
            this.opciones[this.selection].select();
        }
    }

    /**
     * Cambia la selección de accion a la anterior
     */
    anterior() {
        //Condición para evitar que se salga del array
        if (this.singleSelectionMode && this.selection > 0) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection - 1;
            this.opciones[this.selection].select();
        }
    }

    /**
     * Oculta la todas las selecciones
     */
    ocultar() {
        this.opciones.forEach(element => {
            element.unselect();
        });
    }

    /**
     * Muestra la seleccion
     */
    mostrar() {
        this.opciones[this.selection].select();
    }

    /**
     * Muestra la seleccion de todos los personajes (se usa en las habilidades AOE)
     */
    fullTeamSelection() {
        for(let i = 0; i < opciones[this.selection.length]; i++) {
            this.opciones[i].select();
        }
        this.singleSelectionMode = false;
    }

    /**
     * Actualiza el selector con todos los cambios necesarios tras el final de cualquier accion (si ha muerto un personaje, etc)
     */
    update() {
        //Si un personaje esta muerto, no debe poder ser seleccionado
        this.singleSelectionMode = true;
    }

    /**
     * Muestra un unico personaje seleccionable
     * 
     * @param {El indice el personaje seleccionable} pred 
     */
    seleccionPredefinida(pred) {
        this.singleSelectionMode = false;
        this.ocultar();
        this.opciones[pred].select();        
    }

    /**Recupera el estado base de el menu y lo aculta */
    restore() {
        this.singleSelectionMode = true;
        this.ocultar();
        //TODO
    }
}