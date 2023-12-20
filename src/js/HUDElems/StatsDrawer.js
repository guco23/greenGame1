class Drawer extends Phaser.GameObjects.Container {
    constructor(scene, personajeMenu, padY, x, y) {
        super(scene);
        var style = { wordWrap: {width:100}}; //Para que el nombre del objeto no desborde
        this.textHp = scene.add.text(x, y + padY, "");
        this.textAtk = scene.add.text(x, y + padY * 2, "");
        this.textDef = scene.add.text(x, y + padY * 3 , "");
        this.textItem = scene.add.text(x, y + padY * 4, "", style);
        this.update(personajeMenu);
    }

    /**
     * Actualiza los datos mostrados del elemento
     */
    update(personaje) {
        this.textHp.setText("HP: " + personaje.currentHp + "/" + personaje.maxHp);
        this.textAtk.setText("ATK: " + personaje.atk);
        this.textDef.setText("DEF: " + personaje.def);
        this.textItem.setText(personaje.item.nombre);
    }

    /**
     * Oculta este elemto de texto
     */
    ocultar() {
        this.textHp.visible = false;
        this.textAtk.visible = false;
        this.textDef.visible = false;
        this.textItem.visible = false;
    }

    /**
     * Muestra este elemto de texto
     */
    mostrar() {
        this.textHp.visible = true;
        this.textAtk.visible = true;
        this.textDef.visible = true;
        this.textItem.visible = true;
    }
}



export class StatsDrawer extends Phaser.GameObjects.Container {
    /**
    *
    * Listado de estadísticas de personajes para colocar debajo de los mismos
    * @param {Phaser.Scene} scene La escena donde se va a pintar
    * @param {SelectorPersonajesMenu} charL El selector a utilizar
    * @param {num} padY El espacio en vertical entre elementos de la lista
    * @param {num} x Posicion horizontal donde colocar el objeto (esquina superior iquierda)
    * @param {num} y Posicion vertical donde colocar el objeto (esquina superior iquierda)
    */
    constructor(scene, charL, padY, padX, x, y) {
        super(scene);
        this.drawers = [];
        this.charL = charL;
        for (let i = 0; i < charL.opciones.length; i++) {
            this.drawers.push(new Drawer(scene, charL.opciones[i].personaje, padY, x + i * padX, y));
        }
    }

    /**
     * Actualiza todos los elementos de la lista
     */
    update() {
        for (let i = 0; i < this.drawers.length; i++) {
            this.drawers[i].update(this.charL.opciones[i].personaje);
        }
    }

    /**
     * Oculta todos los elementos de la lista
     */
    ocultar() {
        this.drawers.forEach(drawer => {
            drawer.ocultar();
        });
    }

    /**
     * Muestra todos los elementos de la lista
     */
    mostrar() {
        this.drawers.forEach(drawer => {
            drawer.mostrar();
        });
    }
}