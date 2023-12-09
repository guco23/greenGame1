class Selector extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {La ecena en la que se va a pintar} scene 
     * @param {La posición sobre x} x 
     * @param {La posición sobre y} y 
     * @param {El índice del personaje en el array de personajes} indic 
     */
    constructor(scene, x, y, indic) {
        super(scene);
        //Construye un rectángulo hasta que tengamos un sprite de flecha
        this.rect = scene.add.rectangle(x, y, 50, 50, 0xffffff);
        this.unselect();
        //El indice en el array de personajes del personaje que señala este selector
        this.indPersAsociado = indic;
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

const Estados = {
    SELECCION_INDIVIDUAL: "seleccion_individual", //Puede seleccionar el objetivo que quiera
    SELECCION_PREDEFINIDA: "seleccion_predefinida", //Un objetivo queda marcado y sólo puede seleccionar ese
    SELECCION_COMPLETA: "seleccion_completa" //Se muestra la seleccion del equipo aliado entero
}

export class SelectorPersonajes extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {La ecena en la que se va a pintar} scene 
     * @param {El array de personajes} personajes 
     * @param {Las imagenes de los personajes, si finalmente los personajes como tal tienen sprite esto no va aquí} imgs 
     */
    constructor(scene, personajes, arrayImgs) {
        super(scene);
        this.estado = Estados.SELECCION_INDIVIDUAL;
        this.selection = 0;
        this.personajes = personajes;
        this.arrayImgs = arrayImgs;
        this.scene = scene;
        //Crea las flechas
        this.refresh();
    }

    /**
     * Cambia la selección de accion a la siguiente
     */
    siguiente() {
        //Condición para evitar que se salga del array
        if (this.estado == Estados.SELECCION_INDIVIDUAL && this.selection < this.opciones.length - 1) {
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
        if (this.estado == Estados.SELECCION_INDIVIDUAL && this.selection > 0) {
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
     * Actualización a llamar al final de cada turno para actualizar los selectores a mostrar
     */
    refresh() {
        this.opciones = [];
        for (let i = 0; i < this.arrayImgs.length; i++) {
            //Sólo crea flechas para los personajes que estén vivos
            if (this.personajes[i].living) {
                this.opciones.push(new Selector(this.scene, this.arrayImgs[i].img.x - 50, this.arrayImgs[i].img.y + this.arrayImgs[i].img.displayHeight / 2, i));}
        }
        //Evita que el selector quede en un una selección indefinida
        if(this.opciones[this.selection] === undefined) {
            this.selection = 0;
        }
    }

    /**
     * Aplica el modo de selección de un único personaje típico
     */
    seleccionNormal() {
        this.estado = Estados.SELECCION_INDIVIDUAL;
        this.ocultar();
        this.mostrar();
    }

    /**
     * Aplica un modo de selección de todos los personajes a la vez (para los AOE)
     */
    seleccionCompleta() {
        this.estado = Estados.SELECCION_COMPLETA;
        for (let i; i < this.opciones.length; i++) {
            this.opciones[i].select();
        }
    }

    /**
     * Aplica un modo de selección de personaje que ya viene predefinido y el jugador no puede cambiar (ej. defensa)
     * @param {El índice del elemento que será seleccionados} selec 
     */
    seleccionPredefinida(selec) {
        this.estado = Estados.SELECCION_PREDEFINIDA;
        this.ocultar();
        this.selection = selec;
        this.mostrar();
    }

    /**Devuelve el índice en el array de personajes del personaje seleccionado */
    getSelection() {
        return this.opciones[this.selection].indPersAsociado;
    }
}