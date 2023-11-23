/*
Se encarga de construir las frases de descripción que aparecen en la batalla después de cada acción de un personaje.
Ej. "Pablo ha curado a Diego, Jose y Javier" "Plátano ha atacado a Diego!"
*/
export class TextoDescriptivo extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        //Construir el objeto en la escena
        super(scene);
        this.textElem = scene.add.text(x, y, "prueba");
        console.log("funciona");
    }

    /**
     * Cambia el texto descriptivo al pasado por parametro
     * @param {*} texto 
     */
    aplicarTexto(texto) {
        this.textElem.setText(texto);
    }

    visible(t) {
        this.textElem.visible = t;
    }
}