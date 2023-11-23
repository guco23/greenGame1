export class TextoVida extends Phaser.GameObjects.Container {
    constructor(scene, x, y, maxHp, hp) {
        super(scene);
        this.maxHp = maxHp;
        this.hp = hp;
        this.textElem = scene.add.text(x, y, "");
        this.aplicarTexto();
    }

    //Actualiza y muestra el texto del elemento
    aplicarTexto() {
        this.textElem.setText(this.hp + "/" + this.maxHp);
    }

    /**
     * Actualiza la vida actual mostrada
     * @param {number} hp La vida actual del personaje
     */
    actualizarHp(hp) {
        this.hp = hp;
        this.aplicarTexto();
    }
}