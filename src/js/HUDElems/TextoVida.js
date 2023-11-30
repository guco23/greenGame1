export class TextoVida extends Phaser.GameObjects.Container {
    constructor(scene, x, y, personaje) {
        super(scene);
        this.personaje = personaje;
        this.textElem = scene.add.text(x, y, "");
        this.aplicarTexto();
    }

    //Actualiza y muestra el texto con la vida
    aplicarTexto() {
        this.textElem.setText(this.personaje.currentHp + "/" + this.personaje.maxHp);
    }

    /**
     * Actualiza la vida actual mostrada utilizando los datos del persoanje asignado
     * Si el personaje ha muerto lo indica en rojito
     */
    actualizarHp() {
        if (!this.personaje.living) {
            this.textElem.setText("MUERTO");
            this.textElem.setTint(0xff0000);
        } else
            this.aplicarTexto();
    }
}