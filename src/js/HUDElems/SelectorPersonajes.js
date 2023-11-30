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

const Estados = {
    SELECCION_INDIVIDUAL: "seleccion_individual", //Puede seleccionar el objetivo que quiera
    SELECCION_PREDEFINIDA: "seleccion_predefinida", //Un objetivo queda marcado y sólo puede seleccionar ese
    SELECCION_COMPLETA: "seleccion_completa" //Se muestra la seleccion del equipo aliado entero
}

export class SelectorPersonajes extends Phaser.GameObjects.Container {
    //Necesita el array de personajes para saber si están vivos y conocer su ubicación en la escena
    constructor(scene, personajes, imgs) {
        super(scene);
        this.estado = Estados.SELECCION_INDIVIDUAL;
        this.selection = 0;
        this.personajes = personajes;
        this.imgs = imgs;
        this.scene = scene;
        //Crea las flechas
        this.opciones = [];
        this.refresh();
        this.opciones[this.selection].select();

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
     * Destruye todas las flechitas anteriores y las vuelve a crear asegurandose de que no pone una en los personajes muertos
     */
    refresh() {
        //Elimina los que ya están creados
        for (let i = 0; i < this.opciones.length; i++) {
            this.opciones[i].destroy();
        }
        //Crea los nuevos elementos
        this.opciones = [];
        //Indica si el personaje de la selección actual está muerto, en cuyo caso debería dejar de estar seleccionado
        let selectionDied = !this.personajes[this.selection].living;
        for (let i = 0; i < this.imgs.length; i++) {
            //El metodo dependera de como sean los enemigos. Si finalmente heredan de sprite de phaser esto funcionará.
            if (this.personajes[i].living) {
                this.opciones[i] = new SelectorEnem(this.scene, this.imgs[i].x - 100, this.imgs[i].y);
                if(selectionDied) {
                    this.selection = i;
                }
            }
        }
    }

    seleccionNormal() {
        this.estado = Estados.SELECCION_INDIVIDUAL;
        this.ocultar();
        this.mostrar();
    }

    seleccionCompleta() {
        this.estado = Estados.SELECCION_COMPLETA;
        for(let i; i < this.opciones.length; i++) {
            this.opciones[i].select();
        }
    }

    seleccionPredefinida(selec) {
        this.estado = Estados.SELECCION_PREDEFINIDA;
        this.ocultar();
        this.selection = selec;
        this.mostrar();
    }
}