class SelectorEnem extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        //Construye un rectángulo hasta que tengamos un sprite de flecha
        this.rect = scene.add.rectangle(x, y, 50, 50, 0xffffff);
        this.unselect();
    }

    selected() {
        this.rect.visible = true;
    }

    unselect() {
        this.rect.visible = false;
    }

}

export class SelectorEnemigos extends Phaser.GameObjects.Container {
    //Necesita el array de enemigos para saber si están vivos y conocer su ubicación en la escena
    constructor(scene, enemigos) {
        super(scene);
        this.selection = 0;
        //Crea las flechas
        this.opciones = [];
        for(let i = 0; i < enemigos.length; i++) {
            //El metodo dependera de como sean los enemigos. Si finalmente heredan de sprite de phaser esto funcionará.
            this.opciones.push(new SelectorEnem(scene, enemigos[i].x - 100, enemigos[i].y));
        }
        this.select();
    }

    /**
     * Marca el enemigo como seleccionado. Metodo solo para usar desde la clase
     */
    select() {
        this.opciones[this.selection].selected();
    }

    /**
     * Cambia la selección de accion a la siguiente
     */
    siguiente() {
        //Condición para evitar que se salga del array
        
        if (this.selection < this.opciones.length - 1) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection + 1;
            this.select();
        }
    }

    /**
     * Cambia la selección de accion a la anterior
     */
    anterior() {
        //Condición para evitar que se salga del array
        if (this.selection > 0) {
            this.opciones[this.selection].unselect();
            this.selection = this.selection - 1;
            this.select();
        }
    }

    /**
     * Oculta la UI de las acciones
     */
    ocultar() {
        this.visible = false;
    }

    /**
     * Muestra la UI de las acciones
     */
    mostrar() {
        this.visible = true;
    }

}