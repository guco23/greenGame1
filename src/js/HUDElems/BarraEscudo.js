/**
 * Tiene el mismo funcionamiento que las barras de vida de los enemigos
 */
export class BarraEscudo extends Phaser.GameObjects.Container {
    /**
     * 
     * @param {Phaser.Scene} scene La escena donde se va a pintar
     * @param {num} x La posición horizonal donde se va a colocar (esquina superior iquierda)
     * @param {num} y La posición vertical donde se va a colocar (esquina superior iquierda)
     * @param {num} w El tamaño horizontal de la barra
     * @param {num} h El tamaño vertical dela barra
     * @param {Personaje} personaje El personaje del que se van a obtener los datos
     */
    constructor(scene, x, y, w, h, personaje) {
        super(scene);
        this.personaje = personaje;

        this.prop = w / personaje.maxHp; //La proporcion resultante del tamaño y la vida máxima, utilizada para cambiar el tamaño de la barra
        this.rectBase = scene.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0, 0);
        this.rectShield = scene.add.rectangle(x, y, w, h, 0xd2ed09).setOrigin(0, 0);
    }

    actualizarEscudo() {
        this.rectShield.setSize(this.prop * this.personaje.escudo, this.rectShield.height);
    }
}
